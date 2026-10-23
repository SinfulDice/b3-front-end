import type { Equal, Expect, IsAny } from './type-helpers.js';
import { updateBook } from '../src/08-utilitaires-objets.js';
import type { Book, BookPreview, BookDraft, BookPatch, CompleteBook, FrozenBook, Catalog } from '../src/08-utilitaires-objets.js';
type Preview = Expect<Equal<BookPreview, Pick<Book, 'id' | 'title'>>>;
type Draft = Expect<Equal<BookDraft, Omit<Book, 'id'>>>;
type Patch = Expect<Equal<BookPatch, Partial<Omit<Book, 'id'>>>>;
type Complete = Expect<Equal<CompleteBook, Required<Book>>>;
type Frozen = Expect<Equal<FrozenBook, Readonly<Book>>>;
type Index = Expect<Equal<Catalog, Record<string, Book>>>;
declare const book: Book;
declare const frozen: FrozenBook;
// @ts-expect-error — id interdit dans le patch
updateBook(book, { id: 'b2' });
// @ts-expect-error — titre readonly
frozen.title = 'Autre';
// @ts-expect-error — toutes les propriétés requises
const incomplete: CompleteBook = { id: 'b', title: 'Dune', pages: 412 };
