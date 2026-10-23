import ts from 'typescript';
export interface SourceReport {
    functions: string[];
    classes: string[];
    explicitAnyCount: number;
}
export function inspectSource(source: string): SourceReport {
    // Le compilateur transforme le texte en ARBRE de syntaxe (AST) : chaque morceau de code
    // devient un nœud (déclaration, paramètre, mot-clé…). Un commentaire ou le texte "any"
    // dans une chaîne ne sont pas des mots-clés any : ils ne comptent pas.
    const sourceFile = ts.createSourceFile("source.ts", source, ts.ScriptTarget.Latest);
    const report: SourceReport = { functions: [], classes: [], explicitAnyCount: 0 };
    function visit(node: ts.Node): void {
        // Les gardes ts.isXxx affinent le type du nœud, comme nos prédicats « value is … ».
        if (ts.isFunctionDeclaration(node) && node.name)
            report.functions.push(node.name.text);
        else if (ts.isClassDeclaration(node) && node.name)
            report.classes.push(node.name.text);
        else if (node.kind === ts.SyntaxKind.AnyKeyword)
            report.explicitAnyCount += 1;
        // On descend dans les enfants APRÈS avoir noté le nœud : outer est listé avant inner.
        ts.forEachChild(node, visit);
    }
    visit(sourceFile);
    return report;
}
