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

- Lancez la commande  `npx playwright codegen` pour ouvrir le navigateur et générer les tests.
- Entrez l'url de votre site `localhost:5173` puis naviguer jusqu'à créer un item sur votre application.
- Copier coller le code de test qui a été généré dans un fichier de tests `createProduct.spec.js`
- Lancez les tests

