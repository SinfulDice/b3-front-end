export type Status = 'available' | 'borrowed' | 'reserved';
// Record<Status, string> oblige à donner un libellé pour chacun des 3 statuts, ni plus ni moins.
const STATUS_LABELS: Record<Status, string> = {
    available: "Disponible",
    borrowed: "Emprunté",
    reserved: "Réservé",
};
export function statusLabel(status: Status): string {
    return STATUS_LABELS[status];
}
// Les deux surcharges : ce que voient les appelants. Une chaîne donne une chaîne, un tableau un tableau.
export function normalizeTitle(value: string): string;
export function normalizeTitle(value: readonly string[]): string[];
// La signature d'implémentation : invisible de l'extérieur, elle doit couvrir les deux cas.
export function normalizeTitle(value: string | readonly string[]): string | string[] {
    // typeof affine le type (narrowing) : dans le if, value est string ; après, readonly string[].
    if (typeof value === "string")
        return value.trim();
    // map renvoie un NOUVEAU tableau : le tableau reçu (peut-être gelé) n'est pas modifié.
    return value.map((title) => title.trim());
}
