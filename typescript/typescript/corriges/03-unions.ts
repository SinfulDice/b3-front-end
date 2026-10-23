export type Status = 'available' | 'borrowed' | 'reserved';
export function statusLabel(status: Status): string {
    const labels = { available: 'Disponible', borrowed: 'Emprunté', reserved: 'Réservé' };
    return labels[status];
}
// TODO : ajouter les deux surcharges, la signature d’implémentation seule est trop large.
export function normalizeTitle(value: string): string;
export function normalizeTitle(value: readonly string[]): string[];
export function normalizeTitle(value: string | readonly string[]): string | string[] {
    return typeof value === 'string' ? value.trim() : value.map(title => title.trim());
}
