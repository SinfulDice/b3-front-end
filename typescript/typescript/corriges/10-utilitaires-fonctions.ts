export async function search(query: string, limit = 10) {
    return { query, limit, titles: ['Dune'] };
}
export type SearchArgs = Parameters<typeof search>;
export type SearchReturn = ReturnType<typeof search>;
export type SearchData = Awaited<SearchReturn>;
export type Result<T> = {
    ok: true;
    data: T;
} | {
    ok: false;
    error: Error;
};
export async function attempt<T>(operation: () => Promise<T>): Promise<Result<T>> {
    try {
        return { ok: true, data: await operation() };
    }
    catch (cause: unknown) {
        return { ok: false, error: cause instanceof Error ? cause : new Error(String(cause)) };
    }
}
