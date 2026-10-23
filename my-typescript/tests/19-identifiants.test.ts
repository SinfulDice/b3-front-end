import { test } from 'node:test';
import assert from 'node:assert/strict';
import { assertBookId, parseBookId, loanKey } from '../src/19-identifiants.js';
import type { ReaderId } from '../src/19-identifiants.js';
test('19 — identifiant validé avant création de la marque', () => {
    assert.equal(parseBookId('book:12'), 'book:12');
    assert.doesNotThrow(() => assertBookId('book:1'));
    for (const id of ['', 'reader:1', 'book:0', 'book:-1', 'book:1.5', 'book:01', 'book:1\n'])
        assert.throws(() => parseBookId(id), { message: 'Identifiant invalide' });
    assert.equal(loanKey(parseBookId('book:1'), 'reader:2' as ReaderId), 'book:1@reader:2');
});
