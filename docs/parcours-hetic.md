# HETIC — Parcours projet professionnel sur 6 mois

**Statut : proposition de parcours, à ajuster.**

**Objectif :** permettre aux apprenants de concevoir et créer une application, de progresser en IA/ML et en cybersécurité, puis de présenter un MVP fonctionnel à de vrais clients lors d’une démonstration finale filmée.

**Pilotage : Mously. Durée : 6 mois.**

## Volumes pédagogiques

- **Mously : 30 % du volume total**, avec 25 % de cours de théorie et pratique et 5 % de coaching.
- **Cybersécurité : 5 % du volume total**, répartis sur le cadrage, la conception, le code, le déploiement et la revue du MVP.
- **Michel : 8 jours maximum**, sur M1 à M3.

La part de Mously décrit une charge d’intervention ; la cybersécurité décrit un contenu pédagogique. L’affectation des heures cyber reste à préciser : ces pourcentages ne s’additionnent pas automatiquement. Le rôle « Cybersécurité · à affecter » ne désigne pas un intervenant confirmé. Les heures seront établies lorsque le volume total sera connu ; le nombre de cartes ne mesure pas ces pourcentages.

## Design des applications avant le vibe coding

1. **M1 — Théorie du design :** utilisateurs, besoins, parcours, hiérarchie des écrans, maquettes, états de chargement, d’erreur et de réussite, données et premiers risques.
2. **M2 — Théorie des applications :** client/serveur, HTTP, frontend, backend, API, stockage, échanges et tests. Construire une première application guidée avec formulaire, traitement et persistance ; lire et expliquer le code avant d’en déléguer la génération.
3. **M3 — Vibe coding :** partir d’une spécification et d’un design explicités pour travailler avec un assistant de code. Relire, tester, déboguer et corriger les propositions ; savoir réaliser une modification ciblée et en expliquer le fonctionnement.
4. **M4 à M6 — Application utilisable :** intégrer, déployer, vérifier la sécurité, faire essayer le produit, puis défendre ses choix en soutenance blanche et devant les clients.

Le vibe coding est une pratique étudiée dans le parcours ; une application générée qui fonctionne ne prouve pas à elle seule la capacité à concevoir, modifier et maintenir une application. Les prérequis sont représentés par le champ `requires` des cartes du planning.

## Cybersécurité — 5 % du volume total

| Étape | Contenu et preuve attendue |
| --- | --- |
| M1 · Risques et données | Identifier les données à protéger, les usages et les risques principaux du projet. |
| M2 · Conception | Cartographier les échanges, prévoir les droits et limiter les données collectées. |
| M3 · Code | Vérifier les entrées, les accès, les erreurs et les requêtes selon le projet, y compris pour le code généré. |
| M4 · Déploiement | Gérer les secrets et les configurations, vérifier les accès et dépendances, prévoir HTTPS et des journaux adaptés. |
| M5 · Revue du MVP | Tester les cas d’erreur et d’accès pertinents sur le propre MVP de l’équipe, corriger et documenter les limites avant la soutenance blanche. |
| M6 · Restitution | Présenter les mesures réellement mises en place et leurs limites lors de la démonstration. |

Ces thèmes sont à ventiler dans les 5 %, sans ajouter de volume horaire non défini. La part mensuelle et l’affectation des interventions restent à établir. La restitution en M6 s’inscrit dans la démonstration finale.

## Planning pédagogique

| Mois | Étape | Intervenants principaux | Programme |
| --- | --- | --- | --- |
| M1 | Cadrage des projets | Mously · Dany · Michel | Besoins clients, gestion de projet, culture et fondements théoriques. Théorie du design d’applications : parcours, écrans, états et données. Introduction aux risques cyber. Théorie et pratique avec Mously. |
| M2 | Fondations techniques | Mously · Antoine · Michel | Algorithmique, mathématiques et Python. Théorie des applications : client/serveur, HTTP, interfaces, API, données et tests. Première application guidée avant le vibe coding. Sécurité dès la conception. |
| M3 | Développement du MVP | Mously · Antoine · Yaaqoub | Interfaces, architecture et API. Vibe coding après les bases de design et une première construction guidée : spécifier, générer, relire, tester et corriger. Validation des entrées et contrôle des accès. |
| M4 | Intégration technique | Mously · Yaaqoub · Sion | API, intégration et DevOps minimal. Déploiement de l’application, configuration, secrets, accès et vérifications de sécurité avant le pilote. |
| M5 | Finalisation, tests et soutenance blanche | Mously · Dany · Équipe technique | Tests utilisateurs, améliorations et revue de sécurité du MVP. Soutenance blanche : design, architecture, application, IA/ML, sécurité et retours clients. Corrections avant le Demo Day. |
| M6 | Démonstration clients | Toute l’équipe · Société de production | Pitch, démonstration de l’application et du MVP IA/ML, explication du design, de l’architecture et des mesures de sécurité, retours clients et captation vidéo. |

