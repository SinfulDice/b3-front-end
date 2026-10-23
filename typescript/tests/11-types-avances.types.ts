import type { Equal, Expect, IsAny } from './type-helpers.js';
import type { ElementOf, DeepReadonly, Mutable } from '../src/11-types-avances.js';
type Element = Expect<Equal<ElementOf<readonly string[]>, string>>;
type Tuple = Expect<Equal<ElementOf<readonly [
    1,
    'a'
]>, 1 | 'a'>>;
type NotArray = Expect<Equal<ElementOf<number>, never>>;
type Model = {
    title: string;
    author: {
        name: string;
    };
    tags: string[];
    pair: [
        string,
        number
    ];
    format: (x: number) => string;
};
type Expected = {
    readonly title: string;
    readonly author: {
        readonly name: string;
    };
    readonly tags: readonly string[];
    readonly pair: readonly [
        string,
        number
    ];
    readonly format: (x: number) => string;
};
type Deep = Expect<Equal<DeepReadonly<Model>, Expected>>;
type Primitive = Expect<Equal<DeepReadonly<string | null>, string | null>>;
type Unfrozen = Expect<Equal<Mutable<{
    readonly id: string;
}>, {
    id: string;
}>>;
declare const book: DeepReadonly<Model>;
// @ts-expect-error — objet imbriqué readonly
book.author.name = 'Autre';
// @ts-expect-error — tableau imbriqué readonly
book.tags.push('SF');
