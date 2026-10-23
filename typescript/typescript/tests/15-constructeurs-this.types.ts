import type { Equal, Expect, IsAny } from './type-helpers.js';
import { Reader, readerLabel, createReader, bindReader } from '../src/15-constructeurs-this.js';
import type { ReaderArgs, ReaderInstance, LabelContext, BoundLabel, CounterDefinition } from '../src/15-constructeurs-this.js';
type Args = Expect<Equal<ReaderArgs, ConstructorParameters<typeof Reader>>>;
type Instance = Expect<Equal<ReaderInstance, Reader>>;
type Context = Expect<Equal<LabelContext, Reader>>;
type Bound = Expect<Equal<BoundLabel, (prefix: string) => string>>;
const methods: CounterDefinition = { add(amount) { this.value += amount; return this.value; } };
// @ts-expect-error — le this explicite est obligatoire
readerLabel('Bonjour ');
// @ts-expect-error — quota numérique
createReader('Ada', '3');
// @ts-expect-error — argument obligatoire
bindReader(new Reader('Ada'))();
