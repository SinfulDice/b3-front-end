import type { Equal, Expect, IsAny } from './type-helpers.js';
import type { BookId, ChangeEvents, Variants } from '../src/12-chaines-types.js';
type Id = Expect<Equal<BookId, `book:${string}`>>;
type Events = Expect<Equal<ChangeEvents<{
    title: string;
    pages: number;
    0: boolean;
}>, {
    titleChanged: (value: string) => void;
    pagesChanged: (value: number) => void;
}>>;
type Cases = Expect<Equal<Variants<'dUne'>, {
    upper: 'DUNE';
    lower: 'dune';
    capitalized: 'DUne';
    uncapitalized: 'dUne';
}>>;
// @ts-expect-error — mauvais préfixe
const badId: BookId = 'author:1';
