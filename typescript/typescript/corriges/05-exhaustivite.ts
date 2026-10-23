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
export function assertNever(value: never): never {
    throw new Error(`État inattendu : ${String(value)}`);
}
export function renderState(state: LoadState<readonly string[]>): string {
    switch (state.status) {
        case 'idle': return 'Prêt';
        case 'loading': return 'Chargement…';
        case 'success': return `${state.data.length} livre(s)`;
        case 'error': return state.error.message;
        default: return assertNever(state);
    }
}
