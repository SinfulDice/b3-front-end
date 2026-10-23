// Template literal type : toutes les chaînes qui commencent par "book:".
export type BookId = `book:${string}`;
// Remappage de clés avec `as` : title devient titleChanged. Les clés non-string (0, symboles)
// donnent never, et une clé never disparaît.
export type ChangeEvents<T> = {
    [K in keyof T as K extends string ? `${K}Changed` : never]: (value: T[K]) => void;
};
// Les 4 utilitaires « intrinsèques » : calculés par le compilateur lui-même.
export type Variants<S extends string> = {
    upper: Uppercase<S>;
    lower: Lowercase<S>;
    capitalized: Capitalize<S>;
    uncapitalized: Uncapitalize<S>;
};
