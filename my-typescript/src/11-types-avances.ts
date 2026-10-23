// Type conditionnel + infer : « si T est un tableau d'éléments E, donne E, sinon never ».
// readonly (infer E)[] accepte aussi les tableaux modifiables et les tuples.
export type ElementOf<T> = T extends readonly (infer E)[] ? E : never;
// Récursif : on applique DeepReadonly à chaque propriété. Les fonctions sont gardées telles quelles.
// Un mapped type sur un tableau ou un tuple garde sa forme : [string, number] devient
// readonly [string, number], et non un tableau quelconque.
export type DeepReadonly<T> = T extends (...args: never[]) => unknown ? T : T extends object ? {
    readonly [K in keyof T]: DeepReadonly<T[K]>;
} : T;
// -readonly : le « moins » ENLÈVE le modificateur, au premier niveau seulement.
export type Mutable<T> = {
    -readonly [K in keyof T]: T[K];
};
