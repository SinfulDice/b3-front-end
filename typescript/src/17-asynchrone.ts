export interface HttpResponse {
    ok: boolean;
    status: number;
    json(): Promise<unknown>;
}
export type Transport = (url: string) => Promise<HttpResponse>;
export async function loadTitles(transport: Transport): Promise<string[]> {
    // TODO : implémenter selon l’énoncé.
    throw new Error("À implémenter");
}
