# Exercices TypeScript — bibliothèque

Pour installer et lancer les tests, lire [le guide](README.md). On modifie uniquement `src/`, jamais les tests pour les faire passer. Les fichiers `*.types.ts` sont compilés, jamais exécutés. Les `@ts-expect-error` y indiquent des appels qui **doivent être refusés** : si l’erreur disparaît, le test de typage échoue.

Les signatures de départ servent de guide. Remplacer les alias `unknown`, compléter les types demandés et les corps qui lèvent `À implémenter`. Certaines signatures (surcharges, prédicat, assertion, NoInfer) sont volontairement incomplètes. Les exercices sont indépendants : aucun n’importe le travail d’un autre exercice.

Pour chaque exercice : lire les tests, implémenter, lancer la commande indiquée puis expliquer pourquoi les entrées interdites doivent être refusées. Un type exact est demandé seulement quand cela fait partie du contrat ; plusieurs implémentations peuvent satisfaire les tests.

## 01 — Types primitifs, tableaux et tuples

**Notions :** Inférence, paramètres optionnels et par défaut, tableaux readonly, tuples, null.

**Fichier :** [src/01-fondamentaux.ts](src/01-fondamentaux.ts).

Compléter `BookLine` : tuple readonly `[title: string, pages: number]`.
Implémenter `formatBook(line, available = true, subtitle?)` : `Dune — 412 p. — disponible`, ou `Dune : Tome 1 — 412 p. — indisponible` avec un sous-titre non vide. Un sous-titre vide doit être ignoré.
`firstTitle` retourne le premier titre ou `null` pour un tableau vide. Ne jamais modifier les entrées.

```sh
npm test -- 01
```

**Validation :** [comportement](tests/01-fondamentaux.test.ts), [typage](tests/01-fondamentaux.types.ts).

## 02 — Modéliser les données métier

**Notions :** interface, type, intersection, readonly, propriétés optionnelles, import type.

**Fichier :** [src/02-modelisation.ts](src/02-modelisation.ts).

Définir `Author` avec `name: string` et `birthYear?: number`. Définir `Book` avec `readonly id: string`, `title: string`, `author: Author`, `tags: readonly string[]` et `publishedAt?: Date`.
Définir `Borrowable` comme l’intersection de `Book` et `{ available: boolean }`.
`describe` retourne `Dune, par Frank Herbert`. `withAvailability` renvoie une copie du livre enrichie de `available`, sans muter le livre.

```sh
npm test -- 02
```

**Validation :** [comportement](tests/02-modelisation.test.ts), [typage](tests/02-modelisation.types.ts).

## 03 — Unions et surcharges

**Notions :** Unions littérales, surcharge, narrowing, typeof.

**Fichier :** [src/03-unions.ts](src/03-unions.ts).

Définir `Status` comme `'available' | 'borrowed' | 'reserved'`. `statusLabel` associe ces statuts à `Disponible`, `Emprunté`, `Réservé`.
Surcharger `normalizeTitle` : une chaîne donne une chaîne nettoyée avec `trim`, un tableau readonly de chaînes donne un nouveau tableau `string[]` nettoyé. Préserver la précision du retour selon l’entrée.

```sh
npm test -- 03
```

**Validation :** [comportement](tests/03-unions.test.ts), [typage](tests/03-unions.types.ts).

## 04 — Valider une frontière unknown

**Notions :** unknown, gardes de types, prédicats, JSON, instanceof Error.

**Fichier :** [src/04-validation.ts](src/04-validation.ts).

Définir le garde `isBook(value): value is BookSummary` : objet non nul, non tableau, `id` et `title` chaînes non vides après trim, `pages` entier strictement positif. Les propriétés supplémentaires sont acceptées.
`parseBook` parse le JSON et valide le résultat. En cas de JSON invalide ou de forme incorrecte, lever une `Error` dont le message vaut `Livre invalide`. Le type de la donnée externe doit rester `unknown` jusqu’à validation.

```sh
npm test -- 04
```

**Validation :** [comportement](tests/04-validation.test.ts), [typage](tests/04-validation.types.ts).

## 05 — États et exhaustivité

**Notions :** Union discriminée, never, contrôle de flux.

**Fichier :** [src/05-exhaustivite.ts](src/05-exhaustivite.ts).

Créer `LoadState<T>` avec quatre variantes : `{ status: 'idle' }`, `{ status: 'loading' }`, `{ status: 'success'; data: T }`, `{ status: 'error'; error: Error }`.
`renderState` retourne respectivement `Prêt`, `Chargement…`, `N livre(s)` et le message de l’erreur. Utiliser un switch exhaustif et `assertNever`, qui lève une erreur si un état inattendu arrive à l’exécution.

