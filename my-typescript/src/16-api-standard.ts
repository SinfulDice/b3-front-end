// Iterable<string> : un tableau, un Set, un générateur… tout ce qu'on peut parcourir avec for…of.
export function uniqueTags(tags: Iterable<string>): string[] {
    // Un Set ignore les doublons et garde l'ordre d'insertion. 'SF' et 'sf' restent différents.
    const unique = new Set<string>();
    for (const tag of tags) {
        const cleaned = tag.trim();
        if (cleaned !== "")
            unique.add(cleaned);
    }
    return [...unique];
}
export function groupByAuthor(books: readonly {
    title: string;
    author: string;
}[]): Map<string, string[]> {
    const groups = new Map<string, string[]>();
    for (const { title, author } of books) {
        const titles = groups.get(author);
        // Nouveaux tableaux à nous : les livres reçus ne sont jamais modifiés.
        if (titles)
            titles.push(title);
        else
            groups.set(author, [title]);
    }
    return groups;
}
export function dueDate(iso: string, days: number): Date {
    const start = new Date(iso);
    // Une date invalide ne lève pas d'erreur en JavaScript : elle vaut NaN. On le vérifie nous-mêmes.
    if (Number.isNaN(start.getTime()))
        throw new RangeError("Date invalide");
    if (!Number.isInteger(days))
        throw new RangeError("Nombre de jours invalide");
    // Copie, puis calcul en UTC : pas de décalage dû au fuseau horaire ni au changement d'heure.
    // setUTCDate gère seul les fins de mois (28 février + 2 jours = 1er mars en 2024).
    const due = new Date(start.getTime());
    due.setUTCDate(due.getUTCDate() + days);
    return due;
}
export function isIsbn13(value: string): boolean {
    // ^ et $ : la chaîne ENTIÈRE doit être faite de 13 chiffres, rien avant, rien après.
    return /^[0-9]{13}$/.test(value);
}
export function searchUrl(base: string, query: string): URL {
    const url = new URL(base);
    // set remplace l'ancien q (il n'y en a qu'un) et encode les caractères spéciaux (&, é, espace).
    url.searchParams.set("q", query);
    return url;
}
