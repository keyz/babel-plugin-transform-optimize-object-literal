const fs = require("fs");
const path = require("path");
const { parse } = require("@babel/parser");

beforeEach(() => {
  jest.resetModules();
});

function* walkSync(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const pathToFile = path.join(dir, file);
    const isDirectory = fs.statSync(pathToFile).isDirectory();
    if (isDirectory) {
      yield* walkSync(pathToFile);
    } else {
      yield pathToFile;
    }
  }
}

const allFixtureList = [...walkSync(path.join(__dirname, "fixtures"))];

describe("all valid fixtures", () => {
  const validFixtureDirList = allFixtureList
    .filter(pathToFile => !/\/fixtures\/react\//.test(pathToFile))
    .filter(pathToFile => /\/valid-.+\/input\.js$/.test(pathToFile))
    .map(pathToFile => path.dirname(pathToFile));

  verifyRuntimeValue(validFixtureDirList);
  verifyAstShape(validFixtureDirList);
});

function verifyRuntimeValue(fixtureDirList) {
  for (const pathToDir of fixtureDirList) {
    test(`the runtime value stays the same (${path.basename(
      pathToDir
    )})`, () => {
      const input = require(`${pathToDir}/input`);
      const output = require(`${pathToDir}/output`);

      expect(input.length).toBe(output.length);

      input.forEach((x, index) => {
        expect(x).toEqual(output[index]);
      });
    });
  }
}

function verifyAstShape(fixtureDirList) {
  for (const pathToDir of fixtureDirList) {
    const code = fs.readFileSync(path.resolve(pathToDir, "output.js"), "utf8");

    const ast = parse(code);
    const arrayNode = ast.program.body[1].expression.right;

    test(`all object literal nodes should have be optimized (${path.basename(
      pathToDir
    )})`, () => {
      for (const childNode of arrayNode.arguments) {
        expect(childNode).toMatchObject({
          type: "CallExpression",
          callee: {
            type: "MemberExpression",
            object: {
              type: "Identifier",
              name: "JSON"
            },
            property: {
              type: "Identifier",
              name: "parse"
            }
          }
        });
      }
    });

    test(`the number of \`JSON.parse()\` calls should match (${path.basename(
      pathToDir
    )})`, () => {
      const childrenCount = arrayNode.arguments.length;
      expect((code.match(/JSON\.parse\(/g) || []).length).toBe(childrenCount);
    });
  }
}
