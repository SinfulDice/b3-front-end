import { test } from 'node:test';
import assert from 'node:assert/strict';
import { statusLabel, normalizeTitle } from '../src/03-unions.js';
import type { Status } from '../src/03-unions.js';
test('03 — trois statuts et nettoyage sans mutation', () => {
    const statuses: Status[] = ['available', 'borrowed', 'reserved'];
    assert.deepEqual(statuses.map(statusLabel), ['Disponible', 'Emprunté', 'Réservé']);
    assert.equal(normalizeTitle(' Dune '), 'Dune');
    assert.deepEqual(normalizeTitle(Object.freeze([' A ', 'B '])), ['A', 'B']);
    assert.deepEqual(normalizeTitle([]), []);
});
