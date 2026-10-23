export interface Book {
    readonly id: string;
    title: string;
    pages: number;
    description?: string;
}
export type BookPreview = Pick<Book, 'id' | 'title'>;
export type BookDraft = Omit<Book, 'id'>;
export type BookPatch = Partial<BookDraft>;
export type CompleteBook = Required<Book>;
export type FrozenBook = Readonly<Book>;
export type Catalog = Record<string, Book>;
export function updateBook(book: Book, patch: BookPatch): Book {
    return { ...book, ...patch, id: book.id };
}
