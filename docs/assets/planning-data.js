// Source du planning HETIC. Les dates et créneaux calculés restent des propositions.
// Mously : 30 % du volume total (25 % cours + 5 % coaching). Contenu cybersécurité : 5 %.
// Ces pourcentages décrivent deux axes ; l’affectation des heures cyber reste à établir.
window.HETIC_PLANNING = {
  "school": "HETIC",
  "startDate": null,
  "allocation": {
    "mouslyTotal": 30,
    "cours": 25,
    "coaching": 5,
    "cyber": 5
  },
  "months": [
    {
      "title": "Cadrage des projets",
      "people": "Mously · Dany · Michel",
      "program": "Besoins clients, gestion de projet, culture et fondements théoriques. Théorie du design d’applications : parcours, écrans, états et données. Introduction aux risques cyber. Théorie et pratique avec Mously.",
      "learning": "Formuler un problème et identifier les données nécessaires. Expliquer dans quels cas l’IA est pertinente et définir une solution de référence simple.",
      "client": "Rencontrer des personnes du segment visé. Documenter leur problème, leur pratique actuelle et les conditions d’un premier essai.",
      "deliverable": "Une fiche projet, un parcours utilisateur, des maquettes et une première carte des données et risques.",
      "apps": "Décrire les utilisateurs et leurs tâches, dessiner un parcours et des maquettes simples, prévoir les états de chargement, d’erreur et de réussite. Justifier le design avant de générer du code.",
      "cyber": "Identifier les données à protéger, les accès nécessaires et les risques principaux du projet. La cybersécurité représente 5 % du volume pédagogique total sur le parcours."
    },
    {
      "title": "Fondations techniques",
      "people": "Mously · Antoine · Michel",
      "program": "Algorithmique, mathématiques et Python. Théorie des applications : client/serveur, HTTP, interfaces, API, données et tests. Première application guidée avant le vibe coding. Sécurité dès la conception.",
      "learning": "Préparer et explorer des données en Python. Construire une première approche simple, choisir une métrique et séparer entraînement et évaluation lorsque le modèle le nécessite.",
      "client": "Vérifier avec un client que les cas étudiés représentent son besoin et que les données sont disponibles et autorisées pour l’usage prévu.",
      "deliverable": "Un schéma d’architecture, une petite application explicable, un notebook reproductible et des critères de test.",
      "apps": "Expliquer le rôle du frontend, du backend, de l’API et du stockage. Dessiner leurs échanges et construire une petite application guidée avec un formulaire, un traitement et une persistance de données.",
      "cyber": "Définir les droits selon les usages, limiter les données collectées et repérer les menaces dans les échanges de l’application. Prévoir les contrôles avant de coder."
    },
    {
      "title": "Développement du MVP",
      "people": "Mously · Antoine · Yaaqoub",
      "program": "Interfaces, architecture et API. Vibe coding après les bases de design et une première construction guidée : spécifier, générer, relire, tester et corriger. Validation des entrées et contrôle des accès.",
      "learning": "Relier une approche IA/ML pertinente à une interface et une API. Expliquer le chemin des données et reproduire un résultat de bout en bout.",
      "client": "Faire essayer le premier parcours utilisable à des personnes du segment visé. Observer la tâche accomplie et consigner les obstacles.",
      "deliverable": "Un MVP utilisable, son architecture documentée, des tests et un relevé des premières observations clients.",
      "apps": "Construire une application de bout en bout. Utiliser le vibe coding à partir d’un design et d’une architecture explicités, puis relire, tester et modifier le code proposé. Réaliser une modification ciblée en expliquant son raisonnement.",
      "cyber": "Contrôler les entrées, les accès et les erreurs ; utiliser des requêtes paramétrées si le projet utilise une base de données. Vérifier le code généré sur les mêmes critères que le code écrit par l’équipe."
    },
    {
      "title": "Intégration technique",
      "people": "Mously · Yaaqoub · Sion",
      "program": "API, intégration et DevOps minimal. Déploiement de l’application, configuration, secrets, accès et vérifications de sécurité avant le pilote.",
      "learning": "Déployer une version accessible pour le pilote. Mesurer la qualité, la latence et le coût si ces facteurs conditionnent l’usage ; traiter les erreurs principales.",
      "client": "Préparer un essai dans les conditions du client, puis observer l’utilisation d’une version accessible avec des données autorisées.",
      "deliverable": "Une application déployée pour le pilote, une procédure reproductible et une revue des accès et secrets.",
      "apps": "Déployer et configurer l’application, diagnostiquer un échec et reproduire le parcours complet. Expliquer comment l’interface, l’API, les données et le traitement IA/ML fonctionnent ensemble.",
      "cyber": "Séparer configuration et secrets, vérifier les accès et les dépendances, prévoir HTTPS pour le déploiement et éviter d’exposer des données sensibles dans les journaux."
    },
    {
      "title": "Finalisation, tests et soutenance blanche",
      "people": "Mously · Dany · Équipe technique",
      "program": "Tests utilisateurs, améliorations et revue de sécurité du MVP. Soutenance blanche : design, architecture, application, IA/ML, sécurité et retours clients. Corrections avant le Demo Day.",
      "learning": "Analyser les erreurs et comparer les versions IA/ML sur les mêmes cas. À la soutenance blanche, expliquer les résultats, le design et l’architecture de l’application, répondre aux questions et réaliser une évolution ciblée.",
      "client": "Faire réaliser une tâche concrète et recueillir des retours datés. Mesurer selon le projet le temps gagné, la qualité acceptable ou la réutilisation.",
      "deliverable": "Un MVP stabilisé, des preuves d’apprentissage, un bilan client, une revue de sécurité et un plan de corrections issu de la soutenance blanche.",
      "apps": "Démontrer une application fonctionnelle et expliquer son design, son architecture et son code. Lors de la soutenance blanche, diagnostiquer un problème et réaliser une petite évolution en justifiant la démarche.",
      "cyber": "Tester les cas d’erreur et les accès non autorisés pertinents sur le propre MVP de l’équipe. Prioriser les corrections et documenter les risques qui restent à traiter."
    },
    {
      "title": "Démonstration clients",
      "people": "Toute l’équipe · Société de production",
      "program": "Pitch, démonstration de l’application et du MVP IA/ML, explication du design, de l’architecture et des mesures de sécurité, retours clients et captation vidéo.",
      "learning": "Expliquer les choix techniques, reproduire la démonstration et présenter les limites. Montrer les preuves de compréhension recueillies pendant le parcours.",
      "client": "Présenter le MVP à des clients invités et recueillir leurs retours. Distinguer intérêt exprimé, intention d’achat et engagement réellement observé.",
      "deliverable": "Une application MVP fonctionnelle par équipe, une démonstration explicable, des retours clients et le film du parcours.",
      "apps": "Présenter et reproduire l’application de bout en bout. Expliquer les décisions de design, le rôle du code généré et ce que chaque apprenant sait modifier et maintenir.",
      "cyber": "Présenter les mesures réellement mises en place, les vérifications effectuées et les limites résiduelles. Ne pas présenter une application comme totalement sécurisée à partir d’une simple démonstration."
    }
  ],
  "trainers": [
    {
      "id": "mously",
      "name": "Mously",
      "initials": "MO",
      "color": "#6c58d5"
    },
    {
      "id": "michel",
      "name": "Michel",
      "initials": "MI",
      "color": "#a18124"
    },
    {
      "id": "antoine",
      "name": "Antoine",
      "initials": "AN",
      "color": "#20815e"
    },
    {
      "id": "yaaqoub",
      "name": "Yaaqoub",
      "initials": "YA",
      "color": "#82719e"
    },
    {
      "id": "sion",
      "name": "Sion",
      "initials": "SI",
      "color": "#a85a13"
    },
    {
      "id": "dany",
      "name": "Dany",
      "initials": "DA",
      "color": "#527fa8"
    },
    {
      "id": "technique",
      "name": "Équipe technique",
      "initials": "ET",
      "color": "#507b86"
    },
    {
      "id": "equipe",
      "name": "Toute l’équipe",
      "initials": "EQ",
      "color": "#657589"
    },
    {
      "id": "production",
      "name": "Société de production",
      "initials": "PR",
      "color": "#ad5980"
    },
    {
      "id": "cyber",
      "name": "Cybersécurité · à affecter",
      "initials": "CY",
      "color": "#387e88"
    }
  ],
  "sessions": [
    {
      "id": "m1-1",
      "month": 1,
      "title": "Besoins clients et cadrage",
      "category": "cours",
      "trainers": [
        "mously"
      ],
      "description": "Comprendre le besoin, identifier le segment client et poser le périmètre du projet.",
      "addition": false,
      "dayOffset": 0,
      "date": null
    },
    {
      "id": "m1-2",
      "month": 1,
      "title": "Culture et fondements théoriques",
      "category": "cours",
      "trainers": [
        "michel"
      ],
      "description": "Poser les repères théoriques nécessaires au projet et à ses choix techniques.",
      "addition": false,
      "dayOffset": 4,
      "date": null
    },
    {
      "id": "m1-design-apps",
      "month": 1,
      "title": "Théorie du design des applications",
      "category": "cours",
      "trainers": [
        "mously",
        "michel"
      ],
      "description": "Étudier le besoin, les parcours utilisateurs, la hiérarchie des écrans, les états d’interface et les données. Produire des maquettes justifiées avant la génération de code.",
      "addition": false,
      "dayOffset": 4,
      "date": null
    },
    {
      "id": "m1-mously-cours",
      "month": 1,
      "title": "Théorie et pratique : du besoin au projet",
      "category": "cours",
      "trainers": [
        "mously"
      ],
      "description": "Relier les concepts au problème client, construire une première hypothèse et la mettre à l’épreuve.",
      "addition": false,
      "dayOffset": 6,
      "date": null
    },
    {
      "id": "m1-3",
      "month": 1,
      "title": "Gestion de projet",
      "category": "cours",
      "trainers": [
        "dany"
      ],
      "description": "Organiser le travail en équipe, les jalons et les premières décisions.",
      "addition": false,
      "dayOffset": 8,
      "date": null
    },
    {
      "id": "m1-cyber-fondations",
      "month": 1,
      "title": "Cyber : données, risques et usages",
      "category": "cyber",
      "trainers": [
        "cyber"
      ],
      "description": "Identifier les données sensibles, les accès nécessaires et les risques du projet. Poser les bons réflexes de protection dans le périmètre de 5 % de cybersécurité du parcours.",
      "addition": false,
      "dayOffset": 8,
      "date": null
    },
    {
      "id": "m1-4",
      "month": 1,
      "title": "Premiers entretiens clients",
      "category": "projet",
      "trainers": [
        "equipe"
      ],
      "description": "Documenter la pratique actuelle et les difficultés de personnes du segment visé.",
      "addition": true,
      "dayOffset": 12,
      "date": null
    },
    {
      "id": "m1-coaching",
      "month": 1,
      "title": "Coaching et suivi des projets",
      "category": "coaching",
      "trainers": [
        "mously"
      ],
      "description": "Faire le point sur l’avancement, les apprentissages et les prochaines validations clients.",
      "addition": false,
      "dayOffset": 23,
      "date": null
    },
    {
      "id": "m2-1",
      "month": 2,
      "title": "Algorithmique et Python",
      "category": "cours",
      "trainers": [
        "antoine"
      ],
      "description": "Pratiquer les bases algorithmiques et traiter des données avec Python.",
      "addition": false,
      "dayOffset": 0,
      "date": null
    },
    {
      "id": "m2-2",
      "month": 2,
      "title": "Mathématiques pour le projet",
      "category": "cours",
      "trainers": [
        "antoine"
      ],
      "description": "Relier les notions mathématiques aux données et aux résultats du projet.",
      "addition": false,
      "dayOffset": 4,
      "date": null
    },
    {
      "id": "m2-3",
      "month": 2,
      "title": "Fondements et culture IA",
      "category": "cours",
      "trainers": [
        "michel"
      ],
      "description": "Relier les fondements théoriques aux premières expérimentations.",
      "addition": false,
      "dayOffset": 8,
      "date": null
    },
    {
      "id": "m2-mously-cours",
      "month": 2,
      "title": "Théorie et pratique : raisonner sur les données",
      "category": "cours",
      "trainers": [
        "mously"
      ],
      "description": "Expliquer les notions utilisées, manipuler les données et interpréter les premiers résultats avec les étudiants.",
      "addition": false,
      "dayOffset": 9,
      "date": null
    },
    {
      "id": "m2-architecture-apps",
      "month": 2,
      "title": "Théorie des applications et architecture",
      "category": "cours",
      "trainers": [
        "mously",
        "antoine"
      ],
      "description": "Expliquer client/serveur, HTTP, frontend, backend, API et stockage. Dessiner les échanges et définir les cas de test d’une application simple.",
      "addition": false,
      "dayOffset": 10,
      "date": null,
      "requires": [
        "m1-design-apps"
      ]
    },
    {
      "id": "m2-4",
      "month": 2,
      "title": "Première référence IA/ML",
      "category": "projet",
      "trainers": [
        "antoine"
      ],
      "description": "Produire un notebook reproductible et comparer une première approche à une référence simple.",
      "addition": true,
      "dayOffset": 12,
      "date": null
    },
    {
      "id": "m2-cyber-design",
      "month": 2,
      "title": "Cyber : sécurité dès la conception",
      "category": "cyber",
      "trainers": [
        "cyber"
      ],
      "description": "Repérer les menaces dans le schéma de l’application, définir les droits par usage et limiter les données collectées. Prévoir les contrôles dans le design.",
      "addition": false,
      "dayOffset": 13,
      "date": null,
      "requires": [
        "m1-cyber-fondations",
        "m1-design-apps"
      ]
    },
    {
      "id": "m2-app-guidee",
      "month": 2,
      "title": "Construire une première application guidée",
      "category": "projet",
      "trainers": [
        "antoine"
      ],
      "description": "Construire un formulaire, un traitement et une persistance de données. Lire, modifier et expliquer le code avec un accompagnement pédagogique avant de déléguer la génération à un assistant.",
      "addition": false,
      "dayOffset": 18,
      "date": null,
      "requires": [
        "m2-architecture-apps"
      ]
    },
    {
      "id": "m2-coaching",
      "month": 2,
      "title": "Coaching et suivi des projets",
      "category": "coaching",
      "trainers": [
        "mously"
      ],
      "description": "Faire le point sur l’avancement, les apprentissages et les prochaines validations clients.",
      "addition": false,
      "dayOffset": 23,
      "date": null
    },
    {
      "id": "m3-1",
      "month": 3,
      "title": "Interfaces et architecture",
      "category": "cours",
      "trainers": [
        "antoine"
      ],
      "description": "Construire une interface et organiser le parcours du premier MVP.",
      "addition": false,
      "dayOffset": 0,
      "date": null
    },
    {
      "id": "m3-2",
      "month": 3,
      "title": "API du MVP",
      "category": "cours",
      "trainers": [
        "yaaqoub"
      ],
      "description": "Connecter les données, le traitement et l’interface par une API.",
      "addition": false,
      "dayOffset": 4,
      "date": null
    },
    {
      "id": "m3-3",
      "month": 3,
      "title": "Revue des choix théoriques",
      "category": "cours",
      "trainers": [
        "michel"
      ],
      "description": "Expliquer les hypothèses du modèle et les limites de l’évaluation.",
      "addition": true,
      "dayOffset": 8,
      "date": null
    },
    {
      "id": "m3-mously-cours",
      "month": 3,
      "title": "Théorie et pratique : concevoir le MVP",
      "category": "cours",
      "trainers": [
        "mously"
      ],
      "description": "Relier les choix techniques au besoin, pratiquer sur le parcours du MVP et expliciter les limites.",
      "addition": false,
      "dayOffset": 10,
      "date": null
    },
    {
      "id": "m3-4",
      "month": 3,
      "title": "Suivi de projet",
      "category": "coaching",
      "trainers": [
        "dany"
      ],
      "description": "Ajuster le périmètre et les priorités pour obtenir un parcours utilisable.",
      "addition": false,
      "dayOffset": 12,
      "date": null
    },
    {
      "id": "m3-vibe-coding",
      "month": 3,
      "title": "Vibe coding après le design des apps",
      "category": "cours",
      "trainers": [
        "mously",
        "antoine"
      ],
      "description": "Partir des maquettes et de l’architecture pour formuler une demande à un assistant de code. Relire la proposition, tester, déboguer et justifier les changements. Évaluer la compréhension par une évolution ciblée expliquée par l’apprenant.",
      "addition": false,
      "dayOffset": 14,
      "date": null,
      "requires": [
        "m1-design-apps",
        "m2-architecture-apps",
        "m2-app-guidee",
        "m2-cyber-design"
      ]
    },
    {
      "id": "m3-5",
      "month": 3,
      "title": "Premier essai client",
      "category": "projet",
      "trainers": [
        "equipe"
      ],
      "description": "Observer une tâche concrète sur le MVP et relever les obstacles.",
      "addition": true,
      "dayOffset": 16,
      "date": null
    },
    {
      "id": "m3-cyber-code",
      "month": 3,
      "title": "Cyber : entrées, accès et code généré",
      "category": "cyber",
      "trainers": [
        "cyber"
      ],
      "description": "Vérifier la validation des entrées, les autorisations et la gestion des erreurs. Utiliser des requêtes paramétrées selon le projet et relire les propositions de code de l’assistant.",
      "addition": false,
      "dayOffset": 18,
      "date": null,
      "requires": [
        "m2-cyber-design"
      ]
    },
    {
      "id": "m3-coaching",
      "month": 3,
      "title": "Coaching et suivi des projets",
      "category": "coaching",
      "trainers": [
        "mously"
      ],
      "description": "Faire le point sur l’avancement, les apprentissages et les prochaines validations clients.",
      "addition": false,
      "dayOffset": 23,
      "date": null
    },
    {
      "id": "m4-1",
      "month": 4,
      "title": "API et intégration",
      "category": "cours",
      "trainers": [
        "yaaqoub"
      ],
      "description": "Assembler le parcours complet et traiter les erreurs d’intégration.",
      "addition": false,
      "dayOffset": 0,
      "date": null
    },
    {
      "id": "m4-2",
      "month": 4,
      "title": "DevOps minimal et déploiement",
      "category": "cours",
      "trainers": [
        "sion"
      ],
      "description": "Rendre une version du MVP accessible dans des conditions reproductibles.",
      "addition": false,
      "dayOffset": 4,
      "date": null
    },
    {
      "id": "m4-3",
      "month": 4,
      "title": "Consolidation des interfaces",
      "category": "cours",
      "trainers": [
        "antoine"
      ],
      "description": "Améliorer le parcours à partir des premiers essais et des contraintes d’intégration.",
      "addition": true,
      "dayOffset": 8,
      "date": null
    },
    {
      "id": "m4-cyber-deploiement",
      "month": 4,
      "title": "Cyber : déploiement, secrets et configuration",
      "category": "cyber",
      "trainers": [
        "cyber"
      ],
      "description": "Séparer les secrets de la configuration, vérifier les accès et dépendances, prévoir HTTPS et des journaux sans données sensibles pour le pilote.",
      "addition": false,
      "dayOffset": 9,
      "date": null,
      "requires": [
        "m3-cyber-code"
      ]
    },
    {
      "id": "m4-4",
      "month": 4,
      "title": "Pilote en conditions clients",
      "category": "projet",
      "trainers": [
        "equipe"
      ],
      "description": "Faire utiliser une version accessible sur des cas autorisés et observer les résultats.",
      "addition": true,
      "dayOffset": 12,
      "date": null
    },
    {
      "id": "m4-mously-cours",
      "month": 4,
      "title": "Théorie et pratique : intégrer et fiabiliser",
      "category": "cours",
      "trainers": [
        "mously"
      ],
      "description": "Analyser un cas d’intégration concret et pratiquer la résolution des difficultés du projet.",
      "addition": false,
      "dayOffset": 14,
      "date": null
    },
    {
      "id": "m4-coaching",
      "month": 4,
      "title": "Coaching et suivi des projets",
      "category": "coaching",
      "trainers": [
        "mously"
      ],
      "description": "Faire le point sur l’avancement, les apprentissages et les prochaines validations clients.",
      "addition": false,
      "dayOffset": 23,
      "date": null
    },
    {
      "id": "m5-1",
      "month": 5,
      "title": "Tests utilisateurs et améliorations",
      "category": "projet",
      "trainers": [
        "technique"
      ],
      "description": "Observer l’usage, analyser les échecs et justifier les améliorations.",
      "addition": false,
      "dayOffset": 0,
      "date": null
    },
    {
      "id": "m5-2",
      "month": 5,
      "title": "Stabilisation API et déploiement",
      "category": "cours",
      "trainers": [
        "yaaqoub",
        "sion"
      ],
      "description": "Corriger les points bloquants avant la démonstration.",
      "addition": true,
      "dayOffset": 4,
      "date": null
    },
    {
      "id": "m5-3",
      "month": 5,
      "title": "Préparation de la soutenance blanche",
      "category": "coaching",
      "trainers": [
        "mously",
        "dany"
      ],
      "description": "Préparer le pitch, le scénario de démonstration, les preuves IA/ML et les réponses aux questions du jury pédagogique.",
      "addition": false,
      "dayOffset": 8,
      "date": null
    },
    {
      "id": "m5-4",
      "month": 5,
      "title": "Comparaison et analyse des erreurs",
      "category": "projet",
      "trainers": [
        "technique"
      ],
      "description": "Comparer les versions sur les mêmes cas et expliquer les limites de la solution IA/ML.",
      "addition": true,
      "dayOffset": 12,
      "date": null
    },
    {
      "id": "m5-cyber-revue",
      "month": 5,
      "title": "Cyber : revue du MVP avant la soutenance",
      "category": "cyber",
      "trainers": [
        "cyber"
      ],
      "description": "Vérifier les cas d’erreur et les accès pertinents sur l’application de l’équipe, corriger les points bloquants et consigner les limites avant la soutenance blanche.",
      "addition": false,
      "dayOffset": 14,
      "date": null,
      "requires": [
        "m4-cyber-deploiement"
      ]
    },
    {
      "id": "m5-mously-cours",
      "month": 5,
      "title": "Théorie et pratique : évaluer le MVP",
      "category": "cours",
      "trainers": [
        "mously"
      ],
      "description": "Interpréter les résultats, analyser les erreurs et justifier les améliorations avant la soutenance blanche.",
      "addition": false,
      "dayOffset": 14,
      "date": null
    },
    {
      "id": "m5-soutenance-blanche",
      "month": 5,
      "title": "Soutenance blanche des MVP",
      "category": "demo",
      "trainers": [
        "mously",
        "dany",
        "technique"
      ],
      "description": "Chaque équipe présente le besoin et le design de l’application, explique son architecture, démontre le MVP et justifie les choix IA/ML et de sécurité. Une petite évolution ou un diagnostic ciblé permet d’observer la compréhension du code. Le jury propose des corrections avant le Demo Day.",
      "addition": false,
      "dayOffset": 18,
      "date": null,
      "requires": [
        "m3-vibe-coding",
        "m5-cyber-revue"
      ]
    },
    {
      "id": "m5-corrections-soutenance",
      "month": 5,
      "title": "Corrections après soutenance blanche",
      "category": "projet",
      "trainers": [
        "mously",
        "technique"
      ],
      "description": "Prioriser les retours de la soutenance blanche, corriger le parcours et les problèmes de sécurité identifiés, puis répéter la démonstration de l’application.",
      "addition": false,
      "dayOffset": 21,
      "date": null
    },
    {
      "id": "m5-coaching",
      "month": 5,
      "title": "Coaching et suivi des projets",
      "category": "coaching",
      "trainers": [
        "mously"
      ],
      "description": "Faire le point sur l’avancement, les apprentissages et les prochaines validations clients.",
      "addition": false,
      "dayOffset": 23,
      "date": null
    },
    {
      "id": "m6-1",
      "month": 6,
      "title": "Pitch et démarche projet",
      "category": "demo",
      "trainers": [
        "dany",
        "mously"
      ],
      "description": "Présenter le besoin, le travail réalisé et les décisions qui ont fait évoluer le MVP.",
      "addition": false,
      "dayOffset": 0,
      "date": null
    },
    {
      "id": "m6-mously-cours",
      "month": 6,
      "title": "Théorie et pratique : défendre ses choix",
      "category": "cours",
      "trainers": [
        "mously"
      ],
      "description": "Expliquer la démarche, reproduire la démonstration et préparer les réponses aux questions sur le MVP.",
      "addition": false,
      "dayOffset": 1,
      "date": null
    },
    {
      "id": "m6-2",
      "month": 6,
      "title": "Démonstration du MVP",
      "category": "demo",
      "trainers": [
        "equipe"
      ],
      "description": "Démontrer une application MVP complète devant les clients et expliquer les décisions de design, d’architecture, d’IA/ML et de sécurité avec leurs limites.",
      "addition": false,
      "dayOffset": 4,
      "date": null
    },
    {
      "id": "m6-3",
      "month": 6,
      "title": "Retours clients",
      "category": "projet",
      "trainers": [
        "equipe"
      ],
      "description": "Documenter les retours et distinguer intérêt exprimé, usage et engagement observé.",
      "addition": false,
      "dayOffset": 8,
      "date": null
    },
    {
      "id": "m6-4",
      "month": 6,
      "title": "Captation et storytelling",
      "category": "demo",
      "trainers": [
        "production"
      ],
      "description": "Produire un film pour valoriser les étudiants, HETIC et les partenaires.",
      "addition": false,
      "dayOffset": 12,
      "date": null
    },
    {
      "id": "m6-coaching",
      "month": 6,
      "title": "Coaching et suivi des projets",
      "category": "coaching",
      "trainers": [
        "mously"
      ],
      "description": "Faire le point sur l’avancement, les apprentissages et les prochaines validations clients.",
      "addition": false,
      "dayOffset": 23,
      "date": null
    }
  ]
};
