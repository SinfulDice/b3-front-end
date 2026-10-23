export interface BookSummary {
    id: string;
    title: string;
    pages: number;
}
// TODO : remplacer boolean par le prédicat de type attendu.
export function isBook(value: unknown): boolean {
    // TODO : implémenter selon l’énoncé.
    throw new Error("À implémenter");
}
export function parseBook(json: string): BookSummary {
    // TODO : implémenter selon l’énoncé.
    throw new Error("À implémenter");
}
