export interface HttpResponse {
    ok: boolean;
    status: number;
    json(): Promise<unknown>;
}
// Le transport est INJECTÉ (passé en paramètre) : les tests donnent un faux transport, sans réseau.
export type Transport = (url: string) => Promise<HttpResponse>;
function hasStringTitle(item: unknown): item is {
    title: string;
} {
    return (typeof item === "object" &&
        item !== null &&
        !Array.isArray(item) &&
        "title" in item &&
        typeof item.title === "string");
}
export async function loadTitles(transport: Transport): Promise<string[]> {
    // Pas de try/catch : une erreur du transport ou de json() remonte telle quelle à l'appelant.
    const response = await transport("/books");
    // On s'arrête AVANT json() : le corps d'une réponse en erreur n'est pas lu.
    if (!response.ok)
        throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    // Les types TypeScript disparaissent à l'exécution : rien ne garantit la forme de data,
    // il faut la vérifier case par case.
    if (!Array.isArray(data))
        throw new Error("Réponse invalide");
    const items: readonly unknown[] = data;
    if (!items.every(hasStringTitle))
        throw new Error("Réponse invalide");
    // every avec un prédicat affine le type : items est maintenant readonly { title: string }[].
    return items.map((item) => item.title);
}
