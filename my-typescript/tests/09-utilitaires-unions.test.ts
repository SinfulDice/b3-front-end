import { test } from 'node:test';
import assert from 'node:assert/strict';
import { compact } from '../src/09-utilitaires-unions.js';
test('09 — ne pas supprimer les valeurs falsy valides', () => {
    assert.deepEqual(compact([0, false, '', null, undefined, 'Dune']), [0, false, '', 'Dune']);
    assert.deepEqual(compact([]), []);
});
