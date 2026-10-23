# Guide enseignant

Chaque fichier de ce dossier est une proposition de solution. `npm run test:solutions` sélectionne ces fichiers à la place de `src/` dans un espace temporaire et applique exactement les mêmes tests. Le travail des élèves n’est pas modifié. Les réponses ne sont pas importées par les tests.

## Organiser le parcours

Faire d’abord 01–07 pour consolider les bases. Poursuivre avec 08–10 et 14–17 pour les pratiques courantes. Utiliser 11–13 et 18–20 en approfondissement, puis 21 en bonus pour les élèves intéressés par les outils de développement. L’ordre numérique reste une progression possible ; les exercices sont indépendants.

Pour chaque exercice, demander à l’élève de montrer un test de réussite et un cas refusé, puis de justifier le type public choisi. Une adaptation orale simple permet de vérifier sa compréhension : ajouter un statut en 05, rendre une propriété optionnelle en 07, ajouter un événement en 18.

## Proposition de barème sur 20

| Critère | Points |
| --- | --- |
| Fondamentaux et contrats métier (01–05) | 4 |
| Génériques et utilitaires courants (06–10) | 5 |
| Transformations de types et inférence (11–13) | 3 |
| Classes, API standards, asynchronisme (14–17) | 4 |
| Contrats applicatifs et DOM (18–20) | 2 |
| Lisibilité et explication des choix à l’oral | 2 |

Bonus 21 : jusqu’à 1 point supplémentaire, sans compenser des contrats incorrects dans le socle. Adapter la pondération aux notions effectivement traitées en cours.

## Points à faire expliquer

- Un type TypeScript ne valide pas un JSON et n’existe généralement plus à l’exécution (04, 17).
- Une garde ou une fonction d’assertion doit réellement vérifier ce qu’elle promet (04, 19).
- Un discriminant relie l’état aux données autorisées ; `never` sert à vérifier l’exhaustivité (05).
- Le type de sortie d’une fonction générique doit conserver une relation avec ses entrées (06, 07, 18).
- `Readonly` et `DeepReadonly` empêchent des écritures au typage, mais ne font pas `Object.freeze` (08, 11).
- `satisfies` vérifie la compatibilité ; `as const` préserve les littéraux ; `NoInfer` contrôle l’origine de l’inférence (13).
- `private` TypeScript et `#private` ECMAScript n’ont pas la même confidentialité à l’exécution (14).
- Une fonction liée avec bind et une méthode utilisant this ont des contraintes d’appel différentes (15).
- Une API externe se teste en injectant une dépendance et en couvrant les erreurs HTTP, réseau et de décodage (17).
- Une marque d’identifiant est une convention de typage, pas une protection à l’exécution (19).
- Une inspection syntaxique ne remplace pas le TypeChecker ni une compilation complète (21).

La vérification syntaxique fournie est volontairement ciblée : ce n’est pas un linter complet ni un mécanisme de lutte contre la triche. Les tests ne doivent pas être modifiés dans les rendus.
