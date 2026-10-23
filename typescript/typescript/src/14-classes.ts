export interface Loanable {
    readonly available: boolean;
    borrow(): string;
    returnBook(): void;
}
export abstract class Publication {
    constructor(public readonly id: string, protected title: string) { this.title = title.trim(); }
    abstract label(): string;
}
export class LibraryBook extends Publication implements Loanable {
    static readonly category = 'book';
    #available = true;
    get available(): boolean {
        // TODO : implémenter selon l’énoncé.
        throw new Error("À implémenter");
    }
    override label(): string {
        // TODO : implémenter selon l’énoncé.
        throw new Error("À implémenter");
    }
    borrow(): string {
        // TODO : implémenter selon l’énoncé.
        throw new Error("À implémenter");
    }
    returnBook(): void {
        // TODO : implémenter selon l’énoncé.
        throw new Error("À implémenter");
    }
}
