---
name: evoluer-projet-ia-mvp
description: Faire évoluer ce projet en développant les compétences IA/ML de son porteur et un MVP utilisé par de vrais clients. À utiliser pour cadrer le produit, prioriser une évolution, conduire une expérimentation IA/ML ou préparer et analyser un pilote client.
---

# Faire évoluer le projet IA / MVP

## Deux critères de réussite

Piloter le projet avec deux résultats explicites :

- **Compétence IA/ML acquise** : le porteur sait expliquer une approche, réaliser ou modifier une partie significative et interpréter une expérience reproductible.
- **Valeur client observée** : des personnes du segment visé utilisent le MVP sur un problème réel et apportent une preuve d'utilité, d'usage récurrent ou d'engagement commercial.

Une application qui appelle une API IA ne prouve pas à elle seule une maîtrise du ML. Une démonstration, des personas inventés ou des tests automatisés ne prouvent pas une validation client. Distinguer systématiquement faits observés, hypothèses et objectifs.

Chaque cycle doit préciser son apport sur les deux critères. Une tâche de préparation peut servir principalement l'un d'eux si elle débloque une prochaine preuve identifiée pour l'autre. Ne pas ajouter de l'IA sans utilité ni écarter un apprentissage nécessaire parce qu'il ne produit pas immédiatement du revenu.

## Partir de la situation réelle

Lire les consignes du dépôt, les fichiers existants et les décisions déjà documentées. Repérer le produit, le niveau du porteur, les données disponibles, les clients accessibles, les contraintes de temps et de budget. Ne pas redemander une information déjà fournie.

Si le dépôt est vide, commencer par le problème et le segment client. Demander seulement les informations qui changent la prochaine décision : problème envisagé et accès à des clients, niveau actuel en Python/IA/ML, temps et budget disponibles. Avancer entre-temps sur un cadrage provisoire en signalant les hypothèses. Ne pas choisir définitivement un secteur, une stack ou un modèle sans contexte.

Adapter l'action à la demande : un cadrage produit doit aboutir à une décision et à une expérience ; une demande d'implémentation doit aboutir à un incrément vérifiable. Ne pas transformer une correction ciblée en refonte de la stratégie.

## Choisir la prochaine étape

Identifier l'incertitude qui bloque le plus la progression : réalité du problème, accès aux données, faisabilité IA/ML, qualité des résultats, intégration dans l'activité du client ou volonté de payer.

Quand un arbitrage est nécessaire, comparer quelques options avec ce tableau, sans inventer de précision chiffrée :

| Option | Compétence à acquérir | Preuve client attendue | Effort et coût | Dépendance ou incertitude |
| --- | --- | --- | --- | --- |

Préférer une étape assez petite pour être réalisée et évaluée avec les moyens disponibles. Fixer avant de la réaliser : l'hypothèse, le livrable, une preuve d'apprentissage, une mesure client et un critère de décision. Choisir les seuils selon le contexte ; présenter les seuils proposés comme des objectifs, jamais comme des résultats acquis.

## Construire les compétences avec le produit

Choisir la prochaine compétence à partir du besoin du produit et du niveau du porteur. Selon le cas :

- Python et manipulation de données ; statistiques et probabilités nécessaires pour comprendre les résultats.
- Préparation des données, définition de la cible et séparation entraînement/validation/test.
- Modèle simple, métriques adaptées, analyse d'erreurs, surapprentissage et fuite de données.
- Recherche documentaire, embeddings, RAG, modèles génératifs et évaluation de leurs réponses.
- Intégration, suivi de qualité, latence, coût et évolution des données en usage réel.

Ce sont des pistes, pas un programme obligatoire. Un produit fondé sur un LLM ne nécessite pas d'entraîner son propre modèle ; choisir un exercice ML complémentaire seulement s'il sert une compétence recherchée et reste proportionné.

Pour une étape technique, relier la notion à un cas concret du projet, expliquer le choix et sa limite, puis proposer une manipulation que le porteur pourra reproduire ou modifier. Préserver un rôle actif d'apprentissage sans bloquer les travaux autorisés dans l'attente d'un exercice.

