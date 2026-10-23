import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inspectSource } from '../src/21-api-compilateur.js';
test('21 — parcours syntaxique incluant les déclarations imbriquées', () => {
    const report = inspectSource(`// any ne compte pas
const word = "any";
function outer(x: any) { function inner() {} class Nested {} }
class Book { method(value: any): void {} }
const arrow = () => 1;
export default class {}`);
    assert.deepEqual(report, { functions: ['outer', 'inner'], classes: ['Nested', 'Book'], explicitAnyCount: 2 });
    assert.deepEqual(inspectSource(''), { functions: [], classes: [], explicitAnyCount: 0 });
    assert.deepEqual(inspectSource('const value: unknown = 1;'), { functions: [], classes: [], explicitAnyCount: 0 });
});
