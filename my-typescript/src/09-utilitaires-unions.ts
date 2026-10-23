export type Status = 'available' | 'borrowed' | 'archived';
export type Result<T> = {
    ok: true;
    data: T;
} | {
    ok: false;
    error: Error;
};
// Exclude retire des membres d'une union ; Extract garde ceux qui correspondent à un modèle.
export type ActiveStatus = Exclude<Status, 'archived'>;
export type Failure<T> = Extract<Result<T>, {
    ok: false;
}>;
// NonNullable<T> = T sans null ni undefined.
export type Present<T> = NonNullable<T>;
export function compact<T>(values: readonly T[]): NonNullable<T>[] {
    // Le prédicat « value is NonNullable<T> » dit à TypeScript ce que filter a gardé.
    // On compare à null/undefined exactement : 0, false et "" sont des valeurs à garder.
    return values.filter((value): value is NonNullable<T> => value !== null && value !== undefined);
}
