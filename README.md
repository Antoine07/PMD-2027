# HETIC — Planning du parcours projet

Un parcours de six mois pour apprendre à concevoir et créer une application, progresser en IA/ML et construire un MVP confronté à de vrais clients. La cybersécurité représente **5 % du volume pédagogique total**. Pilotage : **Mously**. Mously apporte théorie, pratique et suivi sur **30 % du volume pédagogique total** : **25 % de cours** et **5 % de coaching**. Une soutenance blanche en M5 prépare la démonstration finale, qui associe pitch, MVP, retours clients et captation vidéo.

Le site reprend la navigation et la grille de cartes de l'application de référence `MATRICE/planning-app`. Il fonctionne sans compte, mot de passe, backend ni dépendance à installer.

## Consulter le site

Ouvrir [docs/index.html](docs/index.html) dans un navigateur. Les fichiers JavaScript, CSS et SVG sont locaux : aucun serveur n'est nécessaire pour consulter le planning.

Pour le servir en HTTP, depuis la racine du dépôt :

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory docs
```

Ouvrir ensuite `http://127.0.0.1:8000`. Arrêter le serveur avec `Ctrl+C`.

## Se déplacer dans le planning

- **6 mois** : vue d'ensemble M1 à M6, avec des cartes colorées par intervenant. Les flèches sélectionnent le mois précédent ou suivant et déplacent la grille vers sa colonne.
- **Mois** : sans date de début, affiche le contenu du mois pédagogique sélectionné ; avec une date de début, affiche les jours du mois civil et les cartes correspondantes.
- **Semaine** : disponible après avoir renseigné le début du parcours ; affiche les sept jours de la semaine, du lundi au dimanche.
- **Flèches précédent / suivant** : changent de mois pédagogique dans la vue sans dates, de mois civil dans la vue mensuelle datée, ou de semaine dans la vue hebdomadaire.
- **Début du parcours** : revient au premier mois ou à la date de début. **Aujourd'hui**, disponible avec un calendrier daté, permet de retrouver la période actuelle.
- **Défilement** : souris, pavé tactile ou geste tactile pour parcourir les colonnes ; le conteneur du planning accepte aussi le focus clavier et le défilement natif.
- **Recherche, intervenant et catégories** : les filtres se combinent ; « Réinitialiser » les efface. Une période sans résultat affiche un accès au parcours complet.
- **Clic sur un en-tête de mois** : affiche les objectifs et jalons du mois sous la grille. **Clic sur une carte** : ouvre son détail ; fermer avec la croix ou la touche Échap.

### Dates proposées et données versionnées

Le parcours est daté du **1er janvier au 30 juin 2027**. La première activité proposée est placée le **4 janvier**, après le jour férié et le week-end. Les champs de date du calendrier permettent une exploration temporaire ; le programme détaillé et les exports utilisent la date versionnée.
Pour changer la date de début partagée, modifier `startDate` dans [planning-data.js](docs/assets/planning-data.js), au format `AAAA-MM-JJ`, puis versionner le fichier.

Les cartes ont un mois pédagogique et un décalage `dayOffset`. Lorsqu'une date de début est renseignée, le site calcule une **date proposée**, avec report au prochain jour positionnable si le calcul tombe un week-end ou un jour férié national. Une date individuelle peut être renseignée dans `date` ; elle prend alors la priorité sur le calcul. Aucun horaire ou volume n'est déduit de ces cartes. Elles représentent des blocs de contenu, pas un décompte des séances réelles.

Les créneaux calculés, l'affectation détaillée des blocs et les compléments IA/ML restent des propositions à valider. Les fenêtres d’intervention sont rééquilibrées comme indiqué dans l’autocritique. Michel intervient sur M1 à M3 ; Antoine et Brontis assurent les rendez-vous clients sur M1 à M6. Les interventions de Mously représentent **30 % du volume pédagogique total** : **25 % de cours de théorie et pratique** et **5 % de coaching**. Cette ventilation conserve les 5 % de coaching initiaux ; le nombre d’heures sera calculé lorsque le volume total sera connu. Le nombre de cartes ne permet pas de vérifier à lui seul cette répartition.

