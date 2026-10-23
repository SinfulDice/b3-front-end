import type { Equal, Expect, IsAny } from './type-helpers.js';
import { first, pair, indexById } from '../src/06-generiques.js';
const a = first([1, 2]);
const b = pair<string, number>('a', 1);
const c = indexById([{ id: 'b', pages: 42 }]);
type First = Expect<Equal<typeof a, number | undefined>>;
type Pair = Expect<Equal<typeof b, readonly [
    string,
    number
]>>;
type Indexed = Expect<Equal<typeof c, Map<string, {
    id: string;
    pages: number;
}>>>;
// @ts-expect-error — contrainte sur id
indexById([{ title: 'Dune' }]);
// @ts-expect-error — tuple readonly
b[0] = 'x';
