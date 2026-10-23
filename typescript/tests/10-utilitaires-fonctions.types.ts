import type { Equal, Expect, IsAny } from './type-helpers.js';
import { search, attempt } from '../src/10-utilitaires-fonctions.js';
import type { SearchArgs, SearchReturn, SearchData, Result } from '../src/10-utilitaires-fonctions.js';
type Args = Expect<Equal<SearchArgs, Parameters<typeof search>>>;
type Return = Expect<Equal<SearchReturn, ReturnType<typeof search>>>;
type Data = Expect<Equal<SearchData, {
    query: string;
    limit: number;
    titles: string[];
}>>;
const result = attempt(async () => 42);
type Attempt = Expect<Equal<typeof result, Promise<Result<number>>>>;
// @ts-expect-error — recherche textuelle
const bad: SearchArgs = [12];