```sh
npm test -- 05
```

**Validation :** [comportement](tests/05-exhaustivite.test.ts), [typage](tests/05-exhaustivite.types.ts).

## 06 — Écrire des fonctions génériques

**Notions :** Génériques, contraintes, tuples, collections readonly.

**Fichier :** [src/06-generiques.ts](src/06-generiques.ts).

`first<T>` renvoie le premier élément ou `undefined`, en préservant son type.
`pair<A, B>` renvoie un tuple readonly de deux valeurs de types potentiellement différents.
`indexById<T extends { id: string }>` renvoie une `Map<string, T>`. En cas de doublon, le dernier élément gagne. Les entrées ne sont pas modifiées.

```sh
npm test -- 06
```

**Validation :** [comportement](tests/06-generiques.test.ts), [typage](tests/06-generiques.types.ts).

## 07 — Relier les clés aux valeurs

**Notions :** keyof, accès indexé T[K], contraintes génériques.

**Fichier :** [src/07-cles.ts](src/07-cles.ts).

`getProperty<T, K extends keyof T>` renvoie exactement `T[K]`. `pluck` reçoit un tableau readonly de `T` et une clé valide et renvoie un tableau des valeurs associées. Les clés inexistantes doivent être refusées à la compilation.

```sh
npm test -- 07
```

**Validation :** [comportement](tests/07-cles.test.ts), [typage](tests/07-cles.types.ts).

## 08 — Construire les contrats CRUD

**Notions :** Partial, Required, Readonly, Pick, Omit, Record.

**Fichier :** [src/08-utilitaires-objets.ts](src/08-utilitaires-objets.ts).

À partir de `Book`, construire `BookPreview` (id et title), `BookDraft` (sans id), `BookPatch` (sans id, propriétés restantes optionnelles), `CompleteBook` (toutes les propriétés requises), `FrozenBook` (Readonly) et `Catalog` (Record d’id vers Book).
`updateBook` produit une copie mise à jour, préserve l’id et ne modifie pas l’original. `Readonly` est superficiel : ne pas le présenter comme un gel à l’exécution.

```sh
npm test -- 08
```

**Validation :** [comportement](tests/08-utilitaires-objets.test.ts), [typage](tests/08-utilitaires-objets.types.ts).

## 09 — Filtrer des unions

**Notions :** Exclude, Extract, NonNullable, prédicat générique.

**Fichier :** [src/09-utilitaires-unions.ts](src/09-utilitaires-unions.ts).

Construire `ActiveStatus` en excluant `archived`, `Failure` en extrayant la variante `ok: false` de `Result<T>`, et `Present<T>` sans null ni undefined.
`compact<T>` enlève seulement null et undefined. Conserver notamment `0`, `false` et la chaîne vide. Son retour doit être `NonNullable<T>[]`.

```sh
npm test -- 09
```

**Validation :** [comportement](tests/09-utilitaires-unions.test.ts), [typage](tests/09-utilitaires-unions.types.ts).

## 10 — Dériver des types de fonctions

**Notions :** Parameters, ReturnType, Awaited, Promise, catch unknown.

**Fichier :** [src/10-utilitaires-fonctions.ts](src/10-utilitaires-fonctions.ts).

Dériver `SearchArgs`, `SearchReturn` et `SearchData` de la fonction `search`, avec Parameters, ReturnType et Awaited.
`attempt<T>` exécute une opération asynchrone et renvoie `{ ok: true, data }` ou `{ ok: false, error: Error }`. Préserver une Error reçue ; convertir les autres rejets avec `new Error(String(cause))`. Ne pas laisser une exception synchrone de l’opération sortir.

```sh
npm test -- 10
```

**Validation :** [comportement](tests/10-utilitaires-fonctions.test.ts), [typage](tests/10-utilitaires-fonctions.types.ts).

## 11 — Transformer des types

**Notions :** Mapped types, types conditionnels, infer, récursivité, modificateurs.

**Fichier :** [src/11-types-avances.ts](src/11-types-avances.ts).

Exercice de compilation uniquement. `ElementOf<T>` extrait le type d’un tableau readonly ou mutable, sinon retourne never.
`DeepReadonly<T>` rend récursivement readonly les objets, tableaux et tuples ; préserve les fonctions et les primitives. Garder la forme des tuples, et non les élargir en tableaux.
`Mutable<T>` enlève le modificateur readonly au premier niveau.

```sh
npm test -- 11
```

**Validation :** [typage](tests/11-types-avances.types.ts).

## 12 — Créer des noms sûrs

**Notions :** Template literal types, remappage de clés, Uppercase, Lowercase, Capitalize, Uncapitalize.

**Fichier :** [src/12-chaines-types.ts](src/12-chaines-types.ts).

