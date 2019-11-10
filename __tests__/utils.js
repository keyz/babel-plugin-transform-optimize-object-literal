// Literal arrays will be compiled away so we need a wrapper here for tests
function wrapInArray(...args) {
  return [...args];
}

module.exports = {
  wrapInArray
};
