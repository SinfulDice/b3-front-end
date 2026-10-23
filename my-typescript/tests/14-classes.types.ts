import type { Equal, Expect, IsAny } from './type-helpers.js';
import { Publication, LibraryBook } from '../src/14-classes.js';
import type { Loanable } from '../src/14-classes.js';
declare const book: LibraryBook;
const contract: Loanable = book;
// @ts-expect-error — classe abstraite
new Publication('b', 'Dune');
// @ts-expect-error — protected
book.title;
// @ts-expect-error — readonly
book.id = 'autre';
// @ts-expect-error — getter sans setter
book.available = false;
// @ts-expect-error — champ privé ECMAScript
book.#available;
type Label = Expect<Equal<ReturnType<LibraryBook['label']>, string>>;
