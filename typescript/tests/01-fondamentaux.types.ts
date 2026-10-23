import type { Equal, Expect, IsAny } from './type-helpers.js';
import { formatBook, firstTitle } from '../src/01-fondamentaux.js';
import type { BookLine } from '../src/01-fondamentaux.js';
type Tuple = Expect<Equal<BookLine, readonly [
    title: string,
    pages: number
]>>;
type First = Expect<Equal<ReturnType<typeof firstTitle>, string | null>>;
// @ts-expect-error — pages doit être un nombre
formatBook(['Dune', '412']);
// @ts-expect-error — tableau readonly
const invalid: BookLine = ['Dune', 12, 3];
