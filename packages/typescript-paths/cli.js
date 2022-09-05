const fs = require("fs/promises");
const { relative, resolve, dirname } = require("path");

const { default: generate } = require("@babel/generator");
const { parse } = require("@babel/parser");
const { default: traverse } = require("@babel/traverse");
const fg = require("fast-glob");
const json5 = require("json5");

async function main() {
  const projectPath = process.cwd();
  const tsconfigPath = resolve(process.cwd(), "tsconfig.json");
  const json = await fs.readFile(tsconfigPath, {
    encoding: "utf-8",
  });
  const tsconfig = json5.parse(json);

  const rootDir = resolve(projectPath, tsconfig.compilerOptions.rootDir);
  const baseUrl = resolve(projectPath, tsconfig.compilerOptions.baseUrl);
  const outDir = resolve(projectPath, tsconfig.compilerOptions.outDir);

  const paths = Object.fromEntries(
    Object.entries(tsconfig.compilerOptions.paths).map(([key, value]) => {
      return [key, resolve(baseUrl, value[0]).replace(rootDir, outDir)];
    })
  );

  const files = await fg(resolve(resolve(outDir, "**/*(.d.ts|.js)")), {
    ignore: ["**/*.d.ts.map"],
  });

  for (const file of files) {
    const code = await fs.readFile(file, { encoding: "utf-8" });
    const ast = parse(code, {
      sourceType: "module",
      plugins: [["typescript", { dts: file.endsWith(".d.ts") }]],
    });

    traverse(ast, {
      enter(path) {
        if (
          !path.isImportDeclaration() &&
          !path.isExportDeclaration() &&
          !path.isCallExpression()
        ) {
          return;
        }
        let source;
        if (path.isCallExpression()) {
          if (path.node.callee.type !== "Identifier") {
            return;
          }
          if (path.node.callee.name !== "require") {
            return;
          }

          if (!path.node.arguments.length) {
            return;
          }
          const argument = path.node.arguments[0];
          if (argument.type !== "StringLiteral") {
            return;
          }
          source = argument;
        } else {
          if (!path.node.source) {
            return;
          }
          source = path.node.source;
        }

        Object.entries(paths).forEach(([from, to]) => {
          const fromRegExp = new RegExp(`^${from.replace("*", "(.*)")}$`);
          const fromMatches = source.value.match(fromRegExp);

          if (!fromMatches) {
            return;
          }

          source.value = relative(
            dirname(file),
            to.replace("*", fromMatches[1])
          );

          if (!source.value.startsWith(".")) {
            source.value = "./" + source.value;
          }
        });
      },
    });

    const output = generate(ast, {}, code);
    await fs.writeFile(file, output.code);
  }
}

main();
