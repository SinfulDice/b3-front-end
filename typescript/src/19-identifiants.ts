declare const bookBrand: unique symbol;
declare const readerBrand: unique symbol;
export type BookId = unknown;
export type ReaderId = unknown;
export function assertBookId(value: string): void {
    // TODO : implémenter selon l’énoncé.
    throw new Error("À implémenter");
}
export function parseBookId(value: string): BookId {
    // TODO : implémenter selon l’énoncé.
    throw new Error("À implémenter");
}
export function loanKey(bookId: BookId, readerId: ReaderId): string {
    // TODO : implémenter selon l’énoncé.
    throw new Error("À implémenter");
}
