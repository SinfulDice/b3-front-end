import type { Equal, Expect, IsAny } from './type-helpers.js';
import { isBook, parseBook } from '../src/04-validation.js';
import type { BookSummary } from '../src/04-validation.js';
declare const external: unknown;
if (isBook(external)) {
    type Narrowed = Expect<Equal<typeof external, BookSummary>>;
    const pages: number = external.pages;
}
type Parsed = Expect<Equal<ReturnType<typeof parseBook>, BookSummary>>;
// @ts-expect-error — accès avant validation
external.title;
