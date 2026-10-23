// Tuple nommé et readonly : exactement 2 cases (un titre, puis un nombre de pages), non modifiables.
export type BookLine = readonly [title: string, pages: number];
export function formatBook(line: BookLine, available = true, subtitle?: string): string {
    const [title, pages] = line;
    // Une chaîne vide est « falsy » : elle est ignorée comme un sous-titre absent.
    const fullTitle = subtitle ? `${title} : ${subtitle}` : title;
    return `${fullTitle} — ${pages} p. — ${available ? "disponible" : "indisponible"}`;
}
export function firstTitle(titles: readonly string[]): string | null {
    // Avec noUncheckedIndexedAccess, titles[0] est string | undefined : ?? remplace undefined par null.
    return titles[0] ?? null;
}
