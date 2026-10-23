import { test } from 'node:test';
import assert from 'node:assert/strict';
import { uniqueTags, groupByAuthor, dueDate, isIsbn13, searchUrl } from '../src/16-api-standard.js';
test('16 — Set, Map et itérables', () => {
    assert.deepEqual(uniqueTags([' SF ', 'SF', '', 'sf', ' ']), ['SF', 'sf']);
    assert.deepEqual(uniqueTags(new Set(['A', 'B'])), ['A', 'B']);
    assert.deepEqual(groupByAuthor([{ title: 'A', author: 'Ada' }, { title: 'B', author: 'Lin' }, { title: 'C', author: 'Ada' }]), new Map([['Ada', ['A', 'C']], ['Lin', ['B']]]));
    assert.equal(groupByAuthor([]).size, 0);
});
test('16 — dates UTC et expressions régulières', () => {
    assert.equal(dueDate('2024-02-28T12:00:00Z', 2).toISOString(), '2024-03-01T12:00:00.000Z');
    assert.equal(dueDate('2024-01-01T00:00:00Z', -1).toISOString(), '2023-12-31T00:00:00.000Z');
    assert.throws(() => dueDate('invalide', 1), RangeError);
    assert.throws(() => dueDate('2024-01-01', 1.5), RangeError);
    assert.equal(isIsbn13('9782070360024'), true);
    for (const value of ['978-2070360024', '123', '9782070360024\n'])
        assert.equal(isIsbn13(value), false);
});
test('16 — URL encodée et paramètres préservés', () => {
    const url = searchUrl('https://example.test/books?lang=fr&q=ancien', 'Dune & été');
    assert.equal(url.searchParams.get('q'), 'Dune & été');
    assert.equal(url.searchParams.get('lang'), 'fr');
    assert.equal(url.searchParams.getAll('q').length, 1);
});
