import { test } from 'node:test';
import assert from 'node:assert/strict';
import { first, pair, indexById } from '../src/06-generiques.js';
test('06 — collection vide, tuple et index avec doublons', () => {
    assert.equal(first([]), undefined);
    assert.equal(first(Object.freeze([3, 4])), 3);
    assert.deepEqual(pair('b1', 42), ['b1', 42]);
    const rows = Object.freeze([{ id: 'b1', pages: 1 }, { id: 'b1', pages: 2 }]);
    assert.equal(indexById(rows).get('b1')?.pages, 2);
    assert.equal(indexById([]).size, 0);
});
