export type Author = {
    name: string;
    birthYear?: number;
};
export type Book = {
    readonly id: string;
    title: string;
    author: Author;
    tags: readonly string[];
    publishedAt?: Date;
};
// Intersection (&) : un Borrowable a TOUTES les propriétés de Book ET la propriété available.
export type Borrowable = Book & {
    available: boolean;
};
export function describe(book: Book): string {
    return `${book.title}, par ${book.author.name}`;
}
export function withAvailability(book: Book, available: boolean): Borrowable {
    // Le spread crée un nouvel objet : le livre reçu n'est jamais modifié.
    return { ...book, available };
}
