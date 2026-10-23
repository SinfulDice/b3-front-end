export type BookLine = readonly [
    title: string,
    pages: number
];
export function formatBook(line: BookLine, available = true, subtitle?: string): string {
    const [title, pages] = line;
    return `${title}${subtitle ? ` : ${subtitle}` : ''} — ${pages} p. — ${available ? 'disponible' : 'indisponible'}`;
}
export function firstTitle(titles: readonly string[]): string | null {
    return titles[0] ?? null;
}
