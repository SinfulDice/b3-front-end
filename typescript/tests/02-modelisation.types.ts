import type { Equal, Expect, IsAny } from './type-helpers.js';
import type { Author, Book, Borrowable } from '../src/02-modelisation.js';
type AuthorShape = Expect<Equal<Author, {
    name: string;
    birthYear?: number;
}>>;
type Safe = Expect<Equal<IsAny<Book>, false>>;
declare const book: Book;
// @ts-expect-error — identifiant immuable
book.id = 'b2';
// @ts-expect-error — collection readonly
book.tags.push('SF');
// @ts-expect-error — exactOptionalPropertyTypes interdit undefined explicite
const badAuthor: Author = { name: 'A', birthYear: undefined };
// @ts-expect-error — auteur obligatoire
const incomplete: Book = { id: 'b1', title: 'Dune', tags: [] };
declare const loan: Borrowable;
type Available = Expect<Equal<typeof loan.available, boolean>>;
