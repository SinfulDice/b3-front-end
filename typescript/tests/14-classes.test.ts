import { test } from 'node:test';
import assert from 'node:assert/strict';
import { LibraryBook } from '../src/14-classes.js';
test('14 — constructeur, accesseur et cycle de prêt', () => {
    const book = new LibraryBook('b1', ' Dune ');
    assert.equal(LibraryBook.category, 'book');
    assert.equal(book.id, 'b1');
    assert.equal(book.label(), 'Dune (livre)');
    assert.equal(book.available, true);
    assert.equal(book.borrow(), 'Prêt de Dune');
    assert.equal(book.available, false);
    assert.throws(() => book.borrow(), { message: 'Déjà emprunté' });
    book.returnBook();
    assert.equal(book.available, true);
    assert.equal(book.borrow(), 'Prêt de Dune');
});
test('14 — état propre à chaque instance', () => {
    const a = new LibraryBook('a', 'A');
    const b = new LibraryBook('b', 'B');
    a.borrow();
    assert.equal(b.available, true);
});
