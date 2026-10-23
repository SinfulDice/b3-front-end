import { test } from 'node:test';
import assert from 'node:assert/strict';
import { updateBook } from '../src/08-utilitaires-objets.js';
test('08 — patch partiel et immutabilité', () => {
    const book = Object.freeze({ id: 'b1', title: 'Dune', pages: 412 });
    assert.deepEqual(updateBook(book, { title: 'Dune II' }), { id: 'b1', title: 'Dune II', pages: 412 });
    assert.notEqual(updateBook(book, {}), book);
    assert.equal(book.title, 'Dune');
});
