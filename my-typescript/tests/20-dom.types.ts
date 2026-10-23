import type { Equal, Expect, IsAny } from './type-helpers.js';
import { findSearchInput, bindSearch } from '../src/20-dom.js';
import type { InputPort, ButtonPort } from '../src/20-dom.js';
type Input = Expect<Equal<InputPort, Pick<HTMLInputElement, 'value'>>>;
type Button = Expect<Equal<ButtonPort, Pick<HTMLButtonElement, 'addEventListener' | 'removeEventListener'>>>;
type Nullable = Expect<Equal<ReturnType<typeof findSearchInput>, HTMLInputElement | null>>;
declare const root: ParentNode;
const input = findSearchInput(root);
// @ts-expect-error — gérer le null avant d’accéder au champ
input.value;
// @ts-expect-error — callback textuel
bindSearch({ value: 'Dune' }, document.createElement('button'), (query: number) => { });
