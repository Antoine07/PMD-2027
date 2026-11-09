# Suivi du projet — IA/ML et MVP clients

## Cadrage connu

- **Public :** étudiants du parcours HETIC ; niveaux et prérequis à préciser.
- **Objectif :** concevoir et créer une application, progresser en IA/ML et en cybersécurité en réalisant un MVP par équipe, confronté à de vrais clients puis présenté lors d'un Demo Day filmé.
- **Organisation proposée :** six mois, pilotage Mously, Mously à 30 % du volume pédagogique total, ventilés en 25 % de cours de théorie et pratique et 5 % de coaching.
- **État :** proposition pédagogique mise en forme dans `docs/index.html`, avec une version texte dans `docs/parcours-hetic.md`. Aucun MVP étudiant ni retour client n'a été fourni à ce stade.

## Cycle actuel — rendre le parcours concret et consultable

- **Livrable :** site documentaire HETIC local sans authentification, planning de cartes par intervenant, vues semaine/mois/six mois, navigation entre périodes, filtres combinés et détails des interventions. Trois cartes mentales SVG présentent la vision, la progression du design vers l’application et les rôles. Un README et un prompt dans `prompts/modifier-planning.md` documentent les évolutions depuis la console.
- **Référence visuelle :** application locale `MATRICE/planning-app` ; navigation latérale, palette violette et grille de planning. Aucun compte, contenu privé ou mécanisme d'authentification repris.
- **Hypothèse à vérifier :** le parcours permet aux étudiants et intervenants d'identifier le travail attendu chaque mois et de distinguer apprentissage technique et validation client.
- **Dates :** début fixé par l’utilisateur au 1er janvier 2027, fin au 30 juin. La première activité proposée est le 4 janvier. Le découpage couvre 181 dates et 27 semaines calendaires touchées, dont deux partielles. Les horaires, vacances HETIC et confirmations restent à préciser.
- **Preuve technique attendue :** ouverture directe ou via un serveur statique, navigation et changement de vues, filtres, détail des cartes, schémas, téléchargement et impression ; consultation sur mobile.
- **Vérifications réalisées :** `node scripts/check-planning.cjs` contrôle les données, les calculs de dates, les semaines à cheval sur deux années, février, les filtres et les ressources locales. Syntaxes CSS et SVG également analysées. Le serveur HTTP local et le lancement du navigateur de test sont bloqués dans cet environnement : rendu visuel, comportement réel au clavier, téléchargement et impression restent à vérifier dans un navigateur.
- **Versionnement :** le dépôt contient une première version (`a5762d9`, « parcours »). Les écritures Git avaient été bloquées sur `.git/config` et `.git/index.lock` lors des opérations précédentes ; la mise en index des évolutions actuelles a de nouveau été refusée sur `.git/index.lock`. Les fichiers sont prêts mais aucun nouveau commit n’a pu être créé dans cet environnement.
- **Preuve d'apprentissage :** non observée. Les compétences mensuelles affichées sont des objectifs proposés, pas des acquis étudiants.
- **Preuve client :** non recueillie. Les validations mensuelles sont des actions à réaliser avec les clients des projets.

## Dernier ajustement demandé

- Renforcer les interventions de Mously en théorie et pratique sur les six mois, avec un total de 30 %. La ventilation retenue conserve 5 % de coaching et porte les cours à 25 % ; les heures restent à établir à partir du volume total.
- Ajouter une soutenance blanche en M5, accompagnée par Mously, Dany et l’équipe technique, puis un temps de correction avant le Demo Day de M6.
- Synchroniser le planning, le programme, les cartes mentales, le README et le prompt de modification.

## Conception d’applications et cybersécurité

- La cybersécurité représente 5 % du volume pédagogique total, de la conception à la revue du MVP. L’affectation des heures reste à établir ; le rôle cyber est indiqué comme à affecter. Cette proportion décrit un contenu et ne s’additionne pas automatiquement aux 30 % d’un intervenant.
- Avant le vibe coding de M3 : théorie du design et maquettes en M1, architecture et première application guidée en M2. Les prérequis sont inscrits dans les cartes.
- Vérifier la capacité individuelle à expliquer, diagnostiquer et modifier une application. La soutenance blanche de M5 couvre aussi le design, l’architecture et les mesures de sécurité, avant correction et Demo Day.
- Aucun acquis ni test de sécurité réel sur un MVP étudiant n’est attesté à ce stade.

