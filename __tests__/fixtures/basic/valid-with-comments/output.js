const {
  wrapInArray
} = require("../../../utils");

module.exports = wrapInArray(JSON.parse("{}"), // hello
JSON.parse("[]"), // how are you
// here are
JSON.parse("[1]"), // comments
// comments
// comments
JSON.parse("[true,false,null,44,\"ok\",-1,\"lol\"]"), JSON.parse("{\"super_nested\":[{\"a\":3451231.444,\"b\":false},{\"c\":{\"v\":{\"v\":[{\"m\":\"123\"}]}}}]}"), JSON.parse("{\"m\":-123}"), JSON.parse("{\"q\":-4e+28}"));
