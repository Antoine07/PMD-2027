// Source du planning HETIC. Les dates et créneaux calculés restent des propositions.
// Mously : 30 % du volume total, répartis en 25 % de cours et 5 % de coaching.
window.HETIC_PLANNING = {
  "school": "HETIC",
  "startDate": null,
  "allocation": {
    "mouslyTotal": 30,
    "cours": 25,
    "coaching": 5
  },
  "months": [
    {
      "title": "Cadrage des projets",
      "people": "Mously · Dany · Michel",
      "program": "Besoins clients, gestion de projet, culture et fondements théoriques. Théorie et pratique appliquées au projet avec Mously.",
      "learning": "Formuler un problème et identifier les données nécessaires. Expliquer dans quels cas l’IA est pertinente et définir une solution de référence simple.",
      "client": "Rencontrer des personnes du segment visé. Documenter leur problème, leur pratique actuelle et les conditions d’un premier essai.",
      "deliverable": "Une fiche projet : problème, segment client, données accessibles et hypothèse de valeur."
    },
    {
      "title": "Fondations techniques",
      "people": "Mously · Antoine · Michel",
      "program": "Algorithmique, mathématiques, Python. Théorie et pratique appliquées au projet avec Mously.",
      "learning": "Préparer et explorer des données en Python. Construire une première approche simple, choisir une métrique et séparer entraînement et évaluation lorsque le modèle le nécessite.",
      "client": "Vérifier avec un client que les cas étudiés représentent son besoin et que les données sont disponibles et autorisées pour l’usage prévu.",
      "deliverable": "Un notebook reproductible, une référence simple et des premiers résultats dont les limites sont expliquées."
    },
    {
      "title": "Développement du MVP",
      "people": "Mously · Antoine · Yaaqoub",
      "program": "Interfaces, architecture et API. Théorie et pratique appliquées au projet avec Mously.",
      "learning": "Relier une approche IA/ML pertinente à une interface et une API. Expliquer le chemin des données et reproduire un résultat de bout en bout.",
      "client": "Faire essayer le premier parcours utilisable à des personnes du segment visé. Observer la tâche accomplie et consigner les obstacles.",
      "deliverable": "Un premier MVP de bout en bout et des observations d’usage, avec la part manuelle explicitée."
    },
    {
      "title": "Intégration technique",
      "people": "Mously · Yaaqoub · Sion",
      "program": "API, intégration et DevOps minimal. Théorie et pratique appliquées au projet avec Mously.",
      "learning": "Déployer une version accessible pour le pilote. Mesurer la qualité, la latence et le coût si ces facteurs conditionnent l’usage ; traiter les erreurs principales.",
      "client": "Préparer un essai dans les conditions du client, puis observer l’utilisation d’une version accessible avec des données autorisées.",
      "deliverable": "Une version déployée pour le pilote, une procédure de lancement et un protocole d’essai."
    },
    {
      "title": "Finalisation, tests et soutenance blanche",
      "people": "Mously · Dany · Équipe technique",
      "program": "Tests utilisateurs, améliorations, théorie et pratique avec Mously, soutenance blanche et préparation du Demo Day.",
      "learning": "Analyser les échecs et comparer une version améliorée à la référence sur les mêmes cas. Lors de la soutenance blanche, expliquer les choix, reproduire la démonstration et répondre aux questions sur le MVP.",
      "client": "Faire réaliser une tâche concrète et recueillir des retours datés. Mesurer selon le projet le temps gagné, la qualité acceptable ou la réutilisation.",
      "deliverable": "Un MVP stabilisé, un bilan des essais clients, une soutenance blanche et un plan de corrections avant le Demo Day."
    },
    {
      "title": "Démonstration clients",
      "people": "Toute l’équipe · Société de production",
      "program": "Pitch, MVP, retours clients, captation vidéo. Théorie et pratique appliquées au projet avec Mously.",
      "learning": "Expliquer les choix techniques, reproduire la démonstration et présenter les limites. Montrer les preuves de compréhension recueillies pendant le parcours.",
      "client": "Présenter le MVP à des clients invités et recueillir leurs retours. Distinguer intérêt exprimé, intention d’achat et engagement réellement observé.",
      "deliverable": "Un MVP fonctionnel par équipe, une présentation, des retours clients documentés et un film du parcours."
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
      "description": "Chaque équipe présente son MVP, réalise une démonstration reproductible et répond aux questions sur ses choix techniques, ses limites et les retours clients. Le jury pédagogique propose des corrections prioritaires avant le Demo Day.",
      "addition": false,
      "dayOffset": 18,
      "date": null
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
      "description": "Prioriser les retours de la soutenance blanche, corriger les points bloquants du MVP et répéter le parcours de démonstration avant la présentation aux clients.",
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
      "description": "Montrer un parcours complet et expliquer les choix techniques aux clients invités.",
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
