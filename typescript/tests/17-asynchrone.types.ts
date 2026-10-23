import type { Equal, Expect, IsAny } from './type-helpers.js';
import { loadTitles } from '../src/17-asynchrone.js';
import type { HttpResponse } from '../src/17-asynchrone.js';
type Json = Expect<Equal<ReturnType<HttpResponse['json']>, Promise<unknown>>>;
type Titles = Expect<Equal<ReturnType<typeof loadTitles>, Promise<string[]>>>;
// @ts-expect-error — transport asynchrone requis
loadTitles(() => ({ ok: true, status: 200, json: async () => [] }));