Exercice de compilation uniquement. `BookId` est une chaîne commençant par `book:`. `ChangeEvents<T>` transforme les clés string en `${clé}Changed`, chaque propriété contenant une fonction `(value: T[K]) => void` ; ignorer les clés symbol et number.
`Variants<S>` contient quatre propriétés : upper, lower, capitalized et uncapitalized, calculées avec les quatre utilitaires intrinsèques de chaînes.

```sh
npm test -- 12
```

**Validation :** [typage](tests/12-chaines-types.types.ts).

## 13 — Conserver une inférence précise

**Notions :** as const, satisfies, typeof, NoInfer.

**Fichier :** [src/13-inference.ts](src/13-inference.ts).

Déclarer `statuses` comme le tuple readonly `['available', 'borrowed']` avec as const ; dériver `Status` de cette valeur.
Déclarer `labels` avec les valeurs `Disponible` et `Emprunté`, en conservant leurs types littéraux et en vérifiant toutes les clés avec satisfies Record<Status, string>.
Compléter `choose<C>` avec un paramètre de défaut `NoInfer<C>` : la valeur par défaut ne doit pas élargir les valeurs autorisées. Retourner le défaut s’il est fourni et inclus dans choices, sinon la première valeur. Lever Error('Aucun choix') si rien n’est disponible.

```sh
npm test -- 13
```

**Validation :** [comportement](tests/13-inference.test.ts), [typage](tests/13-inference.types.ts).

## 14 — Encapsuler un prêt

**Notions :** abstract, extends, implements, override, protected, readonly, #private, static, accesseurs.

**Fichier :** [src/14-classes.ts](src/14-classes.ts).

Compléter `Publication` (classe abstraite), `Loanable` (interface) et `LibraryBook`. `label()` retourne le titre nettoyé au constructeur suivi de ` (livre)`. `id` est public readonly ; `title` est protected.
Un nouveau livre est disponible. `borrow` le rend indisponible et retourne `Prêt de Dune`. Un second prêt lève Error('Déjà emprunté'). `returnBook` le rend à nouveau disponible. Le getter `available` n’a pas de setter. Utiliser un champ ECMAScript privé `#available`.
`LibraryBook.category` vaut `book`. Les classes sont utiles ici pour encapsuler un état ; ne pas en créer pour chaque simple objet de données.

```sh
npm test -- 14
```

**Validation :** [comportement](tests/14-classes.test.ts), [typage](tests/14-classes.types.ts).

## 15 — Réutiliser les signatures et typer this

**Notions :** ConstructorParameters, InstanceType, ThisParameterType, OmitThisParameter, ThisType.

**Fichier :** [src/15-constructeurs-this.ts](src/15-constructeurs-this.ts).

Dériver `ReaderArgs` et `ReaderInstance` de `Reader`, puis construire une instance avec `createReader(...args)`.
Dériver `LabelContext` et `BoundLabel` de `readerLabel`. `bindReader` utilise bind pour produire une fonction indépendante du contexte d’appel.
Compléter `CounterMethods` et `CounterDefinition` pour que ThisType fournisse le contexte `{ value: number } & CounterMethods`. `makeCounter` crée un compteur dont add incrémente la valeur et la retourne. L’objet retourné doit préserver les méthodes et leur contexte.

```sh
npm test -- 15
```

**Validation :** [comportement](tests/15-constructeurs-this.test.ts), [typage](tests/15-constructeurs-this.types.ts).

## 16 — Manipuler les objets standards typés

**Notions :** Map, Set, Date, RegExp, URL, URLSearchParams, Error, itérables.

**Fichier :** [src/16-api-standard.ts](src/16-api-standard.ts).

Ces classes appartiennent à JavaScript ou aux API Web ; TypeScript en fournit les déclarations de types.
`uniqueTags` nettoie les espaces, enlève les chaînes vides et déduplique en conservant l’ordre et la casse.
`groupByAuthor` regroupe les titres dans une Map sans modifier les livres.
`dueDate` accepte une chaîne ISO, ajoute un nombre entier de jours en UTC et renvoie une Date ; date invalide ou nombre de jours non entier => RangeError.
`isIsbn13` valide une forme de 13 chiffres consécutifs, sans espace ni saut de ligne (pas la clé de contrôle ISBN).
`searchUrl` construit une URL absolue depuis base et définit q avec URLSearchParams, en conservant les autres paramètres.

```sh
npm test -- 16
```

**Validation :** [comportement](tests/16-api-standard.test.ts), [typage](tests/16-api-standard.types.ts).

## 17 — Un client HTTP testable

**Notions :** Promise, injection de dépendances, unknown, erreurs HTTP, validation de données.

