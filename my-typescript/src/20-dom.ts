// Des « ports » : on ne demande que ce dont on a besoin. Un vrai input ou un faux objet
// { value: '…' } conviennent, ce qui rend la fonction facile à tester sans navigateur.
export type InputPort = Pick<HTMLInputElement, 'value'>;
export type ButtonPort = Pick<HTMLButtonElement, 'addEventListener' | 'removeEventListener'>;
export function findSearchInput(root: ParentNode): HTMLInputElement | null {
    // querySelector générique : on DIT à TypeScript quel élément on attend. Le retour reste
    // « | null », car rien ne garantit que l'élément existe.
    return root.querySelector<HTMLInputElement>("input[data-search]");
}
export function bindSearch(input: InputPort, button: ButtonPort, onSearch: (query: string) => void): () => void {
    // Une seule fonction, gardée dans une constante : removeEventListener doit recevoir
    // exactement la MÊME fonction que addEventListener pour la retrouver.
    // input.value est lu au moment du clic (valeur actuelle), pas à l'inscription.
    const handleClick = () => onSearch(input.value.trim());
    button.addEventListener("click", handleClick);
    return () => button.removeEventListener("click", handleClick);
}
