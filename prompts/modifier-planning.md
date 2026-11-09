# Modifier le planning HETIC depuis la console

Tu travailles à la racine du dépôt du parcours HETIC. Réalise la modification demandée dans les fichiers, vérifie le résultat et prépare une version relisible.

## Modification demandée

REMPLACER CE PARAGRAPHE par le changement précis : contenu, intervenant, mois, date de début, date d'une intervention, navigation, style ou schéma mental. Si ce paragraphe n'a pas été remplacé, demander le changement souhaité avant de modifier le projet.

## Contexte à lire

1. `AGENTS.md`, puis `skills/evoluer-projet-ia-mvp/SKILL.md` pour les évolutions pédagogiques.
2. `README.md` et `docs/pilotage-ia-mvp.md`.
3. `docs/assets/planning-data.js`, puis les seuls fichiers concernés par la demande.

Le parcours commence le 1er janvier 2027 et se termine le 30 juin. Le produit est un planning documentaire HETIC, consultable sans authentification, avec une navigation par semaine, mois et six mois, des filtres, des cartes d'intervention et trois cartes mentales SVG. Le parcours vise la capacité à concevoir et créer une application, une progression IA/ML, 5 % de cybersécurité et un MVP confronté à de vrais clients.

## Réalisation attendue

- Préserver le périmètre demandé, les changements de l'utilisateur déjà présents et l'accès sans compte. Ne pas ajouter de backend ou de dépendances pour une modification de contenu.
- Centraliser les contenus du calendrier dans `docs/assets/planning-data.js`. Conserver les identifiants d'intervention stables lorsque le contenu change.
- `startDate` est une date ISO `AAAA-MM-JJ` ou `null`. Le champ de date dans l'interface est temporaire ; une date partagée doit être inscrite dans ce fichier.
- `allocation` porte la répartition de Mously : 30 % du volume total, avec 25 % de cours de théorie et pratique et 5 % de coaching. Si une demande change ces valeurs, maintenir leur cohérence et synchroniser les supports concernés. Le nombre de cartes n'est pas un volume horaire.
- Le M5 comprend une soutenance blanche des MVP, puis une reprise des retours avant le Demo Day en M6. Préserver cette préparation, sauf modification explicite demandée.
- La cybersécurité représente 5 % du volume pédagogique total (`allocation.cyber`). Cette proportion porte sur un contenu, tandis que les 30 % de Mously portent sur un intervenant : ne pas les additionner automatiquement. L'affectation des heures cyber reste à préciser ; « Cybersécurité · à affecter » est un rôle à pourvoir, pas une personne confirmée.
- Préserver l'ordre pédagogique : design et maquettes en M1, architecture et première application guidée en M2, puis vibe coding en M3. Les champs `requires` des cartes expriment ces prérequis dans le calendrier. Si une date ou un mois change, vérifier aussi ces dépendances.
- Les objectifs mensuels `apps` et `cyber` complètent l'IA/ML. La soutenance blanche doit vérifier la capacité à expliquer, diagnostiquer et modifier une application, ainsi que les mesures de sécurité mises en place.
- Pour déplacer un bloc, adapter `month`, `dayOffset` ou `date` selon la demande. Une date individuelle renseignée prend priorité sur le calcul ; si l'on souhaite à nouveau un calcul relatif, remettre `date` à `null`. Ne pas laisser une ancienne date explicite contredire le déplacement demandé.
- Vérifier la compatibilité avec les fenêtres d'intervention. Signaler une contradiction réelle dans la demande ; ne pas inventer une disponibilité, un horaire, un volume ou une confirmation.
- Mettre à jour `docs/index.html`, `docs/parcours-hetic.md`, les schémas SVG et `README.md` seulement si les informations qu'ils affichent changent. Les rôles et pourcentages sont présents dans plusieurs supports : les garder cohérents.
- Distinguer les propositions des faits. Ne pas transformer un objectif IA/ML en compétence acquise, ni un avis favorable en validation commerciale.
- Conserver la navigation précédent/suivant, les vues, le défilement horizontal, les filtres combinés, le retour au début et l'ouverture des cartes au clavier.
- Conserver le plan de charge (`workload.js`, `workload.css`, calcul `buildWorkload` dans `planning-model.js`) : les intervenants ou les activités en lignes, les six mois en colonnes et le détail des blocs au clic. Utiliser les données communes du planning. Distinguer les blocs uniques des participations de coanimation ; ne pas présenter les nombres de cartes comme des heures ou des taux d’occupation.
- Pour un schéma mental, modifier le SVG vectoriel existant et garder les textes lisibles, le titre, la description accessible et le téléchargement fonctionnel.
- Mettre à jour `docs/pilotage-ia-mvp.md` si la décision ou la prochaine étape change.

- Préserver les bases individuelles IA, Data, applications, cyber, marketing et produit. La défense de proposition en M2 conditionne le périmètre du MVP ciblé en M3. Les rendez-vous clients sont portés par Brontis et Antoine.
- Les objectifs et mesures de la timeline sont dans `learning`. Ne jamais présenter les répartitions proposées comme des acquis : les scores observés utilisent les critères évalués et une preuve, avec leur couverture.
- Régénérer le SVG six mois, le CSV quotidien et la synthèse hebdomadaire avec `node scripts/render-supports.cjs` après une modification des contenus ou dates. Le relevé local du navigateur reste distinct des sources versionnées.

## Vérification et livraison

Exécuter `node scripts/render-supports.cjs`, puis `node scripts/check-planning.cjs`. Pour une évolution de navigation, vérifier les vues semaine/mois/six mois, le passage décembre-janvier, février, les filtres sans résultat et la conservation du contexte lors d'un changement de vue. Utiliser le navigateur s'il est disponible ; signaler précisément les vérifications impossibles.

Présenter les fichiers modifiés, le résultat et les contrôles effectués. Montrer `git diff --stat` si le dépôt est initialisé. Créer un commit seulement si la demande actuelle l'autorise ; ne pas pousser vers un dépôt distant sans instruction correspondante. Ne pas publier le site ni contacter les intervenants ou les clients à l'occasion d'une simple modification du planning.