## Programme jour par jour, semaine par semaine et par mois

La première vue de la rubrique Planning est **Jour par jour**. Elle couvre les 181 dates du parcours, distingue les interventions proposées, le travail des apprenants et les jours sans activité imposée, et précise la preuve attendue et la question à défendre. Un filtre permet de choisir un mois. Le CSV est disponible dans [planning-quotidien-2027.csv](docs/planning-quotidien-2027.csv).

Les vues **Par semaine**, **Par mois** et **6 mois** présentent le même programme avec des niveaux de détail différents. Le parcours touche 27 semaines calendaires, dont la première et la dernière sont partielles ; il ne s’agit pas de 27 semaines complètes de cours. Dans les synthèses mensuelles, une semaine est rattachée au mois de son premier jour inclus dans le parcours ; ses dates montrent les chevauchements éventuels. La [synthèse hebdomadaire](docs/planning-semaines-2027.md) reprend les objectifs et livrables.

La trame propose un rythme du lundi au vendredi, hors jours fériés nationaux, sans inventer d’horaires ni de durées. Les vacances HETIC et les disponibilités restent à préciser. Les jours fériés utilisés proviennent de [Service Public, calendrier 2027](https://www.service-public.gouv.fr/particuliers/actualites/A19019). Une date individuelle explicitement renseignée reste prioritaire sur le report automatique.

Les rendez-vous clients sont attribués à **Brontis et Antoine**. Le Demo Day et la captation sont proposés le **29 juin**, avec les retours le **30 juin** ; chaque équipe d’étudiants présente et défend son MVP.

## Timeline, pourcentages et observations

La rubrique **Timeline & apprentissage** rassemble une timeline cliquable de M1 à M6, des barres théorie/pratique, un camembert ou des barres par domaine et un relevé individuel sur six socles : IA/ML, Data, applications, cybersécurité, marketing et produit.

Les ratios mensuels théorie/pratique proposés sont 70/30, 60/40, 35/65, 25/75, 20/80 et 10/90. La répartition thématique proposée est applications 30 %, Data 20 %, IA/ML 20 %, produit 15 %, marketing 10 % et cyber 5 %. Ces deux lectures décrivent des activités et des contenus ; elles ne mesurent pas les acquis et ne s’additionnent pas aux 30 % d’un intervenant. Le volume horaire étant inconnu, aucune moyenne horaire sur les six mois n’est déduite.

Les **18 critères** portent sur théorie, pratique et argumentation. Le pourcentage observé correspond à « démontré / évalué », avec le nombre de critères évalués affiché à côté. Une valeur non observée reste « À évaluer ». Le graphique suit la dernière observation connue de chaque critère jusqu’au mois choisi ; une nouvelle difficulté peut remplacer une réussite antérieure. Le MVP de M3 est une cible conditionnée par une revue des bases, pas une validation automatique.

Le formulaire dépliable permet de documenter les observations de chaque mois. Une trace ou preuve est requise pour les critères évalués et les jalons déclarés validés. Ce suivi individuel est conservé dans le navigateur ; l’export JSON permet de le conserver ou de le transmettre. Il n’existe pas de synchronisation entre appareils, d’agrégation de promotion ou de stockage serveur. Le fichier versionné conserve les objectifs et observations de référence ; les mesures locales ne le modifient pas.

L’[autocritique et le rééquilibrage](docs/autocritique-parcours.md) expliquent les ajustements des modules et des responsabilités. Les bases et la défense de proposition arrivent en M1–M2 ; les 48 blocs existants sont conservés.

## Plan de charge visuel

La rubrique **Plan de charge**, accessible dans le menu, affiche une matrice sur les six mois. Les intervenants sont en lignes et les mois en colonnes. Les teintes montrent le nombre de blocs de chaque case ; les petites barres colorées distinguent cours, coaching, projet, cybersécurité et Demo Day. Les jalons M3, M5 et M6 restent visibles dans les en-têtes.

- **Par intervenant** : repérer les périodes où chaque personne, rôle ou collectif participe aux blocs prévus.
- **Par activité** : retrouver la répartition mensuelle des cours, du coaching, du travail projet, de la cybersécurité et des démonstrations.
- **Afficher les intitulés** : rendre les titres des blocs visibles directement dans les cases.
- **Clic sur une case** : consulter la liste des interventions ; cliquer sur un bloc ouvre son détail pédagogique. Le bouton « Fermer » ramène le focus à la case sélectionnée.

Les indicateurs distinguent les **blocs distincts** des **participations** : un atelier coanimé par deux intervenants compte une fois dans le total du parcours et une fois sur chacune de leurs lignes. Les totaux mensuels comptent les blocs distincts. Cette vue couvre tout le parcours et reste indépendante des filtres du calendrier.

Il s’agit d’une répartition schématique en blocs. Les durées, disponibilités et capacités n’étant pas renseignées, les couleurs ne représentent pas un taux d’occupation ni une surcharge horaire. Les repères Mously à 30 % et cybersécurité à 5 % sont rappelés sans calculer de volume mensuel.

La matrice utilise les mêmes données que le planning. Modifier `planning-data.js` suffit à actualiser les visuels. Le calcul est dans `planning-model.js`, le rendu dans `workload.js` et les styles dans `workload.css`.

## Design des applications, puis vibe coding

La théorie et la pratique guidée précèdent la génération assistée du code : **M1 design et maquettes → M2 architecture et première application guidée → M3 MVP ciblé et vibe coding → M4 déploiement → M5 soutenance blanche → M6 clients**. Chaque apprenant doit pouvoir expliquer l’application, diagnostiquer un problème et réaliser une petite modification. Les cartes `requires` expriment les prérequis ; les contrôles vérifient leur ordre dans le planning.

La cybersécurité couvre les risques et les données, la conception, le code, le déploiement et la revue du MVP dans les **5 % du volume total**. Cette part porte sur un contenu ; les 30 % de Mously portent sur un intervenant. L’affectation des heures cyber reste à établir et ces parts ne s’additionnent pas automatiquement. Le rôle « Cybersécurité · à affecter » ne désigne pas une personne confirmée.

## Défense de proposition — M2, puis soutenance blanche — M5

Une défense de proposition avec Mously, Dany et Michel est prévue en M2 pour revoir les bases et le périmètre. Mously, Dany et l’équipe technique accompagnent ensuite une soutenance blanche avant le Demo Day. Chaque équipe présente le problème client, démontre son MVP, explique le design, l’architecture, les choix IA/ML et les mesures de sécurité, puis réalise une modification ou un diagnostic ciblé en répondant aux questions. Les retours sont priorisés dans un plan de corrections et repris avant la démonstration finale de M6. Cette répétition pédagogique ne remplace pas les essais auprès de vrais clients.

## Cartes mentales

La rubrique « Cartes mentales » propose trois schémas :

- [Vision du projet](docs/assets/carte-vision.svg) : besoin client, données et IA/ML, MVP, apprentissage, six mois et Demo Day.
- [Six mois vers le MVP](docs/assets/carte-application.svg) : design et application guidée, premier MVP en M3, puis essais clients, soutenance blanche et Demo Day.
- [Équipe et rôles](docs/assets/carte-equipe.svg) : Mously au pilotage et les responsabilités des intervenants.

Les boutons permettent de passer d'un schéma à l'autre. Les schémas s'ouvrent en grand et se téléchargent en SVG, un format vectoriel réutilisable dans une présentation. Sur petit écran, ils se parcourent horizontalement.

Le bouton **Imprimer / PDF** utilise l'impression du navigateur. Le planning reflète la vue et les filtres sélectionnés au moment de l'impression ; les trois cartes mentales sont incluses. Le schéma six mois et les exports CSV/Markdown sont régénérés à partir des données par `scripts/render-supports.cjs`. Pour un document complet de référence, utiliser aussi [le programme texte](docs/parcours-hetic.md).

## Modifier le projet depuis la console

Le prompt réutilisable est dans [prompts/modifier-planning.md](prompts/modifier-planning.md). Depuis la racine du dépôt :

```sh
cat prompts/modifier-planning.md
```

Copier son contenu dans l'assistant de code utilisé en console et remplacer le bloc **Modification demandée** par le besoin précis. Par exemple :

> La date de début est le 15 février 2027. Déplace le bloc « API du MVP » au mois 4, mets à jour le programme et les schémas si nécessaire, puis vérifie la navigation et prépare le commit.

Cet exemple illustre la syntaxe d'une demande : il ne fixe pas la date réelle du parcours. Pour une modification manuelle, les contenus du calendrier sont centralisés dans `planning-data.js`.

| Fichier | Rôle |
| --- | --- |
| `docs/assets/planning-data.js` | Date de début, répartitions, objectifs IA/ML, applications et cyber, prérequis et interventions |
| `docs/assets/planning-model.js` | Calcul des dates et périodes, recherche et filtres |
| `docs/assets/app.js` | Navigation, rendu des cartes, fenêtres de détail et sélection des schémas |
| `docs/assets/learning.js` et `learning.css` | Timeline, répartitions et observations individuelles |
| `docs/assets/programme.js` et `programme.css` | Trames quotidienne, hebdomadaire, mensuelle et six mois |
| `docs/assets/workload.js` et `workload.css` | Plan de charge interactif par intervenant ou activité |
| `docs/index.html` | Structure de la page, repères, tableau des intervenants et livrables |
| `docs/assets/styles.css` et `planning.css` | Mise en forme, mobile et impression |
| `docs/assets/carte-vision.svg`, `carte-application.svg` et `carte-equipe.svg` | Schémas vectoriels |
| `docs/parcours-hetic.md` | Programme pédagogique lisible et téléchargeable |
| `docs/pilotage-ia-mvp.md` | Décisions, hypothèses et état des preuves |
| `skills/evoluer-projet-ia-mvp/SKILL.md` | Critères de progression IA/ML et de valeur client |

Lorsqu'une modification change le programme, synchroniser les données, la page, le programme texte et les cartes mentales concernées. Conserver les distinctions entre proposition, intervention prévue, compétence observée et validation client.

## Vérifier les modifications

Avec Node.js 18 ou une version ultérieure, sans installation de paquet :

```sh
node scripts/render-supports.cjs
node scripts/check-planning.cjs
```

Ce contrôle vérifie la cohérence des données, les dates, les changements de semaine et de mois, l’ordre des prérequis avant le vibe coding, les filtres, les agrégations du plan de charge et les ressources locales. Il ne remplace pas une vérification dans le navigateur.

Pour le plan de charge, vérifier les deux lectures, les intitulés, l’ouverture et la fermeture d’une case, les coanimations, le défilement sur mobile et l’aperçu d’impression.

Avant de valider une évolution du calendrier, parcourir les trois vues, tester les flèches, combiner les filtres, ouvrir une carte, utiliser le clavier, consulter sur mobile et vérifier l'aperçu d'impression. Tester aussi une période sans intervention et le retour au début du parcours.

## Versionner

Les sources, la documentation, les prompts, les schémas et le skill font partie du dépôt. Le `.gitignore` exclut les secrets, dépendances, caches et fichiers générés.

À la première utilisation, initialiser le dépôt si nécessaire :

```sh
git init -b main
```

Puis vérifier et enregistrer les fichiers :

```sh
git status --short
git diff
node scripts/render-supports.cjs
node scripts/check-planning.cjs
git add docs prompts README.md scripts AGENTS.md skills .gitignore
git commit -m "Mettre à jour le planning HETIC"
```

Relire les différences avant le commit, surtout les dates et les fenêtres d'intervention. Aucun dépôt distant ni hébergement n'est configuré par ces instructions.
