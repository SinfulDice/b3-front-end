// Une interface décrit un CONTRAT (ce qu'on peut faire), sans aucun code.
export interface Loanable {
    readonly available: boolean;
    borrow(): string;
    returnBook(): void;
}
// abstract : on ne peut pas faire `new Publication(...)`, seulement en hériter.
// « public readonly id » dans le constructeur déclare ET remplit la propriété en une fois.
export abstract class Publication {
    constructor(public readonly id: string, protected title: string) { this.title = title.trim(); }
    // Chaque sous-classe DOIT écrire sa propre version de label().
    abstract label(): string;
}
// extends : hérite de Publication ; implements : promet de respecter le contrat Loanable.
export class LibraryBook extends Publication implements Loanable {
    // static : appartient à la classe (LibraryBook.category), pas à chaque livre.
    static readonly category = 'book';
    // #available : vraiment privé, même en JavaScript à l'exécution (pas seulement pour TypeScript).
    #available = true;
    // Un getter sans setter : on peut lire book.available, pas l'écrire.
    get available(): boolean {
        return this.#available;
    }
    // override : on signale qu'on remplace une méthode du parent (vérifié par noImplicitOverride).
    override label(): string {
        // title est protected : accessible ici, dans une sous-classe, mais pas de l'extérieur.
        return `${this.title} (livre)`;
    }
    borrow(): string {
        if (!this.#available)
            throw new Error("Déjà emprunté");
        this.#available = false;
        return `Prêt de ${this.title}`;
    }
    returnBook(): void {
        this.#available = true;
    }
}
