export async function search(query: string, limit = 10) {
    return { query, limit, titles: ['Dune'] };
}
// Les types sont DÉDUITS de la fonction : si search change, ils suivent tout seuls.
export type SearchArgs = Parameters<typeof search>; // [query: string, limit?: number]
export type SearchReturn = ReturnType<typeof search>; // Promise<{ query; limit; titles }>
export type SearchData = Awaited<SearchReturn>; // ce que donne le await : { query; limit; titles }
export type Result<T> = {
    ok: true;
    data: T;
} | {
    ok: false;
    error: Error;
};
export async function attempt<T>(operation: () => Promise<T>): Promise<Result<T>> {
    try {
        // operation() est appelée DANS le try : une exception synchrone est attrapée aussi.
        return { ok: true, data: await operation() };
    }
    catch (cause) {
        // Ce qui est lancé peut être n'importe quoi (une chaîne, un nombre…) : cause est unknown.
        return { ok: false, error: cause instanceof Error ? cause : new Error(String(cause)) };
    }
}
