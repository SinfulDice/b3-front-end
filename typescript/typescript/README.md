# Atelier TypeScript

21 exercices progressifs, indépendants, en français, sur le thème d’une bibliothèque. Chaque exercice dispose de tests de typage ; les 19 exercices avec du comportement disposent également de tests exécutables. Les exercices 11 et 12 portent uniquement sur des transformations de types, effacées à l’exécution.

## Démarrer

Prérequis : Node.js **22.14 minimum** (Node.js 24 conseillé) et npm. Aucun navigateur ni service réseau n’est nécessaire après l’installation.

Depuis la racine du dépôt :

```sh
cd typescript
npm ci
npm test -- 01
```

Lire [les énoncés](exercices.md), compléter les fichiers dans `src/` puis relancer les tests. **Les échecs initiaux sont attendus** : les fonctions lèvent `À implémenter` et les alias `unknown` doivent être remplacés. Certains exercices échouent dès la compilation tant que leur contrat n’est pas complété.

```sh
npm test -- 04                 # un seul exercice : types puis comportement
npm test -- 01 02 03           # plusieurs exercices
npm run test:types -- 11       # contrats de types uniquement
npm run test:runtime -- 17     # compilation et comportement, sans les *.types.ts
npm test                      # l’ensemble des 21 exercices
```

Les identifiants ont deux chiffres, de `01` à `21`. Une erreur de compilation empêche l’exécution des tests sélectionnés : travailler par exercice pour ne pas être bloqué par les autres fichiers à compléter. Un code de sortie non nul signale un échec ; un identifiant inconnu est refusé.

## Parcours et couverture

| Exercices | Objectif | Notions principales |
| --- | --- | --- |
| 01–03 | Fondamentaux et modèles | Primitifs, inférence, tuples, propriétés optionnelles, interfaces/types, intersections, unions, surcharges |
| 04–05 | Validation et états | unknown, gardes, prédicats, discriminants, never et exhaustivité |
| 06–07 | Réutilisation | Génériques, contraintes, keyof, accès indexés, collections readonly |
| 08–10 | Utilitaires courants | Partial, Required, Readonly, Pick, Omit, Record, Exclude, Extract, NonNullable, Parameters, ReturnType, Awaited |
| 11–13 | Types avancés | Mapped/conditional types, infer, récursivité, template literals, Uppercase, Lowercase, Capitalize, Uncapitalize, as const, satisfies, typeof, NoInfer |
| 14–15 | Classes et contexte | abstract, extends, implements, override, protected, readonly, #private, static, getter, ConstructorParameters, InstanceType, ThisParameterType, OmitThisParameter, ThisType |
| 16–17 | Données et asynchronisme | Map, Set, Date, RegExp, URL, URLSearchParams, Promise, Error, JSON, validation HTTP, dépendances injectées |
| 18–20 | Contrats d’application | Événements typés, callbacks, marques avec unique symbol, asserts, DOM, null et nettoyage d’écouteurs |
| 21 (bonus) | Outils de développement | API du compilateur : SourceFile, Node, SyntaxKind, createSourceFile, forEachChild et gardes syntaxiques |

Les modules ESM et `import type` sont utilisés dans tout l’atelier. La configuration active `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitOverride`, `noFallthroughCasesInSwitch` et `verbatimModuleSyntax`.

Tous les types utilitaires de la [page officielle Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html) sont exercés. Les objets standards comme Map ou Promise relèvent de JavaScript ; le DOM et URL relèvent des API Web. L’API du compilateur constitue un sujet distinct, introduit dans le bonus. Ce parcours couvre les pratiques courantes d’application, sans chercher à inventorier toute l’API interne du compilateur ni à imposer des fonctionnalités spécialisées comme les décorateurs ou les namespaces.

## Comment la validation fonctionne

Les fichiers `tests/*.types.ts` sont compilés avec le code élève. `Expect<Equal<…>>` vérifie les types attendus ; les `@ts-expect-error` vérifient les usages qui doivent être interdits. Une directive devenue inutile est elle-même une erreur : élargir un contrat à `any` ou à un type trop permissif ne suffit donc pas à réussir.

Les fichiers `tests/*.test.ts` vérifient les sorties, les cas vides, les erreurs et les effets de bord avec `node:test` et `node:assert/strict`. Ils sont compilés puis exécutés ; les fichiers de tests de types ne sont jamais exécutés. Les appels HTTP et les ports DOM sont simulés, ce qui rend les tests indépendants d’un serveur et d’un navigateur.

Un contrôle syntaxique interdit dans les réponses : `any` explicite, assertions non nulles (`!`), conversions forcées (`as T`, `<T>`) et commentaires de suppression TypeScript. `as const` reste autorisé. Certaines assertions apparaissent dans les tests pour simuler des appelants JavaScript ou adapter des doubles de test ; elles ne constituent pas des exemples à recopier dans les réponses.

Le lanceur copie uniquement les exercices sélectionnés dans un dossier temporaire `.work/`, utilise le compilateur local, puis efface ce dossier. Il ne remplace jamais les fichiers élèves. Les versions de dépendances sont fixées dans `package-lock.json`.

Les tests vérifient les contrats observables ; une relecture reste nécessaire pour évaluer la lisibilité, le choix d’une abstraction et la justification d’une technique demandée, par exemple `satisfies` ou un switch exhaustif. Un résultat vert ne prouve pas à lui seul la compréhension.

## Pour l’enseignant

Les [corrigés et conseils d’évaluation](corriges/README.md) sont séparés du travail élève. Les vérifier avec les mêmes tests :

```sh
npm run test:solutions
npm run test:solutions -- 14
```

Retirer le dossier `corriges/` de la copie distribuée aux élèves si les réponses ne doivent pas être accessibles. Les commandes élèves fonctionnent sans ce dossier. La commande `test:solutions` nécessite évidemment les corrigés.

Sources de référence : [Handbook TypeScript](https://www.typescriptlang.org/docs/handbook/intro.html), [classes](https://www.typescriptlang.org/docs/handbook/2/classes.html), [types utilitaires](https://www.typescriptlang.org/docs/handbook/utility-types.html), [API du compilateur](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API), [tests intégrés à Node.js](https://nodejs.org/api/test.html).
