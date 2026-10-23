export interface Book {
    readonly id: string;
    title: string;
    pages: number;
    description?: string;
}
// Pick : garder seulement certaines propriétés.
export type BookPreview = Pick<Book, 'id' | 'title'>;
// Omit : tout sauf certaines propriétés. Un brouillon n'a pas encore d'id (c'est le serveur qui le donne).
export type BookDraft = Omit<Book, 'id'>;
// Partial rend tout optionnel : un patch ne contient que ce qui change, et jamais l'id.
export type BookPatch = Partial<Omit<Book, 'id'>>;
// Required enlève les « ? » : description devient obligatoire.
export type CompleteBook = Required<Book>;
// Readonly ne vérifie qu'à la compilation et au premier niveau : ce n'est PAS un Object.freeze.
export type FrozenBook = Readonly<Book>;
// Record<K, V> : un objet dont chaque clé de type K a une valeur de type V.
export type Catalog = Record<string, Book>;
export function updateBook(book: Book, patch: BookPatch): Book {
    // Nouvel objet ; l'id est remis en dernier pour être sûr qu'il ne change jamais.
    return { ...book, ...patch, id: book.id };
}
