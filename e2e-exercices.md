# Tests e2e avec Playwright

[Doc](https://playwright.dev/docs/intro)

## Installer Playwright

```
npm init playwright@latest
```
Lancez les paramètres par défaut.

## Exercices

1. Lancer les premiers tests

Faites la commande `npx playwright test --ui` pour ouvrir l'interface des tests.
Ensuite lancer les tests de example.spec.js.

2. Créer ses propres tests

- Lancez la commande  `npx playwright codegen` pour ouvrir le navigateur et générer les tests ;
- Entrez l'url de votre site `localhost:5173` puis naviguer jusqu'à créer un item sur votre application ;
- Copier coller le code de test qui a été généré dans un fichier de tests `createProduct.spec.js` ;
- Lancez les tests, il doivent passer ;
- Pour améliorer le test, faites plusieurs cas : un cas où la soumission se passe bien et un autre ou les champs sont mal rempli. Dans le second cas, il faut vérifier que les erreurs des formulaires apparaissent bien ;
- Sur les éléments du formulaire, rajoutez la props data-testId pour qu'ils soient mieux ciblé dans les tests et que les tests ne dépendent pas des labels qui sont associés au formulaire. Il faut donc remplacer les sélecteurs d'élements dans les tests e2e.
