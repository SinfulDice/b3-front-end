export const statuses = ['available', 'borrowed'] as const;
export type Status = unknown;
// TODO : conserver les littéraux avec as const et valider les clés avec satisfies.
export const labels = undefined;
// TODO : empêcher defaultValue d’élargir C à l’aide de NoInfer.
export function choose<C extends string>(choices: readonly C[], defaultValue?: unknown): C {
    // TODO : implémenter selon l’énoncé.
    throw new Error("À implémenter");
}
