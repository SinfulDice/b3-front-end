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
        return this.#available;
    }
    override label(): string {
        return `${this.title} (livre)`;
    }
    borrow(): string {
        if (!this.#available)
            throw new Error('Déjà emprunté');
        this.#available = false;
        return `Prêt de ${this.title}`;
    }
    returnBook(): void {
        this.#available = true;
    }
}
