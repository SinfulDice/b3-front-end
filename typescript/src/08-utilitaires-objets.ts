export interface Book {
    readonly id: string;
    title: string;
    pages: number;
    description?: string;
}
export type BookPreview = unknown;
export type BookDraft = unknown;
export type BookPatch = unknown;
export type CompleteBook = unknown;
export type FrozenBook = unknown;
export type Catalog = unknown;
export function updateBook(book: Book, patch: BookPatch): Book {
    // TODO : implémenter selon l’énoncé.
    throw new Error("À implémenter");
}
