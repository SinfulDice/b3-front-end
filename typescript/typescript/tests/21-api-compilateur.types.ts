import type { Equal, Expect, IsAny } from './type-helpers.js';
import { inspectSource } from '../src/21-api-compilateur.js';
import type { SourceReport } from '../src/21-api-compilateur.js';
type Report = Expect<Equal<ReturnType<typeof inspectSource>, SourceReport>>;
// @ts-expect-error — le code source doit être une chaîne
inspectSource(123);
