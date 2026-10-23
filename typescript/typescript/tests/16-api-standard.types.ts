import type { Equal, Expect, IsAny } from './type-helpers.js';
import { uniqueTags, groupByAuthor, dueDate, searchUrl } from '../src/16-api-standard.js';
type Tags = Expect<Equal<Parameters<typeof uniqueTags>, [
    tags: Iterable<string>
]>>;
type Group = Expect<Equal<ReturnType<typeof groupByAuthor>, Map<string, string[]>>>;
type DateResult = Expect<Equal<ReturnType<typeof dueDate>, Date>>;
type Url = Expect<Equal<ReturnType<typeof searchUrl>, URL>>;
// @ts-expect-error — durée numérique
dueDate('2024-01-01', '2');
