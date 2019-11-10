const { wrapInArray } = require("../../../utils");

module.exports = wrapInArray(
  {},
  { a: "3", d: "f" },
  { d: true },
  { f: null },
  { hello: 123 },
  { cool_name: 4 },
  {
    super_nested: [
      { a: 3451231.444, b: false },
      {
        c: {
          v: {
            v: [
              {
                m: "123"
              }
            ]
          }
        }
      }
    ]
  },
  { m: -123 },
  { q: -4e28 }
);
