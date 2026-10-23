import { test } from 'node:test';
import assert from 'node:assert/strict';
import { describe, withAvailability } from '../src/02-modelisation.js';
test('02 — description et copie', () => {
    const book = Object.freeze({ id: 'b1', title: 'Dune', author: { name: 'Frank Herbert' }, tags: [] });
    assert.equal(describe(book), 'Dune, par Frank Herbert');
    const copy = withAvailability(book, false);
    assert.equal(copy.available, false);
    assert.notEqual(copy, book);
    assert.equal('available' in book, false);
});
