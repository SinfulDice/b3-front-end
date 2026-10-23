export class Reader {
    constructor(public readonly name: string, public readonly quota = 3) { }
}
export type ReaderArgs = unknown;
export type ReaderInstance = unknown;
export function createReader(...args: ReaderArgs): ReaderInstance {
    // TODO : implémenter selon l’énoncé.
    throw new Error("À implémenter");
}
export function readerLabel(this: Reader, prefix: string): string { return `${prefix}${this.name}`; }
export type LabelContext = unknown;
export type BoundLabel = unknown;
export function bindReader(reader: LabelContext): BoundLabel {
    // TODO : implémenter selon l’énoncé.
    throw new Error("À implémenter");
}
export type CounterMethods = {
    add(amount: number): number;
};
export type CounterDefinition = unknown;
export function makeCounter(initial: number) {
    // TODO : implémenter selon l’énoncé.
    throw new Error("À implémenter");
}
