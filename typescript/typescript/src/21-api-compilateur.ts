import ts from 'typescript';
export interface SourceReport {
    functions: string[];
    classes: string[];
    explicitAnyCount: number;
}
export function inspectSource(source: string): SourceReport {
    // TODO : implémenter selon l’énoncé.
    throw new Error("À implémenter");
}
