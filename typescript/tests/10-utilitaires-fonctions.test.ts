import { test } from 'node:test';
import assert from 'node:assert/strict';
import { attempt } from '../src/10-utilitaires-fonctions.js';
test('10 — succès et erreurs de formes différentes', async () => {
    assert.deepEqual(await attempt(async () => 42), { ok: true, data: 42 });
    const error = new Error('Hors ligne');
    assert.deepEqual(await attempt(() => Promise.reject(error)), { ok: false, error });
    const failure = await attempt(() => Promise.reject('Oups'));
    assert.equal(failure.ok, false);
    if (!failure.ok)
        assert.equal(failure.error.message, 'Oups');
    const sync = await attempt(() => { throw error; });
    assert.deepEqual(sync, { ok: false, error });
});
