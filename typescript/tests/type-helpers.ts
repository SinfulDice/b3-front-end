// Equal distingue notamment any, unknown, unions et types readonly.
export type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? (<T>() => T extends B ? 1 : 2) extends (<T>() => T extends A ? 1 : 2) ? true : false : false;
export type Expect<T extends true> = T;
export type IsAny<T> = 0 extends (1 & T) ? true : false;
