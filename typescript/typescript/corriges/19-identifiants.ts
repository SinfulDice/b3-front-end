declare const bookBrand: unique symbol;
declare const readerBrand: unique symbol;
export type BookId = string & {
    readonly [bookBrand]: true;
};
export type ReaderId = string & {
    readonly [readerBrand]: true;
};
export function assertBookId(value: string): asserts value is BookId {
    // En JavaScript, $ accepte aussi la position avant un saut de ligne final.
    if (value.trim() !== value || !/^book:[1-9]\d*$/.test(value))
        throw new Error('Identifiant invalide');
}
export function parseBookId(value: string): BookId {
    assertBookId(value);
    return value;
}
export function loanKey(bookId: BookId, readerId: ReaderId): string {
    return `${bookId}@${readerId}`;
}
