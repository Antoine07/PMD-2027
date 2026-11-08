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
- **Dates :** aucune date de début réelle fournie ; la valeur versionnée reste `null`. Les M1 à M6 sont explorables sans date. La saisie temporaire d'un début permet de calculer des créneaux proposés ; aucune date affichée par ce mécanisme n'est une confirmation.
- **Preuve technique attendue :** ouverture directe ou via un serveur statique, navigation et changement de vues, filtres, détail des cartes, schémas, téléchargement et impression ; consultation sur mobile.
- **Vérifications réalisées :** `node scripts/check-planning.cjs` contrôle les données, les calculs de dates, les semaines à cheval sur deux années, février, les filtres et les ressources locales. Syntaxes CSS et SVG également analysées. Le serveur HTTP local et le lancement du navigateur de test sont bloqués dans cet environnement : rendu visuel, comportement réel au clavier, téléchargement et impression restent à vérifier dans un navigateur.
- **Versionnement :** sources, documentation, prompt et contrôles préparés. L'initialisation Git a échoué lors du verrouillage de `.git/config` avec « Operation not permitted » ; la mise en index a également été refusée sur `.git/index.lock` ; aucun commit n'est attesté. Les commandes sont documentées dans le README pour exécution dans un terminal disposant des permissions nécessaires.
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
