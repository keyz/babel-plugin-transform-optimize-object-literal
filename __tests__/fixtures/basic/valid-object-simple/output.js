const {
  wrapInArray
} = require("../../../utils");

module.exports = wrapInArray(JSON.parse("{}"), JSON.parse("{\"a\":\"3\",\"d\":\"f\"}"), JSON.parse("{\"d\":true}"), JSON.parse("{\"f\":null}"), JSON.parse("{\"hello\":123}"), JSON.parse("{\"cool_name\":4}"), JSON.parse("{\"super_nested\":[{\"a\":3451231.444,\"b\":false},{\"c\":{\"v\":{\"v\":[{\"m\":\"123\"}]}}}]}"), JSON.parse("{\"m\":-123}"), JSON.parse("{\"q\":-4e+28}"), JSON.parse("{\"name\":\"Tom\",\"age\":22,\"yes\":true,\"no\":false,\"nothing\":null,\"data1\":[1,2,{\"ok\":true}],\"data2\":{\"foo\":\"bar\",\"lol\":\"ok\"}}"));
