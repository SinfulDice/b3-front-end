export type InputPort = Pick<HTMLInputElement, 'value'>;
export type ButtonPort = Pick<HTMLButtonElement, 'addEventListener' | 'removeEventListener'>;
export function findSearchInput(root: ParentNode): HTMLInputElement | null {
    return root.querySelector<HTMLInputElement>('input[data-search]');
}
export function bindSearch(input: InputPort, button: ButtonPort, onSearch: (query: string) => void): () => void {
    const listener = () => { onSearch(input.value.trim()); };
    button.addEventListener('click', listener);
    return () => { button.removeEventListener('click', listener); };
}
