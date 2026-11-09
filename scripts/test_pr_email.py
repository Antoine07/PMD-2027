"""Offline behavioral checks: python3 -B -m unittest discover -s scripts -p 'test_pr_email.py'."""

import copy
import importlib.util
import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import MagicMock, patch

spec = importlib.util.spec_from_file_location(
    "notify_pr", Path(__file__).resolve().parents[1] / ".github/scripts/notify_pr.py")
notify = importlib.util.module_from_spec(spec)
spec.loader.exec_module(notify)

SHA = "a" * 40
PR = {"number": 12, "title": "Planning et IA", "html_url": "https://github.com/test/repo/pull/12",
      "user": {"login": "auteur"}, "state": "open", "draft": False,
      "head": {"sha": SHA, "ref": "planning"},
      "base": {"ref": "main", "repo": {"full_name": "test/repo"}},
      "commits": 1, "changed_files": 1, "additions": 10, "deletions": 2,
      "body": "Ajoute les cours de soutien."}
COMMIT = {"sha": SHA, "commit": {"message": "Ajoute le soutien\n\nLe mercredi en FOAD."}}
FILES = [{"filename": "docs/index.html", "status": "modified", "additions": 10, "deletions": 2}]
SMTP = {"SMTP_HOST": "smtp.example.org", "SMTP_USERNAME": "user", "SMTP_PASSWORD": "secret",
        "MAIL_FROM": "sender@example.org", "MAIL_TO": "recipient@example.org"}


def event():
    return {"workflow_run": {"name": "PR email signal", "event": "pull_request",
            "conclusion": "success", "run_attempt": 1, "repository": {"full_name": "test/repo"},
            "path": ".github/workflows/pr-mail-signal.yml@main", "head_sha": SHA,
            "pull_requests": [{"number": 12}]}}


class NotificationTests(unittest.TestCase):
    def api(self):
        api = MagicMock()
        api.repo = "test/repo"
        api.get.return_value = copy.deepcopy(PR)
        return api

    def test_summary_is_readable_and_untrusted_text_remains_data(self):
        pr = copy.deepcopy(PR)
        pr["title"] = "IA\r\nBcc: attacker@example.org $(touch /tmp/injection)"
        message = notify.build_message("test/repo", pr, [COMMIT], FILES, SMTP["MAIL_FROM"], SMTP["MAIL_TO"])
        body = message.get_content()
        self.assertIsNone(message["Bcc"])
        self.assertIn("$(touch /tmp/injection)", message["Subject"])
        self.assertIn("+10 / -2", body)
        self.assertIn("Le mercredi en FOAD.", body)
        self.assertIn("docs/index.html", body)
        self.assertIn("https://github.com/test/repo/pull/12", body)
        self.assertIn("Résumé", body)
        self.assertTrue(message.as_bytes())

    def test_large_pr_truncates_and_uses_actual_head_commit(self):
        pr = dict(PR, commits=300, changed_files=40)
        latest = {"sha": "b" * 40, "commit": {"message": "Vrai dernier commit"}}
        message = notify.build_message("test/repo", pr, [COMMIT] * 250, FILES * 40,
                                       SMTP["MAIL_FROM"], SMTP["MAIL_TO"], latest)
        body = message.get_content()
        self.assertIn("Vrai dernier commit", body)
        self.assertIn("extrait API", body)
        self.assertEqual(body.count("- docs/index.html"), 30)

    def test_fork_without_pr_association_uses_open_prs(self):
        payload = event()
        payload["workflow_run"]["pull_requests"] = []
        api = self.api()
        api.pages.return_value = [dict(PR, head={"sha": "b" * 40}), PR]
        self.assertEqual(notify.select_prs(api, "workflow_run", payload), [PR])
        api.pages.assert_called_once_with("pulls?state=open", 100)

    def test_stale_run_is_skipped(self):
        api = self.api()
        api.get.return_value["head"]["sha"] = "b" * 40
        self.assertEqual(notify.select_prs(api, "workflow_run", event()), [])

    def test_wrong_workflow_repository_and_rerun_are_ignored(self):
        for key, value in [("path", ".github/workflows/untrusted.yml"),
                           ("repository", {"full_name": "fork/repo"}),
                           ("event", "push"), ("run_attempt", 2)]:
            with self.subTest(key=key):
                payload = event()
                payload["workflow_run"][key] = value
                api = self.api()
                self.assertEqual(notify.select_prs(api, "workflow_run", payload), [])
                api.get.assert_not_called()

    def test_manual_number_cannot_inject_an_api_path(self):
        with self.assertRaises(notify.ConfigurationError):
            notify.select_prs(self.api(), "workflow_dispatch", {"inputs": {"pr_number": "../secrets"}})

    def test_smtp_tls_and_starttls_authenticate_after_encryption(self):
        for security, port, factory in [("tls", "465", "SMTP_SSL"), ("starttls", "587", "SMTP")]:
            with self.subTest(security=security), patch.object(notify.smtplib, factory) as connect:
                smtp = connect.return_value.__enter__.return_value
                notify.send_message(MagicMock(), dict(SMTP, SMTP_SECURITY=security, SMTP_PORT=port))
                connect.assert_called_once()
                smtp.login.assert_called_once_with("user", "secret")
                smtp.send_message.assert_called_once()
                calls = [call[0] for call in smtp.method_calls]
                if security == "starttls":
                    self.assertLess(calls.index("starttls"), calls.index("login"))
                else:
                    smtp.starttls.assert_not_called()

    def test_missing_secrets_and_plain_smtp_are_rejected(self):
        for env in [{}, dict(SMTP, SMTP_SECURITY="none"), dict(SMTP, MAIL_TO="a\nBcc: b")]:
            with self.subTest(env_keys=list(env)), self.assertRaises(notify.ConfigurationError):
                notify.smtp_config(env)

    def test_main_never_sends_for_closed_or_foreign_pr(self):
        for pr in [dict(PR, state="closed"), dict(PR, base={"repo": {"full_name": "elsewhere/repo"}})]:
            with tempfile.TemporaryDirectory() as directory:
                path = Path(directory) / "event.json"
                path.write_text(json.dumps({"inputs": {"pr_number": "12"}}))
                api = self.api()
                api.get.return_value = pr
                with patch.object(notify, "GitHub", return_value=api), patch.object(notify, "send_message") as send:
                    notify.main({"GITHUB_EVENT_PATH": str(path), "GITHUB_EVENT_NAME": "workflow_dispatch"})
                    send.assert_not_called()

    def test_main_sends_summary_for_current_pr(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "event.json"
            path.write_text(json.dumps(event()))
            api = self.api()
            api.get.side_effect = lambda path: FILES if "/files?" in path else PR
            api.pages.return_value = [COMMIT]
            with patch.object(notify, "GitHub", return_value=api), patch.object(notify, "send_message") as send:
                notify.main(dict(SMTP, GITHUB_EVENT_PATH=str(path), GITHUB_EVENT_NAME="workflow_run"))
                send.assert_called_once()
                self.assertIn("Ajoute le soutien", send.call_args.args[0].get_content())


if __name__ == "__main__":
    unittest.main()
