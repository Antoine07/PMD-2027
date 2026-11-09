"""Notify about open PRs using GitHub metadata and authenticated, encrypted SMTP.

Standard library only. No PR code, patches, artifacts, or caches are executed.
"""

import json
import os
import re
import smtplib
import ssl
import sys
from email.message import EmailMessage
from email.utils import formatdate, make_msgid
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import Request, urlopen


class ConfigurationError(ValueError):
    pass


def line(value, limit=240):
    """Keep untrusted GitHub text in a single, bounded line (also for headers)."""
    return " ".join(str(value or "").split())[:limit]


def number(value):
    if not re.fullmatch(r"[1-9][0-9]{0,9}", str(value)):
        raise ConfigurationError("Numéro de PR invalide.")
    return int(value)


class GitHub:
    def __init__(self, env):
        self.repo = env.get("GITHUB_REPOSITORY", "")
        if not re.fullmatch(r"[\w.-]+/[\w.-]+", self.repo):
            raise ConfigurationError("GITHUB_REPOSITORY invalide.")
        self.root = env.get("GITHUB_API_URL", "https://api.github.com").rstrip("/")
        self.token = env.get("GITHUB_TOKEN", "")
        if not self.token:
            raise ConfigurationError("GITHUB_TOKEN absent.")

    def get(self, suffix):
        request = Request(
            f"{self.root}/repos/{self.repo}/{suffix}",
            headers={"Authorization": f"Bearer {self.token}",
                     "Accept": "application/vnd.github+json",
                     "User-Agent": "PMD-PR-email"},
        )
        with urlopen(request, timeout=30) as response:
            return json.load(response)

    def pages(self, suffix, max_pages):
        result = []
        separator = "&" if "?" in suffix else "?"
        for page in range(1, max_pages + 1):
            batch = self.get(f"{suffix}{separator}per_page=100&page={page}")
            result.extend(batch)
            if len(batch) < 100:
                return result
        return result


def select_prs(api, event_name, event):
    """Resolve PRs again in the base repo; do not trust a downloaded artifact."""
    if event_name == "workflow_dispatch":
        return [api.get(f"pulls/{number(event.get('inputs', {}).get('pr_number'))}")]
    run = event.get("workflow_run", {})
    if (event_name != "workflow_run" or run.get("event") != "pull_request"
            or run.get("conclusion") != "success" or run.get("run_attempt") != 1
            or run.get("repository", {}).get("full_name") != api.repo
            or run.get("name") != "PR email signal"
            or run.get("path", "").split("@", 1)[0]
            != ".github/workflows/pr-mail-signal.yml"):
        return []
    sha = run.get("head_sha", "")
    if not re.fullmatch(r"[0-9a-f]{40}", sha):
        raise ConfigurationError("SHA du workflow invalide.")
    candidates = run.get("pull_requests", [])
    if candidates:
        prs = [api.get(f"pulls/{number(pr['number'])}") for pr in candidates]
    else:
        # GitHub can omit pull_requests for fork runs. Match against open PRs.
        prs = api.pages("pulls?state=open", 100)
        if len(prs) == 10000:
            raise ConfigurationError("Trop de PR ouvertes : utiliser l'envoi manuel.")
    return [pr for pr in prs
            if sha in (pr.get("head", {}).get("sha"), pr.get("merge_commit_sha"))]


def build_message(repo, pr, commits, files, sender, recipient, latest=None):
    message = EmailMessage()
    message["From"] = sender
    message["To"] = recipient
    message["Date"] = formatdate(localtime=False)
    message["Message-ID"] = make_msgid()
    message["Subject"] = f"[{repo}] PR #{pr['number']} — {line(pr['title'], 150)}"
    latest = latest or (commits[-1] if commits else None)
    body = [f"PR #{pr['number']} : {line(pr['title'])}", pr["html_url"], "",
            f"Auteur : {line(pr['user']['login'])}",
            f"État : {'brouillon' if pr.get('draft') else 'prête pour revue'}",
            f"Branches : {line(pr['head']['ref'])} → {line(pr['base']['ref'])}", "",
            "Résumé factuel des changements de la PR :",
            f"{pr.get('commits', len(commits))} commit(s), "
            f"{pr.get('changed_files', len(files))} fichier(s), "
            f"+{pr.get('additions', 0)} / -{pr.get('deletions', 0)} lignes."]
    if latest:
        body.extend(["", f"Dernier commit : {latest['sha'][:12]}",
                     str(latest["commit"]["message"])[:1500]])
    partial = pr.get("commits", len(commits)) > len(commits)
    body.extend(["", "Messages de commits (extrait API, 10 maximum) :" if partial
                 else "Derniers messages de commits (10 maximum) :"])
    for commit in commits[-10:]:
        body.append(f"- {commit['sha'][:12]} {line(commit['commit']['message'])}")
    if len(commits) > 10 or partial:
        body.append("Liste abrégée : consulter la PR pour tous les commits.")
    body.extend(["", "Fichiers modifiés (30 maximum) :"])
    for item in files[:30]:
        body.append(f"- {line(item['filename'])} ({line(item['status'])}, "
                    f"+{item.get('additions', 0)} / -{item.get('deletions', 0)})")
    if pr.get("changed_files", len(files)) > 30:
        body.append("Liste abrégée : consulter la PR pour tous les fichiers.")
    description = str(pr.get("body") or "").strip()
    if description:
        body.extend(["", "Description fournie par l'auteur (extrait) :", description[:1500]])
    body.extend(["", "Résumé de la PR entière à cet instant, pas uniquement du dernier push.",
                 "Les messages et la description sont fournis par les auteurs ; "
                 "ce résumé ne constitue pas une revue du code."])
    message.set_content("\n".join(body))
    return message


