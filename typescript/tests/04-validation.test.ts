import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isBook, parseBook } from '../src/04-validation.js';
test('04 — garde : entrée valide et formes malveillantes ou incomplètes', () => {
    assert.equal(isBook({ id: 'b1', title: 'Dune', pages: 412, extra: true }), true);
    for (const value of [null, undefined, [], {}, 'Dune', { id: '', title: 'Dune', pages: 1 }, { id: 'b', title: ' ', pages: 1 }, { id: 'b', title: 'Dune', pages: '412' }, { id: 'b', title: 'Dune', pages: 0 }, { id: 'b', title: 'Dune', pages: 1.5 }, { id: 'b', title: 'Dune', pages: Infinity }]) {
        assert.equal(isBook(value), false);
    }
});
test('04 — parser JSON et erreur uniforme', () => {
    assert.deepEqual(parseBook('{"id":"b1","title":"Dune","pages":412}'), { id: 'b1', title: 'Dune', pages: 412 });
    for (const json of ['{', 'null', '[]', '{}'])
        assert.throws(() => parseBook(json), { message: 'Livre invalide' });
});
