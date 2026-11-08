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

La date de début n'a pas encore été communiquée : `startDate` vaut donc `null`. La vue initiale affiche M1 à M6. Le champ « Début du parcours » permet d'explorer un calendrier réel sans modifier les fichiers : cette saisie est temporaire et se réinitialise au rechargement.

Pour partager une date de début avec tous les lecteurs, modifier `startDate` dans [planning-data.js](docs/assets/planning-data.js), au format `AAAA-MM-JJ`, puis versionner le fichier.

Les cartes ont un mois pédagogique et un décalage `dayOffset`. Lorsqu'une date de début est renseignée, le site calcule une **date proposée**, avec report au lundi si le jour calculé tombe un week-end. Une date individuelle peut être renseignée dans `date` ; elle prend alors la priorité sur le calcul. Aucun horaire ou volume n'est déduit de ces cartes. Elles représentent des blocs de contenu, pas un décompte des séances réelles.

Les créneaux calculés, l'affectation détaillée des blocs et les compléments IA/ML restent des propositions à valider. Les fenêtres d'intervention du programme initial sont conservées. Michel intervient dans la limite de **8 jours maximum** sur M1 à M3. Les interventions de Mously représentent **30 % du volume pédagogique total** : **25 % de cours de théorie et pratique** et **5 % de coaching**. Cette ventilation conserve les 5 % de coaching initiaux ; le nombre d’heures sera calculé lorsque le volume total sera connu. Le nombre de cartes ne permet pas de vérifier à lui seul cette répartition.

## Design des applications, puis vibe coding

La théorie et la pratique guidée précèdent la génération assistée du code : **M1 design et maquettes → M2 architecture et première application guidée → M3 vibe coding → M4 déploiement → M5 soutenance blanche → M6 clients**. Chaque apprenant doit pouvoir expliquer l’application, diagnostiquer un problème et réaliser une petite modification. Les cartes `requires` expriment les prérequis ; les contrôles vérifient leur ordre dans le planning.

La cybersécurité couvre les risques et les données, la conception, le code, le déploiement et la revue du MVP dans les **5 % du volume total**. Cette part porte sur un contenu ; les 30 % de Mously portent sur un intervenant. L’affectation des heures cyber reste à établir et ces parts ne s’additionnent pas automatiquement. Le rôle « Cybersécurité · à affecter » ne désigne pas une personne confirmée.

## Soutenance blanche des MVP — M5

Mously, Dany et l’équipe technique accompagnent une soutenance blanche avant le Demo Day. Chaque équipe présente le problème client, démontre son MVP, explique le design, l’architecture, les choix IA/ML et les mesures de sécurité, puis réalise une modification ou un diagnostic ciblé en répondant aux questions. Les retours sont priorisés dans un plan de corrections et repris avant la démonstration finale de M6. Cette répétition pédagogique ne remplace pas les essais auprès de vrais clients.

## Cartes mentales

La rubrique « Cartes mentales » propose trois schémas :

- [Vision du projet](docs/assets/carte-vision.svg) : besoin client, données et IA/ML, MVP, apprentissage, six mois et Demo Day.
- [Du design à l’application](docs/assets/carte-application.svg) : comprendre et construire avant le vibe coding.
- [Équipe et rôles](docs/assets/carte-equipe.svg) : Mously au pilotage et les responsabilités des intervenants.

Les boutons permettent de passer d'un schéma à l'autre. Les schémas s'ouvrent en grand et se téléchargent en SVG, un format vectoriel réutilisable dans une présentation. Sur petit écran, ils se parcourent horizontalement.

Le bouton **Imprimer / PDF** utilise l'impression du navigateur. Le planning reflète la vue et les filtres sélectionnés au moment de l'impression ; les trois cartes mentales sont incluses. Pour un document complet de référence, utiliser aussi [le programme texte](docs/parcours-hetic.md).

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
node scripts/check-planning.cjs
```

Ce contrôle vérifie la cohérence des données, les dates, les changements de semaine et de mois, l’ordre des prérequis avant le vibe coding, les filtres et les ressources locales. Il ne remplace pas une vérification dans le navigateur.

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
node scripts/check-planning.cjs
git add docs prompts README.md scripts AGENTS.md skills .gitignore
git commit -m "Mettre à jour le planning HETIC"
```

Relire les différences avant le commit, surtout les dates et les fenêtres d'intervention. Aucun dépôt distant ni hébergement n'est configuré par ces instructions.
