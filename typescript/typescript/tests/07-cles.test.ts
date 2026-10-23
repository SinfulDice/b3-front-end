import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getProperty, pluck } from '../src/07-cles.js';
test('07 — propriétés et collections', () => {
    const book = Object.freeze({ title: 'Dune', pages: 412 });
    assert.equal(getProperty(book, 'pages'), 412);
    assert.deepEqual(pluck([book, { title: '1984', pages: 328 }], 'title'), ['Dune', '1984']);
    assert.deepEqual(pluck<{
        title: string;
    }, 'title'>([], 'title'), []);
});
