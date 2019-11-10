const {
  wrapInArray
} = require("../../../utils");

module.exports = wrapInArray(JSON.parse("[]"), JSON.parse("[1]"), JSON.parse("[true,false,null,44,\"ok\",-1,\"lol\"]"), JSON.parse("[-1]"), JSON.parse("[{\"a\":{\"b\":{\"c\":{\"d\":[]}}}}]"), JSON.parse("[{}]"), JSON.parse("[{\"a\":null}]"), JSON.parse("[[[[[[[[[[[[[[[[[4]]]]]],8]]]]]],9]]]]]"));
