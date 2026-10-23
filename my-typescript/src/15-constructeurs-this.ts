export class Reader {
    constructor(public readonly name: string, public readonly quota = 3) { }
}
// Déduits de la classe : les paramètres du constructeur, et le type d'un objet créé avec new.
export type ReaderArgs = ConstructorParameters<typeof Reader>; // [name: string, quota?: number]
export type ReaderInstance = InstanceType<typeof Reader>; // Reader
export function createReader(...args: ReaderArgs): ReaderInstance {
    return new Reader(...args);
}
// « this: Reader » n'est pas un vrai paramètre : il dit sur quel objet la fonction doit être appelée.
export function readerLabel(this: Reader, prefix: string): string { return `${prefix}${this.name}`; }
export type LabelContext = ThisParameterType<typeof readerLabel>; // Reader
export type BoundLabel = OmitThisParameter<typeof readerLabel>; // (prefix: string) => string
export function bindReader(reader: LabelContext): BoundLabel {
    // bind fixe this une fois pour toutes : la fonction obtenue marche quelle que soit la façon de l'appeler.
    return readerLabel.bind(reader);
}
export type CounterMethods = {
    add(amount: number): number;
};
// ThisType<X> ne crée aucune propriété : il dit seulement « dans ces méthodes, this est de type X ».
export type CounterDefinition = CounterMethods & ThisType<{
    value: number;
} & CounterMethods>;
export function makeCounter(initial: number): {
    value: number;
} & CounterMethods {
    // Grâce à ThisType, TypeScript accepte this.value ici alors que methods n'a pas de value.
    const methods: CounterDefinition = {
        add(amount) {
            this.value += amount;
            return this.value;
        },
    };
    // Les méthodes sont copiées dans le compteur : counter.add(3) est appelé avec this = counter.
    return { value: initial, ...methods };
}
