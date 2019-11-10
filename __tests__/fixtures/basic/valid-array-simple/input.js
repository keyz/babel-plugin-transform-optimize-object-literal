const { wrapInArray } = require("../../../utils");

module.exports = wrapInArray(
  [],
  [1],
  [true, false, null, 44, "ok", -1, "lol"],
  [-1],
  [{ a: { b: { c: { d: [] } } } }],
  [{}],
  [{ a: null }],
  [[[[[[[[[[[[[[[[[4]]]]]], 8]]]]]], 9]]]]]
);
