export function getProperty<T, K extends keyof T>(object: T, key: K): T[K] {
    return object[key];
}
export function pluck<T, K extends keyof T>(rows: readonly T[], key: K): T[K][] {
    return rows.map(row => row[key]);
}
