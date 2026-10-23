export type Status = 'available' | 'borrowed' | 'archived';
export type Result<T> = {
    ok: true;
    data: T;
} | {
    ok: false;
    error: Error;
};
export type ActiveStatus = Exclude<Status, 'archived'>;
export type Failure<T> = Extract<Result<T>, {
    ok: false;
}>;
export type Present<T> = NonNullable<T>;
export function compact<T>(values: readonly T[]): NonNullable<T>[] {
    return values.filter((value): value is NonNullable<T> => value !== null && value !== undefined);
}
