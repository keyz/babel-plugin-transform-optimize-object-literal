const { wrapInArray } = require("../../../utils");

module.exports = wrapInArray(
  {}, // hello
  [], // how are you
  // here are
  [1 /* some */],
  // comments
  // comments
  // comments
  [
    /* some */ true, // comments
    false /* some */, // comments
    null /* some */, // comments
    /* some */ /* comments */ 44,
    /*
     * some
     * comments
     */
    "ok",
    -1,
    "lol"
  ],
  {
    super_nested: [
      { a: 3451231.444, /* comments */ b: false }, // comments
      {
        // comments
        c: {
          v: {
            // comments
            v: /* comments */ [
              /* comments */ {
                /* comments */ m: /* comments */ "123" // comments
              } // comments
              /* comments */
            ]
          }
        } // comments
      }
    ]
  },
  { m: -123 },
  { q: -4e28 }
);
