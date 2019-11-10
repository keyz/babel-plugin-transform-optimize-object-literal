const generateCode = require("@babel/generator").default;
const { declare } = require("@babel/helper-plugin-utils");
const t = require("@babel/types");

const DEFAULT_MINIMUM_ARRAY_LENGTH = 0;
const DEFAULT_MINIMUM_OBJECT_LENGTH = 0;

module.exports = declare((api, rawOptions) => {
  api.assertVersion(7);

  const {
    skipArrayOptimizationIfLengthIsBelow,
    skipObjectOptimizationIfLengthIsBelow
  } = rawOptions;

  if (
    skipArrayOptimizationIfLengthIsBelow !== undefined &&
    typeof skipArrayOptimizationIfLengthIsBelow !== "number"
  ) {
    throw new Error(
      `Expect \`options.skipArrayOptimizationIfLengthIsBelow\` to be a number, got ${skipArrayOptimizationIfLengthIsBelow}`
    );
  }

  if (
    skipObjectOptimizationIfLengthIsBelow !== undefined &&
    typeof skipObjectOptimizationIfLengthIsBelow !== "number"
  ) {
    throw new Error(
      `Expect \`options.skipObjectOptimizationIfLengthIsBelow\` to be a number, got ${skipObjectOptimizationIfLengthIsBelow}`
    );
  }

  const options = {
    skipArrayOptimizationIfLengthIsBelow:
      skipArrayOptimizationIfLengthIsBelow || DEFAULT_MINIMUM_ARRAY_LENGTH,
    skipObjectOptimizationIfLengthIsBelow:
      skipObjectOptimizationIfLengthIsBelow || DEFAULT_MINIMUM_OBJECT_LENGTH
  };

  return {
    name: "transform-optimize-object-literal",

    visitor: {
      Program: {
        // By starting to traverse in the `exit` function of `Program`
        // we enforce the optimization pass to run *after* all other plugins
        exit: path => {
          path.traverse({
            ArrayExpression: {
              enter: path => {
                processNodePath(path, options);
              }
            },
            ObjectExpression: {
              enter: path => {
                processNodePath(path, options);
              }
            }
          });
        }
      }
    }
  };
});

function processNodePath(path, options) {
  if (!shouldSerializeNodePath(path, options)) {
    return;
  }

  // 1. Convert from AST to code
  const code = generateCode(path.node).code;

  // 2. We know everything is literal here, so we can run partial evaluation
  // on the code to get its runtime value
  const dataBox = {};
  const populate = new Function("box", `box.data = ${code}`);
  populate(dataBox);

  // 3. Serialize the runtime value to JSON
  const jsonString = JSON.stringify(dataBox.data);

  path.replaceWith(
    t.callExpression(
      t.memberExpression(t.identifier("JSON"), t.identifier("parse")),
      [t.stringLiteral(jsonString)]
    )
  );
}

function shouldSerializeNodePath(rootNodePath, options) {
  if (
    rootNodePath.type !== "ArrayExpression" &&
    rootNodePath.type !== "ObjectExpression"
  ) {
    // Bail out if the root node doesn't represent an object or an array
    return false;
  }

  if (rootNodePath.type === "ArrayExpression") {
    const len = rootNodePath.node.elements.length;
    if (len < options.skipArrayOptimizationIfLengthIsBelow) {
      return false;
    }
  }

  if (rootNodePath.type === "ObjectExpression") {
    const len = rootNodePath.node.properties.length;
    if (len < options.skipObjectOptimizationIfLengthIsBelow) {
      return false;
    }
  }

  let isSerializable = true;

  rootNodePath.traverse({
    enter(path) {
      if (
        // ECMA-404 5.
        // A JSON value can be an:
        path.isObjectExpression() || // object,
        path.isArrayExpression() || // array
        path.isNumericLiteral() || // number
        path.isStringLiteral() || // string
        path.isBooleanLiteral() || // true, false
        path.isNullLiteral() || // null
        path.isObjectProperty()
        // We'll visit the property key node as an `Identifier` later
        // (see below)
      ) {
        return;
      }

      if (path.isIdentifier()) {
        if (
          path.parent.type === "ObjectProperty" &&
          path.parent.key === path.node && // It's the "key" node
          !path.parent.computed && // Not `{[foo]: 123}`
          !path.parent.shorthand // Not `{foo}`
        ) {
          return;
        }
      }

      if (path.isUnaryExpression()) {
        if (
          // ECMA-404 8.
          // [A number] may have a preceding minus sign (U+002D)
          path.node.operator === "-" &&
          path.node.argument.type === "NumericLiteral"
        ) {
          return;
        }
      }

      isSerializable = false;
      path.stop();
    }
  });

  return isSerializable;
}
