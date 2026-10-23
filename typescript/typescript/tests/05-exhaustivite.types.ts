import type { Equal, Expect, IsAny } from './type-helpers.js';
import { assertNever } from '../src/05-exhaustivite.js';
import type { LoadState } from '../src/05-exhaustivite.js';
type Success = Expect<Equal<Extract<LoadState<number>, {
    status: 'success';
}>, {
    status: 'success';
    data: number;
}>>;
type NeverArg = Expect<Equal<Parameters<typeof assertNever>, [
    value: never
]>>;
// @ts-expect-error — succès incomplet
const incomplete: LoadState<string[]> = { status: 'success' };
// @ts-expect-error — erreur métier attendue
const bad: LoadState<string[]> = { status: 'error', error: 'Oups' };
