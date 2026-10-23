export type ElementOf<T> = T extends readonly (infer Item)[] ? Item : never;
export type DeepReadonly<T> = T extends (...args: never[]) => unknown ? T : T extends object ? {
    readonly [K in keyof T]: DeepReadonly<T[K]>;
} : T;
export type Mutable<T> = {
    -readonly [K in keyof T]: T[K];
};
