import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatBook, firstTitle } from '../src/01-fondamentaux.js';
test('01 — valeurs par défaut, tuple et sous-titre', () => {
    assert.equal(formatBook(['Dune', 412]), 'Dune — 412 p. — disponible');
    assert.equal(formatBook(['Dune', 412], false, 'Tome 1'), 'Dune : Tome 1 — 412 p. — indisponible');
    assert.equal(formatBook(['Dune', 0], true, ''), 'Dune — 0 p. — disponible');
});
test('01 — tableau vide et entrée inchangée', () => {
    assert.equal(firstTitle([]), null);
    const titles = Object.freeze(['Dune', '1984']);
    assert.equal(firstTitle(titles), 'Dune');
    assert.deepEqual(titles, ['Dune', '1984']);
});