## Prochaine décision proposée

Préciser le volume horaire total, les prérequis, le calendrier HETIC et l'accès à des clients. Choisir ensuite pour chaque équipe un problème, une compétence IA/ML à acquérir, une première référence simple et un protocole d'essai avec un critère de décision fixé avant l'expérience.

Ne pas déduire de cette présentation que des clients sont recrutés, qu'un pilote est accepté ou que les étudiants maîtrisent déjà les compétences visées.

## Ajustement de la répartition des intervenants

La limite de jours pour Michel a été supprimée à la demande de l’utilisateur. Sa fenêtre d’intervention reste M1 à M3 ; le volume est à définir dans la ventilation pédagogique.

## Lisibilité du parcours sur six mois

La carte mentale du parcours met en évidence un premier MVP utilisable visé dès M3. M4 à M6 sont consacrés aux essais clients, aux corrections et à la consolidation, avec une soutenance blanche en M5 et le Demo Day en M6. Le design et une première application guidée précèdent le vibe coding. Cette trajectoire reste à adapter au volume horaire et au niveau initial ; elle ne constitue pas une garantie de résultat.

## Nouveau visuel — plan de charge

Une matrice interactive complète le calendrier : intervenants ou activités en lignes, M1 à M6 en colonnes, intensité par nombre de blocs et répartition colorée des activités. Le clic sur une case ouvre les interventions concernées, puis leur détail pédagogique. Les données restent communes au calendrier.

Les indicateurs séparent blocs uniques et participations de coanimation. Les heures, capacités et disponibilités restent inconnues ; la matrice ne mesure pas de surcharge ou de taux d’occupation. Les filtres du calendrier n’affectent pas cette vue globale.

Les contrôles automatiques couvrent les coanimations, les totaux mensuels, les deux modes de regroupement, les périodes vides et les références de l’interface. Le rendu dans un navigateur reste à vérifier dans un environnement permettant son lancement.

## Révision après autocritique : socles, défense et graphiques

Les modules restent au nombre de 48 : davantage de bases et de produit/marketing en M1–M2, défense de proposition en M2, puis MVP conditionné par la revue des acquis. Les coanimations techniques de Mously sont réduites au profit du produit et des preuves ; Dany intervient aussi en M2. Les responsabilités sont des propositions à confirmer avec les volumes horaires.

La timeline, les barres théorie/pratique et les graphiques de domaines affichent des répartitions proposées. Les observations utilisent 18 critères individuels sur six socles et trois dimensions, avec preuve et couverture. Le relevé local du navigateur reste séparé du programme versionné ; aucun acquis n’est prérempli.

Le programme détaillé propose des vues jour, semaine, mois et six mois. Brontis et Antoine coordonnent les rendez-vous clients. Le Demo Day et la captation sont proposés le 29 juin, avec retours regroupés le 29 juin, le mercredi 30 étant réservé à la FOAD.

## Rythme quotidien et soutien du mercredi

Cours les lundi, mardi, jeudi et vendredi ; mercredi FOAD de soutien sur plateforme. Le calendrier courant prévoit 99 jours de cours, 26 mercredis FOAD et 104 activités-types à décliner, sans horaires inventés. Les cours calculés un mercredi sont reportés au prochain jour de cours. Les référents de soutien sont proposés par mois et les suivis FOAD ne représentent pas des journées de présence synchrone enseignante.

Le plan de charge sépare jours de cours, rattachements de suivi et contenus. Les observations individuelles comprennent participation, réalisation plateforme, temps déclaré et objectifs de soutien validés ; elles restent inconnues tant qu’elles ne sont pas renseignées avec une trace. Les mois sans mesure sont exclus des dénominateurs observés plutôt que traités comme zéro. L’adresse de la plateforme et les modalités de synchronisation ne sont pas fournies : aucun service externe n’est présumé connecté.
