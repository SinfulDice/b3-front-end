export const statuses = ['available', 'borrowed'] as const;
// typeof passe de la valeur au type ; [number] = « le type de n'importe quelle case ».
export type Status = (typeof statuses)[number];
// as const garde les littéraux ('Disponible' et pas string) ; satisfies vérifie qu'il y a
// exactement une clé par Status, SANS élargir le type comme le ferait une annotation.
export const labels = {
    available: "Disponible",
    borrowed: "Emprunté",
} as const satisfies Record<Status, string>;
// NoInfer : C est déduit seulement de choices. defaultValue ne peut pas ajouter une valeur
// (sans lui, choose(['a', 'b'], 'z') donnerait C = 'a' | 'b' | 'z').
export function choose<C extends string>(choices: readonly C[], defaultValue?: NoInfer<C>): C {
    if (defaultValue !== undefined && choices.includes(defaultValue))
        return defaultValue;
    const [firstChoice] = choices;
    if (firstChoice === undefined)
        throw new Error("Aucun choix");
    return firstChoice;
}
