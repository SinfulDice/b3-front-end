export type Status = 'available' | 'borrowed' | 'archived';
export type Result<T> = {
    ok: true;
    data: T;
} | {
    ok: false;
    error: Error;
};
export type ActiveStatus = unknown;
export type Failure<T> = unknown;
export type Present<T> = unknown;
export function compact<T>(values: readonly T[]): NonNullable<T>[] {
    // TODO : implémenter selon l’énoncé.
    throw new Error("À implémenter");
}
