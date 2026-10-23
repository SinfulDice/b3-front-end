import type { Equal, Expect, IsAny } from './type-helpers.js';
import { compact } from '../src/09-utilitaires-unions.js';
import type { ActiveStatus, Failure, Present } from '../src/09-utilitaires-unions.js';
type Active = Expect<Equal<ActiveStatus, 'available' | 'borrowed'>>;
type Fail = Expect<Equal<Failure<string>, {
    ok: false;
    error: Error;
}>>;
type Value = Expect<Equal<Present<string | null | undefined>, string>>;
const titles = compact(['Dune', null, undefined]);
type Titles = Expect<Equal<typeof titles, string[]>>;
