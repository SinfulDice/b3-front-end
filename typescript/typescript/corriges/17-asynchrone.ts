export interface HttpResponse {
    ok: boolean;
    status: number;
    json(): Promise<unknown>;
}
export type Transport = (url: string) => Promise<HttpResponse>;
export async function loadTitles(transport: Transport): Promise<string[]> {
    const response = await transport('/books');
    if (!response.ok)
        throw new Error(`HTTP ${response.status}`);
    const data: unknown = await response.json();
    if (!Array.isArray(data))
        throw new Error('Réponse invalide');
    return data.map((item: unknown) => {
        if (typeof item !== 'object' || item === null || Array.isArray(item) || !('title' in item) || typeof item.title !== 'string') {
            throw new Error('Réponse invalide');
        }
        return item.title;
    });
}
