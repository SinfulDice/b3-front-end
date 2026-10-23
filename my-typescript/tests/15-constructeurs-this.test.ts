import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Reader, createReader, bindReader, makeCounter } from '../src/15-constructeurs-this.js';
test('15 — constructeur dérivé et fonction liée', () => {
    const reader = createReader('Ada');
    assert.ok(reader instanceof Reader);
    assert.equal(reader.quota, 3);
    assert.equal(createReader('Lin', 5).quota, 5);
    const label = bindReader(reader);
    assert.equal(label('Lecteur : '), 'Lecteur : Ada');
});
test('15 — contexte this des méthodes', () => {
    const counter = makeCounter(2);
    assert.equal(counter.add(3), 5);
    assert.equal(counter.add(-1), 4);
    assert.equal(counter.value, 4);
    assert.equal(makeCounter(0).value, 0);
});
