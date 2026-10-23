export type BookLine = readonly [title: string, pages: number];
export function formatBook(line: BookLine, available = true, subtitle?: string): string {
    return `${line[0]}${subtitle ? ' : ' + subtitle : ''} — ${line[1]} p. — ${available ? 'disponible' : 'indisponible'}`
}
export function firstTitle(titles: readonly string[]): string | null {
    return titles.length > 0 ? titles[0] ?? null : null;
}
