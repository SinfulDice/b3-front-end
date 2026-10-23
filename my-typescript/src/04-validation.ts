export interface BookSummary {
    id: string;
    title: string;
    pages: number;
}
function isFilledString(value: unknown): value is string {
    return typeof value === "string" && value.trim() !== "";
}
// « value is BookSummary » : si la fonction renvoie true, TypeScript traite value comme un BookSummary.
export function isBook(value: unknown): value is BookSummary {
    // typeof null vaut "object" et un tableau est un objet : il faut les exclure à la main.
    if (typeof value !== "object" || value === null || Array.isArray(value))
        return false;
    // `in` affine aussi le type : après ce test, TypeScript sait que value.id existe (de type unknown).
    if (!("id" in value) || !("title" in value) || !("pages" in value))
        return false;
    return (isFilledString(value.id) &&
        isFilledString(value.title) &&
        typeof value.pages === "number" &&
        Number.isInteger(value.pages) && // refuse 1.5, NaN et Infinity
        value.pages > 0);
}
export function parseBook(json: string): BookSummary {
    // unknown et pas any : on ne peut rien faire de la donnée tant qu'elle n'est pas validée.
    let data: unknown;
    try {
        data = JSON.parse(json);
    }
    catch {
        throw new Error("Livre invalide");
    }
    if (!isBook(data))
        throw new Error("Livre invalide");
    return data;
}
