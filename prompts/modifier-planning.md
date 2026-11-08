# Modifier le planning HETIC depuis la console

Tu travailles à la racine du dépôt du parcours HETIC. Réalise la modification demandée dans les fichiers, vérifie le résultat et prépare une version relisible.

## Modification demandée

REMPLACER CE PARAGRAPHE par le changement précis : contenu, intervenant, mois, date de début, date d'une intervention, navigation, style ou schéma mental. Si ce paragraphe n'a pas été remplacé, demander le changement souhaité avant de modifier le projet.

## Contexte à lire

1. `AGENTS.md`, puis `skills/evoluer-projet-ia-mvp/SKILL.md` pour les évolutions pédagogiques.
2. `README.md` et `docs/pilotage-ia-mvp.md`.
3. `docs/assets/planning-data.js`, puis les seuls fichiers concernés par la demande.

Le produit est un planning documentaire HETIC, consultable sans authentification, avec une navigation par semaine, mois et six mois, des filtres, des cartes d'intervention et deux cartes mentales SVG. Le parcours vise une progression IA/ML et un MVP confronté à de vrais clients.

## Réalisation attendue

- Préserver le périmètre demandé, les changements de l'utilisateur déjà présents et l'accès sans compte. Ne pas ajouter de backend ou de dépendances pour une modification de contenu.
- Centraliser les contenus du calendrier dans `docs/assets/planning-data.js`. Conserver les identifiants d'intervention stables lorsque le contenu change.
- `startDate` est une date ISO `AAAA-MM-JJ` ou `null`. Le champ de date dans l'interface est temporaire ; une date partagée doit être inscrite dans ce fichier.
- `allocation` porte la répartition de Mously : 30 % du volume total, avec 25 % de cours de théorie et pratique et 5 % de coaching. Si une demande change ces valeurs, maintenir leur cohérence et synchroniser les supports concernés. Le nombre de cartes n'est pas un volume horaire.
- Le M5 comprend une soutenance blanche des MVP, puis une reprise des retours avant le Demo Day en M6. Préserver cette préparation, sauf modification explicite demandée.
- Pour déplacer un bloc, adapter `month`, `dayOffset` ou `date` selon la demande. Une date individuelle renseignée prend priorité sur le calcul ; si l'on souhaite à nouveau un calcul relatif, remettre `date` à `null`. Ne pas laisser une ancienne date explicite contredire le déplacement demandé.
- Vérifier la compatibilité avec les fenêtres d'intervention. Signaler une contradiction réelle dans la demande ; ne pas inventer une disponibilité, un horaire, un volume ou une confirmation.
- Mettre à jour `docs/index.html`, `docs/parcours-hetic.md`, les schémas SVG et `README.md` seulement si les informations qu'ils affichent changent. Les rôles et pourcentages sont présents dans plusieurs supports : les garder cohérents.
- Distinguer les propositions des faits. Ne pas transformer un objectif IA/ML en compétence acquise, ni un avis favorable en validation commerciale.
- Conserver la navigation précédent/suivant, les vues, le défilement horizontal, les filtres combinés, le retour au début et l'ouverture des cartes au clavier.
- Pour un schéma mental, modifier le SVG vectoriel existant et garder les textes lisibles, le titre, la description accessible et le téléchargement fonctionnel.
- Mettre à jour `docs/pilotage-ia-mvp.md` si la décision ou la prochaine étape change.

## Vérification et livraison

Exécuter `node scripts/check-planning.cjs`. Pour une évolution de navigation, vérifier les vues semaine/mois/six mois, le passage décembre-janvier, février, les filtres sans résultat et la conservation du contexte lors d'un changement de vue. Utiliser le navigateur s'il est disponible ; signaler précisément les vérifications impossibles.

Présenter les fichiers modifiés, le résultat et les contrôles effectués. Montrer `git diff --stat` si le dépôt est initialisé. Créer un commit seulement si la demande actuelle l'autorise ; ne pas pousser vers un dépôt distant sans instruction correspondante. Ne pas publier le site ni contacter les intervenants ou les clients à l'occasion d'une simple modification du planning.
