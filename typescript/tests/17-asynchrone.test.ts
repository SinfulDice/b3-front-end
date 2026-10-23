import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadTitles } from '../src/17-asynchrone.js';
test('17 — transport injecté et liste vide', async () => {
    const calls: string[] = [];
    assert.deepEqual(await loadTitles(async (url) => { calls.push(url); return { ok: true, status: 200, json: async () => [{ title: 'Dune' }, { title: '' }] }; }), ['Dune', '']);
    assert.deepEqual(calls, ['/books']);
    assert.deepEqual(await loadTitles(async () => ({ ok: true, status: 200, json: async () => [] })), []);
});
test('17 — HTTP, réseau, JSON et formes invalides', async () => {
    let decoded = false;
    await assert.rejects(loadTitles(async () => ({ ok: false, status: 503, json: async () => { decoded = true; return []; } })), { message: 'HTTP 503' });
    assert.equal(decoded, false);
    const network = new Error('Réseau');
    await assert.rejects(loadTitles(async () => { throw network; }), error => error === network);
    const syntax = new SyntaxError('JSON');
    await assert.rejects(loadTitles(async () => ({ ok: true, status: 200, json: async () => { throw syntax; } })), error => error === syntax);
    for (const value of [null, {}, [null], [{ title: 42 }], [{}], [['titre']]]) {
        await assert.rejects(loadTitles(async () => ({ ok: true, status: 200, json: async () => value })), { message: 'Réponse invalide' });
    }
});
