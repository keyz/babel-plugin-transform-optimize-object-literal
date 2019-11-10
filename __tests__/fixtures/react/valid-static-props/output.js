function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const {
  wrapInArray
} = require("../../../utils");

module.exports = wrapInArray(React.createElement(Foo, JSON.parse("{\"yes\":true}")), React.createElement(Foo, JSON.parse("{\"yes\":true}"), "barbar"), React.createElement(Foo, JSON.parse("{\"name\":\"Tom\"}")), React.createElement(Foo, JSON.parse("{\"name\":\"Tom\",\"age\":22,\"yes\":true,\"no\":false,\"nothing\":null,\"data1\":[1,2,{\"ok\":true}],\"data2\":{\"foo\":\"bar\",\"lol\":\"ok\"}}")), React.createElement(Foo, JSON.parse("{\"name\":\"Tom\"}"), React.createElement(Foo, JSON.parse("{\"name\":\"James\"}"), React.createElement(Foo, JSON.parse("{\"name\":\"Mary\"}"), React.createElement(Foo, JSON.parse("{\"name\":\"Steph\"}"))))), React.createElement(Foo, _extends(JSON.parse("{\"x\":1}"), spread)), React.createElement(Foo, _extends(JSON.parse("{}"), spread, JSON.parse("{\"x\":1}"))));
