export class Reader {
    constructor(public readonly name: string, public readonly quota = 3) { }
}
export type ReaderArgs = ConstructorParameters<typeof Reader>;
export type ReaderInstance = InstanceType<typeof Reader>;
export function createReader(...args: ReaderArgs): ReaderInstance {
    return new Reader(...args);
}
export function readerLabel(this: Reader, prefix: string): string { return `${prefix}${this.name}`; }
export type LabelContext = ThisParameterType<typeof readerLabel>;
export type BoundLabel = OmitThisParameter<typeof readerLabel>;
export function bindReader(reader: LabelContext): BoundLabel {
    return readerLabel.bind(reader);
}
export type CounterMethods = {
    add(amount: number): number;
};
export type CounterDefinition = CounterMethods & ThisType<{
    value: number;
} & CounterMethods>;
export function makeCounter(initial: number) {
    const methods: CounterDefinition = {
        add(amount) { this.value += amount; return this.value; }
    };
    return { value: initial, ...methods };
}
