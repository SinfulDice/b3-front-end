declare const bookBrand: unique symbol;
declare const readerBrand: unique symbol;
// Type « marqué » (branded) : une string, PLUS une propriété invisible que seul ce type possède.
// Une chaîne quelconque n'a pas cette marque, donc elle n'est pas un BookId. La marque n'existe
// qu'à la compilation : à l'exécution, un BookId est une simple chaîne.
export type BookId = string & {
    readonly [bookBrand]: true;
};
export type ReaderId = string & {
    readonly [readerBrand]: true;
};
// « asserts value is BookId » : si la fonction se termine sans erreur, value devient un BookId
// pour la suite du code appelant.
export function assertBookId(value: string): asserts value is BookId {
    // [1-9][0-9]* : pas de 0 au début (refuse book:0 et book:01), ni signe, ni virgule.
    if (!/^book:[1-9][0-9]*$/.test(value))
        throw new Error("Identifiant invalide");
}
export function parseBookId(value: string): BookId {
    assertBookId(value);
    // Pas de « as BookId » : c'est l'assertion juste au-dessus qui a affiné le type de value.
    return value;
}
export function loanKey(bookId: BookId, readerId: ReaderId): string {
    return `${bookId}@${readerId}`;
}
