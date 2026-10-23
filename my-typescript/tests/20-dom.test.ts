import { test } from 'node:test';
import assert from 'node:assert/strict';
import { bindSearch, findSearchInput } from '../src/20-dom.js';
import type { ButtonPort } from '../src/20-dom.js';
test('20 — sélecteur d’input et absence de résultat', () => {
    const selectors: string[] = [];
    const element = { value: 'Dune' };
    const root = {
        querySelector(selector: string) { selectors.push(selector); return element; }
    } as unknown as ParentNode;
    assert.equal(findSearchInput(root), element);
    assert.deepEqual(selectors, ['input[data-search]']);
    const emptyRoot = { querySelector: () => null } as unknown as ParentNode;
    assert.equal(findSearchInput(emptyRoot), null);
});
test('20 — valeur actuelle et suppression de l’écouteur', () => {
    const target = new EventTarget();
    // Adaptateur de test seulement : EventTarget fournit les méthodes nécessaires à l’exécution.
    const button = target as unknown as ButtonPort;
    const input = { value: ' Dune ' };
    const calls: string[] = [];
    const cleanup = bindSearch(input, button, query => calls.push(query));
    assert.deepEqual(calls, []);
    target.dispatchEvent(new Event('click'));
    input.value = ' 1984 ';
    target.dispatchEvent(new Event('click'));
    cleanup();
    cleanup();
    target.dispatchEvent(new Event('click'));
    assert.deepEqual(calls, ['Dune', '1984']);
});