def smtp_config(env):
    required = ("SMTP_HOST", "SMTP_USERNAME", "SMTP_PASSWORD", "MAIL_FROM", "MAIL_TO")
    missing = [key for key in required if not env.get(key)]
    if missing:
        raise ConfigurationError("Secrets GitHub à renseigner : " + ", ".join(missing))
    security = env.get("SMTP_SECURITY", "tls").lower()
    if security not in ("tls", "starttls"):
        raise ConfigurationError("SMTP_SECURITY doit être tls ou starttls.")
    try:
        port = int(env.get("SMTP_PORT", "465"))
        if not 1 <= port <= 65535:
            raise ValueError()
    except ValueError:
        raise ConfigurationError("SMTP_PORT invalide.") from None
    for key in ("SMTP_HOST", "MAIL_FROM", "MAIL_TO"):
        if "\r" in env[key] or "\n" in env[key]:
            raise ConfigurationError(f"Valeur multiligne interdite : {key}.")
    return security, port


def send_message(message, env):
    security, port = smtp_config(env)
    context = ssl.create_default_context()
    if security == "tls":
        connection = smtplib.SMTP_SSL(env["SMTP_HOST"], port, timeout=20, context=context)
    else:
        connection = smtplib.SMTP(env["SMTP_HOST"], port, timeout=20)
    with connection as smtp:
        if security == "starttls":
            smtp.starttls(context=context)
        smtp.login(env["SMTP_USERNAME"], env["SMTP_PASSWORD"])
        smtp.send_message(message)


def main(env=None):
    env = os.environ if env is None else env
    event = json.loads(Path(env["GITHUB_EVENT_PATH"]).read_text(encoding="utf-8"))
    api = GitHub(env)
    prs = select_prs(api, env.get("GITHUB_EVENT_NAME"), event)
    for candidate in prs:
        # List responses may lack totals. Fetch the full current PR before rendering.
        pr = api.get(f"pulls/{number(candidate['number'])}")
        if pr.get("state") != "open" or pr.get("base", {}).get("repo", {}).get("full_name") != api.repo:
            continue
        # Ignore an outdated run if the PR moved while its notification was queued.
        if env.get("GITHUB_EVENT_NAME") == "workflow_run":
            sha = event["workflow_run"]["head_sha"]
            if sha not in (pr["head"]["sha"], pr.get("merge_commit_sha")):
                continue
        smtp_config(env)
        commits = api.pages(f"pulls/{pr['number']}/commits", 3)
        files = api.get(f"pulls/{pr['number']}/files?per_page=100")
        latest = None
        if pr.get("commits", 0) > len(commits):
            sha = pr["head"]["sha"]
            if not re.fullmatch(r"[0-9a-f]{40}", sha):
                raise ConfigurationError("SHA de la PR invalide.")
            latest = api.get(f"commits/{sha}")
        message = build_message(api.repo, pr, commits, files, env["MAIL_FROM"], env["MAIL_TO"], latest)
        send_message(message, env)
        print(f"Notification SMTP acceptée pour la PR #{pr['number']}.")
    if not prs:
        print("Aucune PR actuelle à notifier pour cet événement.")


if __name__ == "__main__":
    try:
        main()
    except ConfigurationError as error:
        print(f"::error::{error}", file=sys.stderr)
        sys.exit(1)
    except HTTPError as error:
        print(f"::error::Appel GitHub refusé (HTTP {error.code}).", file=sys.stderr)
        sys.exit(1)
    except Exception as error:
        # Never log SMTP responses, recipients, credentials, or message content.
        print(f"::error::Échec de notification ({type(error).__name__}). "
              "Vérifier la configuration SMTP et les permissions GitHub.", file=sys.stderr)
        sys.exit(1)
