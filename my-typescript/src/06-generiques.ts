// <T> : le type des éléments est « recopié » dans le retour. first([1, 2]) donne number | undefined.
export function first<T>(values: readonly T[]): T | undefined {
    return values[0];
}
export function pair<A, B>(left: A, right: B): readonly [
    A,
    B
] {
    // as const : le tableau est vu comme un tuple readonly [A, B], pas comme un (A | B)[].
    return [left, right] as const;
}
// extends { id: string } : n'importe quel objet, à condition qu'il ait un id de type string.
export function indexById<T extends {
    id: string;
}>(values: readonly T[]): Map<string, T> {
    const index = new Map<string, T>();
    // set remplace la valeur d'une clé déjà présente : en cas de doublon, le dernier gagne.
    for (const value of values)
        index.set(value.id, value);
    return index;
}
