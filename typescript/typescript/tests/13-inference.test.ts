import { test } from 'node:test';
import assert from 'node:assert/strict';
import { choose, labels } from '../src/13-inference.js';
test('13 — choix, valeur par défaut et collection vide', () => {
    assert.equal(labels.available, 'Disponible');
    assert.equal(choose(['available', 'borrowed'], 'borrowed'), 'borrowed');
    assert.equal(choose(['available', 'borrowed']), 'available');
    assert.throws(() => choose([]), { message: 'Aucun choix' });
});
