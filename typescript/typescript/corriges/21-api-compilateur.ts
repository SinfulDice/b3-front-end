import ts from 'typescript';
export interface SourceReport {
    functions: string[];
    classes: string[];
    explicitAnyCount: number;
}
export function inspectSource(source: string): SourceReport {
    const file = ts.createSourceFile('exercise.ts', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const report: SourceReport = { functions: [], classes: [], explicitAnyCount: 0 };
    function visit(node: ts.Node): void {
        if (ts.isFunctionDeclaration(node) && node.name)
            report.functions.push(node.name.text);
        if (ts.isClassDeclaration(node) && node.name)
            report.classes.push(node.name.text);
        if (node.kind === ts.SyntaxKind.AnyKeyword)
            report.explicitAnyCount += 1;
        ts.forEachChild(node, visit);
    }
    visit(file);
    return report;
}