**Fichier :** [src/17-asynchrone.ts](src/17-asynchrone.ts).

Implémenter `loadTitles` avec le transport injecté. Appeler exactement `/books`. Si ok est false, lever Error('HTTP N') sans appeler json. Sinon attendre json, valider un tableau contenant uniquement des objets non nuls dont title est une chaîne, puis renvoyer leurs titres dans l’ordre. Accepter une chaîne vide. Toute forme incorrecte => Error('Réponse invalide').
Les erreurs du transport et du décodage JSON doivent être propagées telles quelles. Aucun vrai appel réseau dans les tests. Les types TypeScript ne valident pas une réponse HTTP à l’exécution.

```sh
npm test -- 17
```

**Validation :** [comportement](tests/17-asynchrone.test.ts), [typage](tests/17-asynchrone.types.ts).

## 18 — Concevoir une API d’événements typée

**Notions :** Génériques, keyof, mapped types, callbacks, Set, fermeture.

**Fichier :** [src/18-evenements.ts](src/18-evenements.ts).

Implémenter `EventBus<Events>`. `on` lie un nom d’événement à une fonction recevant le payload correspondant et renvoie une fonction de désinscription idempotente. `emit` appelle les fonctions enregistrées pour cet événement, une seule fois par fonction (Set), en ordre d’inscription. Un emit sans écouteur ne fait rien.
La désinscription pendant un emit ne modifie pas la liste d’appels déjà prévue pour cet emit : itérer sur une copie. Refuser les noms et payloads incorrects à la compilation.

```sh
npm test -- 18
```

**Validation :** [comportement](tests/18-evenements.test.ts), [typage](tests/18-evenements.types.ts).

## 19 — Empêcher le mélange d’identifiants

**Notions :** unique symbol, types marqués, fonctions d’assertion asserts.

**Fichier :** [src/19-identifiants.ts](src/19-identifiants.ts).

Définir `BookId` et `ReaderId` comme deux types string marqués avec les symboles fournis. Une chaîne ordinaire et un ReaderId ne doivent pas être acceptés à la place d’un BookId.
`assertBookId` vérifie la forme `/^book:[1-9]\d*$/`, sans espace ni saut de ligne, puis affine son argument avec asserts. Si invalide : Error('Identifiant invalide'). Attention : en JavaScript, `$` peut aussi correspondre à la position avant un saut de ligne final. `parseBookId` retourne la chaîne après cette validation, sans conversion de type forcée. `loanKey` concatène bookId, @ et readerId. Ces marques sont effacées à l’exécution.

```sh
npm test -- 19
```

**Validation :** [comportement](tests/19-identifiants.test.ts), [typage](tests/19-identifiants.types.ts).

## 20 — Typer les interactions DOM

**Notions :** DOM, querySelector générique, null, addEventListener, Pick, nettoyage.

**Fichier :** [src/20-dom.ts](src/20-dom.ts).

`findSearchInput` recherche `input[data-search]` dans le ParentNode reçu ; retourne HTMLInputElement ou null, sans assertion non nulle.
`bindSearch` reçoit des ports limités via Pick : l’input expose value ; le bouton expose addEventListener et removeEventListener. Au clic, transmettre la valeur actuelle nettoyée par trim. Renvoyer une fonction qui enlève exactement le même écouteur. Ne rien déclencher à l’inscription.
Le typage du sélecteur suppose ici que le sélecteur `input` cible un input HTML. Les tests utilisent EventTarget de Node pour rester sans navigateur ni dépendance DOM supplémentaire.

```sh
npm test -- 20
```

**Validation :** [comportement](tests/20-dom.test.ts), [typage](tests/20-dom.types.ts).

## 21 — Bonus : inspecter du TypeScript

**Notions :** API du compilateur : SourceFile, Node, SyntaxKind, createSourceFile, forEachChild, gardes is….

**Fichier :** [src/21-api-compilateur.ts](src/21-api-compilateur.ts).

Implémenter `inspectSource(source)` avec l’API du paquet typescript. Renvoyer dans l’ordre du parcours de l’arbre : `functions`, noms des déclarations de fonctions nommées ; `classes`, noms des déclarations de classes nommées ; `explicitAnyCount`, nombre de nœuds AnyKeyword.
Visiter les déclarations imbriquées, ignorer les fonctions fléchées et les classes anonymes pour les listes de noms. Un commentaire ou une chaîne contenant any ne compte pas. Ne pas utiliser de regex pour analyser le code. Il s’agit d’une inspection syntaxique, sans résolution des types ni diagnostics sémantiques.

```sh
npm test -- 21
```

**Validation :** [comportement](tests/21-api-compilateur.test.ts), [typage](tests/21-api-compilateur.types.ts).
