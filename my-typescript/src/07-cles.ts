// K extends keyof T : la clé doit être l'un des noms de propriétés de T ('title' | 'pages'…).
// T[K] : le type de la propriété K de T (accès indexé), donc string pour 'title', number pour 'pages'.
export function getProperty<T, K extends keyof T>(object: T, key: K): T[K] {
    return object[key];
}
export function pluck<T, K extends keyof T>(rows: readonly T[], key: K): T[K][] {
    return rows.map((row) => row[key]);
}
