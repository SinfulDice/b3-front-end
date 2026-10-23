import { test } from 'node:test';
import assert from 'node:assert/strict';
import { assertNever, renderState } from '../src/05-exhaustivite.js';
test('05 — les quatre états, dont une réussite vide', () => {
    assert.equal(renderState({ status: 'idle' }), 'Prêt');
    assert.equal(renderState({ status: 'loading' }), 'Chargement…');
    assert.equal(renderState({ status: 'success', data: ['Dune', '1984'] }), '2 livre(s)');
    assert.equal(renderState({ status: 'success', data: [] }), '0 livre(s)');
    assert.equal(renderState({ status: 'error', error: new Error('Hors ligne') }), 'Hors ligne');
});
test('05 — garde d’exhaustivité à l’exécution', () => {
    // Simule un état provenant d’un appelant JavaScript sans vérification de types.
    assert.throws(() => assertNever('unexpected' as never), Error);
});
