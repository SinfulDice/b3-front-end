import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join, relative } from 'node:path';
import { spawnSync } from 'node:child_process';
import ts from 'typescript';

const root = fileURLToPath(new URL('../', import.meta.url));
const args = process.argv.slice(2);
const allowedFlags = new Set(['--solutions', '--types-only', '--runtime-only']);
const flags = args.filter(arg => arg.startsWith('--'));
const ids = args.filter(arg => !arg.startsWith('--'));
const manifest = JSON.parse(await readFile(join(root, 'exercices.json'), 'utf8'));
const selected = ids.length === 0 ? manifest : manifest.filter(item => ids.includes(item.name.slice(0, 2)));
if (flags.some(flag => !allowedFlags.has(flag)) || ids.some(id => !manifest.some(item => item.name.startsWith(`${id}-`)))
  || (flags.includes('--types-only') && flags.includes('--runtime-only'))) {
  console.error('Usage : npm test -- [--solutions] [--types-only | --runtime-only] [01 02 … 21]');
  process.exit(2);
}

const solutions = flags.includes('--solutions');
const sourceFolder = solutions ? 'corriges' : 'src';
const typesOnly = flags.includes('--types-only');
const runtimeOnly = flags.includes('--runtime-only');
console.log(`${solutions ? 'Corrigés' : 'Élèves'} : ${selected.map(item => item.name.slice(0, 2)).join(', ')}`);

// Contrôle syntaxique ciblé : les tests négatifs peuvent employer @ts-expect-error,
// mais les solutions ne peuvent pas contourner le système de types.
let qualityFailed = false;
for (const { name } of selected) {
  const path = join(root, sourceFolder, `${name}.ts`);
  const text = await readFile(path, 'utf8');
  const file = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true);
  const report = (node, message) => {
    const { line, character } = file.getLineAndCharacterOfPosition(node.getStart(file));
    console.error(`${sourceFolder}/${name}.ts:${line + 1}:${character + 1} — ${message}`);
    qualityFailed = true;
  };
  function visit(node) {
    if (node.kind === ts.SyntaxKind.AnyKeyword) report(node, 'any explicite interdit ; utiliser un type précis ou unknown.');
    if (ts.isNonNullExpression(node)) report(node, 'Assertion non nulle interdite ; gérer null/undefined.');
    if (ts.isTypeAssertionExpression(node) || (ts.isAsExpression(node) && node.type.getText(file) !== 'const')) {
      report(node, 'Conversion forcée interdite ; valider ou affiner le type (as const est autorisé).');
    }
    ts.forEachChild(node, visit);
  }
  visit(file);
  const scanner = ts.createScanner(ts.ScriptTarget.Latest, false, ts.LanguageVariant.Standard, text);
  for (let token = scanner.scan(); token !== ts.SyntaxKind.EndOfFileToken; token = scanner.scan()) {
    if ((token === ts.SyntaxKind.SingleLineCommentTrivia || token === ts.SyntaxKind.MultiLineCommentTrivia)
      && /@ts-(?:ignore|nocheck|expect-error)\b/.test(scanner.getTokenText())) {
      console.error(`${sourceFolder}/${name}.ts — Directive de suppression TypeScript interdite dans les réponses.`);
      qualityFailed = true;
    }
  }
}
if (qualityFailed) process.exit(1);

await mkdir(join(root, '.work'), { recursive: true });
const stage = await mkdtemp(join(root, '.work', 'check-'));
try {
  // Un espace par lancement permet de tester les corrigés sans toucher au travail élève.
  await mkdir(join(stage, 'src'));
  await mkdir(join(stage, 'tests'));
  await writeFile(join(stage, 'package.json'), '{"type":"module"}\n');
  await cp(join(root, 'tests', 'type-helpers.ts'), join(stage, 'tests', 'type-helpers.ts'));
  const rootNames = [];
  const runtimePaths = [];
  for (const { name, runtime, types } of selected) {
    const source = join(stage, 'src', `${name}.ts`);
    await cp(join(root, sourceFolder, `${name}.ts`), source);
    rootNames.push(source);
    if (types && !runtimeOnly) {
      const file = join(stage, 'tests', `${name}.types.ts`);
      await cp(join(root, 'tests', `${name}.types.ts`), file);
      rootNames.push(file);
    }
    if (runtime && !typesOnly) {
      const file = join(stage, 'tests', `${name}.test.ts`);
      await cp(join(root, 'tests', `${name}.test.ts`), file);
      rootNames.push(file);
      runtimePaths.push(join(stage, 'build', 'tests', `${name}.test.js`));
    }
  }
  const configPath = join(root, 'tsconfig.json');
  const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
  if (configFile.error) throw new Error(ts.flattenDiagnosticMessageText(configFile.error.messageText, '\n'));
  const config = ts.parseJsonConfigFileContent(configFile.config, ts.sys, root);
  const options = { ...config.options, rootDir: stage, outDir: join(stage, 'build'), noEmit: typesOnly };
  const program = ts.createProgram({ rootNames, options });
  const diagnostics = [...config.errors, ...ts.getPreEmitDiagnostics(program)];
  if (diagnostics.length > 0) {
    // Afficher les chemins du dépôt plutôt que les chemins temporaires.
    const host = {
      getCanonicalFileName: path => path,
      getCurrentDirectory: () => root,
      getNewLine: () => '\n'
    };
    const formatted = ts.formatDiagnosticsWithColorAndContext(diagnostics, host)
      .replaceAll(relative(root, join(stage, 'src')), sourceFolder)
      .replaceAll(relative(root, join(stage, 'tests')), 'tests');
    console.error(formatted);
    process.exitCode = 1;
  } else {
    console.log(runtimeOnly ? 'Compilation du code et des tests de comportement : OK.' : 'Tests de typage : OK (cas acceptés et refusés).');
    if (!typesOnly) {
      const emitted = program.emit();
      if (emitted.emitSkipped) throw new Error('Émission JavaScript impossible.');
      if (runtimePaths.length > 0) {
        const result = spawnSync(process.execPath, ['--test', '--test-isolation=none', '--test-reporter=spec', ...runtimePaths], { cwd: root, stdio: 'inherit' });
        if (result.error) throw result.error;
        process.exitCode = result.status ?? 1;
      } else {
        console.log('Exercices de types uniquement : aucun comportement à exécuter.');
      }
    }
  }
} finally {
  await rm(stage, { recursive: true, force: true });
}
