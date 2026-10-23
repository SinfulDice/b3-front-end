export function first<T>(values: readonly T[]): T | undefined {
    return values[0];
}
export function pair<A, B>(left: A, right: B): readonly [
    A,
    B
] {
    return [left, right];
}
export function indexById<T extends {
    id: string;
}>(values: readonly T[]): Map<string, T> {
    return new Map(values.map(value => [value.id, value]));
}
