# Recevoir les PR par e-mail

Les workflows envoient une notification à l'ouverture d'une PR, à sa réouverture, à l'ajout de commits ou à son passage de brouillon à prête pour revue. Les brouillons sont inclus. Les commentaires et les commits sans PR ne déclenchent pas ces e-mails.

Le message contient le titre, le lien, l'auteur, les branches, le dernier commit et son message, jusqu'à 10 messages de commits, 30 fichiers avec leurs statistiques et un extrait de la description. Il résume **la PR entière à cet instant**, pas uniquement le dernier push. Les textes proviennent des auteurs, sans analyse IA ni revue automatique du code. Les listes abrégées sont signalées ; GitHub limite la liste des commits d'une PR à 250.

## Configuration dans GitHub

1. Versionner et pousser `.github/`, ce document, le test et le README. Les deux workflows et le script doivent être présents sur la **branche par défaut** du dépôt avant les prochaines PR.
2. Dans le dépôt GitHub, ouvrir **Settings → Secrets and variables → Actions → Secrets → New repository secret**.
3. Créer les six secrets suivants avec les paramètres de votre fournisseur SMTP. Ne jamais les écrire dans le dépôt ou dans un prompt.

| Secret | Valeur à renseigner |
| --- | --- |
| `SMTP_HOST` | Hôte SMTP fourni par le service d'envoi |
| `SMTP_USERNAME` | Identifiant SMTP |
| `SMTP_PASSWORD` | Mot de passe SMTP, jeton SMTP ou mot de passe d'application selon le fournisseur |
| `MAIL_FROM` | Adresse expéditrice autorisée par ce service |
| `MAIL_TO` | Votre adresse destinataire |

Dans l'onglet **Variables**, ajouter les variables suivantes seulement si les valeurs par défaut ne conviennent pas :

| Variable | Défaut | Autre configuration courante |
| --- | --- | --- |
| `SMTP_PORT` | `465` | `587` |
| `SMTP_SECURITY` | `tls` : TLS dès la connexion | `starttls` : chiffrement avant authentification |

Utiliser les paramètres exacts du fournisseur, avec authentification SMTP et expéditeur autorisé. Le script refuse l'authentification sans chiffrement. Aucun jeton GitHub personnel n'est nécessaire : le workflow utilise son `GITHUB_TOKEN` en lecture.

Les adresses et le service d'envoi restent à choisir. Sans ces secrets, les fichiers sont prêts, mais l'envoi échouera en indiquant les noms des paramètres manquants.

## Tester et utiliser

Après configuration, ouvrir **Actions → PR email → Run workflow**, sélectionner la branche par défaut et renseigner le numéro d'une PR ouverte, par exemple `12`. Le test manuel **envoie réellement un e-mail**. Il permet aussi de renvoyer une notification en cas de besoin.

Pour le fonctionnement automatique, ouvrir une nouvelle PR ou pousser un commit dans une PR existante. Un premier workflow **PR email signal** se termine, puis **PR email** récupère les informations GitHub et envoie le message. Vérifier son statut dans Actions et les courriers indésirables. « Notification SMTP acceptée » signifie que le serveur SMTP a accepté le message ; la réception dépend ensuite du fournisseur.

En cas d'échec, contrôler les secrets, le port, le mode de chiffrement et l'expéditeur autorisé. Les journaux évitent d'afficher les adresses, le contenu du message ou les réponses SMTP. Le script n'effectue pas de nouvelle tentative SMTP automatique ; utiliser l'envoi manuel après correction. Relancer le workflow signal est ignoré pour limiter les doublons ; relancer directement le workflow d'envoi peut envoyer un nouveau message.

## Fonctionnement et limites

- `.github/workflows/pr-mail-signal.yml` détecte les événements sans secret ni exécution du code de la PR.
- `.github/workflows/pr-email.yml` utilise `workflow_run`, puis charge uniquement le script de la branche par défaut. Il ne charge aucun code, cache ou artefact provenant de la PR. Les secrets SMTP sont disponibles uniquement à l'étape d'envoi.
- `.github/scripts/notify_pr.py` utilise la bibliothèque standard Python et les métadonnées GitHub. Les titres, descriptions et messages restent du texte, jamais des commandes.
- Les PR provenant de forks peuvent nécessiter l'approbation préalable du workflow signal dans GitHub. Si GitHub ne fournit pas l'association PR/workflow pour un fork, le script retrouve les PR ouvertes par leur SHA.
- Une PR fermée ou une exécution devenue obsolète après un nouveau push est ignorée. Plusieurs pushes rapides peuvent donc être regroupés dans la notification de l'état le plus récent. Il n'existe pas de garantie d'unicité ou de réception.
- Un conflit de fusion peut empêcher le déclenchement `pull_request` ; l'envoi manuel reste possible. Les événements générés par certains autres workflows avec `GITHUB_TOKEN` ne déclenchent pas nécessairement le signal.
- Le destinataire reçoit des métadonnées du dépôt, y compris s'il est privé : choisir une adresse adaptée.

Ce découpage suit le fonctionnement documenté de [`workflow_run`](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#workflow_run), qui peut accéder aux secrets après un workflow sans privilèges. La configuration des secrets est décrite dans la [documentation GitHub](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets).

## Vérification locale sans envoi

Depuis la racine du dépôt, avec Python 3 :

```sh
python3 -B -m unittest discover -s scripts -p 'test_pr_email.py'
```

Les tests simulent GitHub et SMTP : résumé, texte non fiable, listes abrégées, forks, exécutions obsolètes, configuration manquante et chiffrement avant authentification. Aucun e-mail n'est envoyé par cette commande.
