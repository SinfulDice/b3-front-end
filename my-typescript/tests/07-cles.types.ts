import type { Equal, Expect, IsAny } from './type-helpers.js';
import { getProperty, pluck } from '../src/07-cles.js';
const title = getProperty({ title: 'Dune', pages: 412 }, 'title');
const pages = pluck([{ title: 'Dune', pages: 412 }], 'pages');
type Title = Expect<Equal<typeof title, string>>;
type Pages = Expect<Equal<typeof pages, number[]>>;
// @ts-expect-error — clé absente
getProperty({ title: 'Dune' }, 'price');
// @ts-expect-error — clé absente
pluck([{ title: 'Dune' }], 'price');
