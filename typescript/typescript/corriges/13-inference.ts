export const statuses = ['available', 'borrowed'] as const;
export type Status = typeof statuses[number];
// TODO : conserver les littéraux avec as const et valider les clés avec satisfies.
export const labels = { available: 'Disponible', borrowed: 'Emprunté' } as const satisfies Record<Status, string>;
// TODO : empêcher defaultValue d’élargir C à l’aide de NoInfer.
export function choose<C extends string>(choices: readonly C[], defaultValue?: NoInfer<C>): C {
    if (defaultValue !== undefined && choices.includes(defaultValue))
        return defaultValue;
    const first = choices[0];
    if (first === undefined)
        throw new Error('Aucun choix');
    return first;
}
