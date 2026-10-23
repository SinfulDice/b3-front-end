import type { Equal, Expect, IsAny } from './type-helpers.js';
import { assertBookId, parseBookId, loanKey } from '../src/19-identifiants.js';
import type { BookId, ReaderId } from '../src/19-identifiants.js';
type NotAny = Expect<Equal<IsAny<BookId>, false>>;
type NotString = Expect<Equal<string extends BookId ? true : false, false>>;
declare const bookId: BookId;
declare const readerId: ReaderId;
loanKey(bookId, readerId);
// @ts-expect-error — chaîne non validée
loanKey('book:1', readerId);
// @ts-expect-error — marques incompatibles
loanKey(readerId, bookId);
let value: string = 'book:1';
assertBookId(value);
const narrowed: BookId = value;
type Parsed = Expect<Equal<ReturnType<typeof parseBookId>, BookId>>;
