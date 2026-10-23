export type BookId = `book:${string}`;
export type ChangeEvents<T> = {
    [K in keyof T as K extends string ? `${K}Changed` : never]: (value: T[K]) => void;
};
export type Variants<S extends string> = {
    upper: Uppercase<S>;
    lower: Lowercase<S>;
    capitalized: Capitalize<S>;
    uncapitalized: Uncapitalize<S>;
};
