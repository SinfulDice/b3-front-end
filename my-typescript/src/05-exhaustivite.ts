// Union discriminée : la propriété commune `status` dit quelle variante on a.
export type LoadState<T> = {
    status: 'idle';
} | {
    status: 'loading';
} | {
    status: 'success';
    data: T;
} | {
    status: 'error';
    error: Error;
};
// never = « aucune valeur possible ». Si tous les cas sont traités, il ne reste rien à passer ici.
export function assertNever(value: never): never {
    throw new Error(`État inattendu : ${JSON.stringify(value)}`);
}
export function renderState(state: LoadState<readonly string[]>): string {
    switch (state.status) {
        case 'idle':
            return "Prêt";
        case 'loading':
            return "Chargement…";
        case 'success':
            // Dans ce case, TypeScript sait que state a une propriété data.
            return `${state.data.length} livre(s)`;
        case 'error':
            return state.error.message;
        default:
            // Si on ajoute une 5e variante sans la traiter, cette ligne ne compile plus.
            return assertNever(state);
    }
}