Les interventions cyber proposées de M1 à M5 complètent les intervenants principaux ; leur affectation reste à confirmer.

## Objectifs et jalons mensuels

Les objectifs ci-dessous sont à adapter aux prérequis et au volume disponible. Ils ne décrivent pas des compétences déjà observées ni des validations clients déjà réalisées.

Le [planning interactif](index.html#planning) propose les vues semaine, mois et six mois, une recherche et des filtres, dont un filtre cybersécurité. Sans date de début, le parcours s’explore en M1 à M6. Les dates calculées restent proposées et aucun horaire n’en est déduit.

### M1 — Cadrage des projets

- **IA/ML :** Formuler un problème et identifier les données nécessaires. Expliquer dans quels cas l’IA est pertinente et définir une solution de référence simple.
- **Applications :** Décrire les utilisateurs et leurs tâches, dessiner un parcours et des maquettes simples, prévoir les états de chargement, d’erreur et de réussite. Justifier le design avant de générer du code.
- **Cybersécurité :** Identifier les données à protéger, les accès nécessaires et les risques principaux du projet. La cybersécurité représente 5 % du volume pédagogique total sur le parcours.
- **Validation client à réaliser :** Rencontrer des personnes du segment visé. Documenter leur problème, leur pratique actuelle et les conditions d’un premier essai.
- **Jalon proposé :** Une fiche projet, un parcours utilisateur, des maquettes et une première carte des données et risques.

### M2 — Fondations techniques

- **IA/ML :** Préparer et explorer des données en Python. Construire une première approche simple, choisir une métrique et séparer entraînement et évaluation lorsque le modèle le nécessite.
- **Applications :** Expliquer le rôle du frontend, du backend, de l’API et du stockage. Dessiner leurs échanges et construire une petite application guidée avec un formulaire, un traitement et une persistance de données.
- **Cybersécurité :** Définir les droits selon les usages, limiter les données collectées et repérer les menaces dans les échanges de l’application. Prévoir les contrôles avant de coder.
- **Validation client à réaliser :** Vérifier avec un client que les cas étudiés représentent son besoin et que les données sont disponibles et autorisées pour l’usage prévu.
- **Jalon proposé :** Un schéma d’architecture, une petite application explicable, un notebook reproductible et des critères de test.

### M3 — Développement du MVP

- **IA/ML :** Relier une approche IA/ML pertinente à une interface et une API. Expliquer le chemin des données et reproduire un résultat de bout en bout.
- **Applications :** Construire une application de bout en bout. Utiliser le vibe coding à partir d’un design et d’une architecture explicités, puis relire, tester et modifier le code proposé. Réaliser une modification ciblée en expliquant son raisonnement.
- **Cybersécurité :** Contrôler les entrées, les accès et les erreurs ; utiliser des requêtes paramétrées si le projet utilise une base de données. Vérifier le code généré sur les mêmes critères que le code écrit par l’équipe.
- **Validation client à réaliser :** Faire essayer le premier parcours utilisable à des personnes du segment visé. Observer la tâche accomplie et consigner les obstacles.
- **Jalon proposé :** Un MVP utilisable, son architecture documentée, des tests et un relevé des premières observations clients.

### M4 — Intégration technique

- **IA/ML :** Déployer une version accessible pour le pilote. Mesurer la qualité, la latence et le coût si ces facteurs conditionnent l’usage ; traiter les erreurs principales.
- **Applications :** Déployer et configurer l’application, diagnostiquer un échec et reproduire le parcours complet. Expliquer comment l’interface, l’API, les données et le traitement IA/ML fonctionnent ensemble.
- **Cybersécurité :** Séparer configuration et secrets, vérifier les accès et les dépendances, prévoir HTTPS pour le déploiement et éviter d’exposer des données sensibles dans les journaux.
- **Validation client à réaliser :** Préparer un essai dans les conditions du client, puis observer l’utilisation d’une version accessible avec des données autorisées.
- **Jalon proposé :** Une application déployée pour le pilote, une procédure reproductible et une revue des accès et secrets.

### M5 — Finalisation, tests et soutenance blanche

- **IA/ML :** Analyser les erreurs et comparer les versions IA/ML sur les mêmes cas. À la soutenance blanche, expliquer les résultats, le design et l’architecture de l’application, répondre aux questions et réaliser une évolution ciblée.
- **Applications :** Démontrer une application fonctionnelle et expliquer son design, son architecture et son code. Lors de la soutenance blanche, diagnostiquer un problème et réaliser une petite évolution en justifiant la démarche.
- **Cybersécurité :** Tester les cas d’erreur et les accès non autorisés pertinents sur le propre MVP de l’équipe. Prioriser les corrections et documenter les risques qui restent à traiter.
- **Validation client à réaliser :** Faire réaliser une tâche concrète et recueillir des retours datés. Mesurer selon le projet le temps gagné, la qualité acceptable ou la réutilisation.
- **Jalon proposé :** Un MVP stabilisé, des preuves d’apprentissage, un bilan client, une revue de sécurité et un plan de corrections issu de la soutenance blanche.

### M6 — Démonstration clients

- **IA/ML :** Expliquer les choix techniques, reproduire la démonstration et présenter les limites. Montrer les preuves de compréhension recueillies pendant le parcours.
- **Applications :** Présenter et reproduire l’application de bout en bout. Expliquer les décisions de design, le rôle du code généré et ce que chaque apprenant sait modifier et maintenir.
- **Cybersécurité :** Présenter les mesures réellement mises en place, les vérifications effectuées et les limites résiduelles. Ne pas présenter une application comme totalement sécurisée à partir d’une simple démonstration.
- **Validation client à réaliser :** Présenter le MVP à des clients invités et recueillir leurs retours. Distinguer intérêt exprimé, intention d’achat et engagement réellement observé.
- **Jalon proposé :** Une application MVP fonctionnelle par équipe, une démonstration explicable, des retours clients et le film du parcours.

## Vérifier la capacité à créer une application

Conserver un parcours et des maquettes justifiés, un schéma d’architecture, une application exécutable, ses tests et ses conditions de lancement. Chaque apprenant explique le rôle de l’interface, de l’API, des données et de l’IA/ML dans son projet. Une modification ciblée ou un diagnostic commenté permet d’observer sa compréhension, avec un accompagnement adapté au niveau.

Distinguer le travail produit par un assistant, le code reproduit par l’apprenant et ce qu’il sait expliquer et modifier. Pour l’IA/ML, conserver la comparaison à une référence et l’analyse des erreurs. Pour la cybersécurité, conserver les vérifications pertinentes et les limites restant à traiter.

Évaluer séparément la valeur client : personnes rencontrées, cas d’essai, observations datées et améliorations décidées. Une démonstration ou un avis favorable ne suffit pas à établir une validation commerciale.

## Soutenance blanche des MVP — M5

Mously, Dany et l’équipe technique accompagnent chaque équipe sur :

- Le problème client et les choix de design, avec les parcours et maquettes.
- L’architecture de l’application et une démonstration reproductible du MVP.
- Les choix IA/ML, les résultats, les erreurs et les limites.
- Les mesures de sécurité réellement mises en place et les vérifications réalisées.
- Une petite modification de code ou un diagnostic ciblé, expliqué par l’apprenant.
- Les retours clients recueillis et les prochaines améliorations.

Les retours du jury pédagogique alimentent un plan de corrections avant le Demo Day en M6. La date et les durées restent à préciser ; cette soutenance ne remplace pas les essais auprès des clients.

## Répartition des intervenants

| Intervenant | Responsabilité | Période |
| --- | --- | --- |
| Mously | Pilotage, théorie et pratique : 25 % cours + 5 % coaching, soit 30 % au total | M1 à M6 |
| Michel | Théorie, culture et fondements du design, 8 jours maximum | M1 à M3 |
| Antoine | Algorithmique, maths, Python, architecture, interfaces et première application guidée | M2 à M4 |
| Yaaqoub | API et intégration | M3 à M5 |
| Sion | DevOps minimal, déploiement | M4 à M5 |
| Dany | Gestion de projet et préparation des soutenances | M1, M3, M5 et M6 |
| Cybersécurité · à affecter | Contenu cyber : 5 % du volume total, affectation des heures à confirmer | M1 à M5 |
| Société de production | Captation et storytelling | M6 |

Les périodes sont des fenêtres d’intervention ; le planning met en avant les intervenants principaux. La ventilation fine reste à établir, dans la limite de 8 jours maximum pour Michel. L’affectation détaillée des nouveaux contenus reste une proposition de travail.

## Cartes mentales

- [Vision du projet](assets/carte-vision.svg) : clients, données, applications, apprentissage, cybersécurité et démonstration.
- [Du design à l’application](assets/carte-application.svg) : la progression pédagogique, avec le design et la première application avant le vibe coding.
- [Équipe et rôles](assets/carte-equipe.svg) : responsabilités, fenêtres d’intervention et affectation cyber à préciser.

## Livrable final — Demo Day

- Une application MVP fonctionnelle par équipe, démontrable sur un cas concret.
- Une démonstration devant des clients invités.
- Une présentation du design, de l’architecture et des choix IA/ML et de sécurité, avec leurs limites.
- Des retours clients documentés pour évaluer la pertinence du projet.
- Un film pour valoriser les étudiants, HETIC et les partenaires.

## Principe pédagogique

Relier la théorie à la pratique : comprendre, concevoir, construire, vérifier et expliquer. Une montée en compétences progressive, du coaching continu et six mois autour d’un véritable projet professionnel.

Planning indicatif à ajuster selon les heures disponibles, les prérequis et le calendrier HETIC. Les clients, intervenants cyber, créneaux et modalités de captation restent à organiser ; aucun engagement externe n’est présumé.
