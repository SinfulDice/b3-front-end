export interface BookSummary {
    id: string;
    title: string;
    pages: number;
}
// TODO : remplacer boolean par le prédicat de type attendu.
export function isBook(value: unknown): value is BookSummary {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
        && 'id' in value && typeof value.id === 'string' && value.id.trim().length > 0
        && 'title' in value && typeof value.title === 'string' && value.title.trim().length > 0
        && 'pages' in value && typeof value.pages === 'number' && Number.isInteger(value.pages) && value.pages > 0;
}
export function parseBook(json: string): BookSummary {
    try {
        const data: unknown = JSON.parse(json);
        if (isBook(data))
            return data;
    }
    catch { /* Une erreur de syntaxe devient une erreur métier ci-dessous. */ }
    throw new Error('Livre invalide');
}
