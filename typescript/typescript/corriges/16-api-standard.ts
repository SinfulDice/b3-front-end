export function uniqueTags(tags: Iterable<string>): string[] {
    return [...new Set([...tags].map(tag => tag.trim()).filter(tag => tag.length > 0))];
}
export function groupByAuthor(books: readonly {
    title: string;
    author: string;
}[]): Map<string, string[]> {
    const groups = new Map<string, string[]>();
    for (const book of books) {
        const titles = groups.get(book.author) ?? [];
        titles.push(book.title);
        groups.set(book.author, titles);
    }
    return groups;
}
export function dueDate(iso: string, days: number): Date {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime()) || !Number.isInteger(days))
        throw new RangeError('Date ou durée invalide');
    date.setUTCDate(date.getUTCDate() + days);
    if (Number.isNaN(date.getTime()))
        throw new RangeError('Date ou durée invalide');
    return date;
}
export function isIsbn13(value: string): boolean {
    return value.length === 13 && /^\d{13}$/.test(value);
}
export function searchUrl(base: string, query: string): URL {
    const url = new URL(base);
    url.searchParams.set('q', query);
    return url;
}
