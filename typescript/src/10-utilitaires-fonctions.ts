export async function search(query: string, limit = 10) {
    return { query, limit, titles: ['Dune'] };
}
export type SearchArgs = unknown;
export type SearchReturn = unknown;
export type SearchData = unknown;
export type Result<T> = {
    ok: true;
    data: T;
} | {
    ok: false;
    error: Error;
};
export async function attempt<T>(operation: () => Promise<T>): Promise<Result<T>> {
    // TODO : implémenter selon l’énoncé.
    throw new Error("À implémenter");
}
