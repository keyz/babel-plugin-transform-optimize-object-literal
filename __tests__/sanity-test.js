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

describe("it should preserve the semantics", () => {
  const validFixtureDirList = allFixtureList
    .filter(pathToFile => /\/valid-.+\/input\.js$/.test(pathToFile))
    .map(pathToFile => path.dirname(pathToFile));

  for (const pathToDir of validFixtureDirList) {
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
});

describe("generative tests", () => {
  const generativeFixtureDirList = allFixtureList
    .filter(pathToFile => /\/valid-generative.+\/output\.js$/.test(pathToFile))
    .map(pathToFile => path.dirname(pathToFile));

  for (const pathToDir of generativeFixtureDirList) {
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

    test(`The number of \`JSON.parse()\` calls should match (${path.basename(
      pathToDir
    )})`, () => {
      const childrenCount = arrayNode.arguments.length;
      expect((code.match(/JSON\.parse\(/g) || []).length).toBe(childrenCount);
    });
  }
});