Conserver une preuve tangible : code ou notebook exécutable, données ou provenance documentée, configuration et résultats comparés. Distinguer « implémenté par l'assistant », « reproduit par le porteur » et « compris et expliqué par le porteur ». Ne pas déclarer une compétence acquise sans observation correspondante.

## Construire le MVP autour d'un usage client

Définir un segment accessible, un problème concret, sa fréquence, la solution actuelle et la personne qui décide ou paie. Réduire le MVP à un parcours complet qui apporte une valeur observable : entrée réelle, traitement, résultat utilisable et retour du client.

Une prestation manuelle ou un prototype assisté peut vérifier le problème avant d'automatiser. Décrire honnêtement la part manuelle. Éviter l'infrastructure et les fonctions périphériques tant qu'elles ne sont pas nécessaires à l'usage ou à l'expérience en cours.

Préparer une validation avec des personnes du segment, sur leurs propres cas ou sur des cas représentatifs dont les limites sont explicites. Chercher d'abord les pratiques et difficultés existantes, puis observer l'utilisation ; ne pas se limiter à demander si l'idée plaît.

Choisir quelques mesures adaptées : tâche accomplie, temps gagné par rapport à la méthode actuelle, qualité acceptable, réutilisation, demande de pilote ou paiement. Identifier l'effectif, la période et la provenance des observations. Distinguer une opinion favorable, un essai, un usage récurrent, une intention d'achat et un paiement réel.

Préparer les scripts d'entretien, messages et protocoles utiles. Envoyer des messages ou engager un pilote externe seulement dans le périmètre explicitement autorisé par l'utilisateur. En l'absence de clients accessibles, préparer le recrutement et l'essai et signaler que la validation reste à réaliser ; ne pas la simuler comme une réussite.

## Vérifier l'apport de l'IA/ML

Comparer la solution à une référence simple adaptée au cas : processus actuel, règles, recherche classique ou modèle élémentaire. Évaluer la valeur ajoutée avec des exemples représentatifs ; conserver les échecs instructifs autant que les réussites.

Pour le ML prédictif, prévenir la fuite de données et choisir une séparation adaptée aux personnes, groupes ou dates concernés. Pour une solution générative, constituer un petit jeu d'évaluation stable avec des critères explicites de correction et d'utilité, dont des cas où les informations manquent.

Avant une amélioration de modèle, vérifier si le problème vient des données, du parcours ou de la définition de la tâche. Mesurer qualité, coût et latence lorsque ces facteurs conditionnent l'usage client. Ne pas entraîner un modèle complexe sans besoin démontré.

Utiliser des données clients autorisées pour l'usage prévu ; limiter les données personnelles dans les traces et exemples conservés. Vérifier les contraintes du client avant de transmettre ses données à un service tiers. Ne pas engager de dépense nouvelle sans autorisation correspondante.

## Livrer et conserver les décisions

Pour une implémentation demandée, réaliser l'incrément dans le dépôt et exécuter les vérifications proportionnées au changement. Donner une procédure de lancement et d'essai reproductible. Séparer clairement la vérification technique de l'essai client restant à effectuer.

Réutiliser le suivi existant. À défaut, créer `docs/pilotage-ia-mvp.md` lors du premier cycle effectif, avec uniquement les éléments connus ou explicitement proposés :

- Problème, segment, solution actuelle et état du MVP.
- Niveau déclaré ou observé, compétence visée et preuve d'apprentissage.
- Expérience en cours : hypothèse, livrable, métrique et critère de décision.
- Preuves datées : source, observation, résultat et limite ; anonymiser les clients si nécessaire.
- Décision : poursuivre, ajuster ou abandonner l'hypothèse ; prochaine action.

Mettre ce suivi à jour quand une expérience ou une décision change la suite, sans accumuler de documents redondants. En fin de cycle, présenter ce qui fonctionne, ce qui a été appris ou reste à démontrer, ce que les clients ont réellement confirmé et la prochaine étape proposée.
