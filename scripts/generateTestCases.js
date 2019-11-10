// Usage:
// $ SAMPLE_SIZE=200 node generateTestCases.js
const fs = require("fs");
const path = require("path");
const { gen, sample } = require("testcheck");

const SIZE = process.env.SAMPLE_SIZE ? +process.env.SAMPLE_SIZE : 100;

const TARGET_FOLDER = path.join(
  __dirname,
  "..",
  "__tests__",
  "fixtures",
  "generative",
  `valid-generative-${SIZE}`
);

const TARGET_FILE = path.join(TARGET_FOLDER, "input.js");

if (fs.existsSync(TARGET_FILE)) {
  console.log(`Aborting: ${TARGET_FILE} already exists.`);
  return;
}

console.log(`Generating ${SIZE} test cases...`);

const stringifiedSample = JSON.stringify(sample(gen.JSONValue, SIZE));

const generatedInput = `const { wrapInArray } = require("../../../utils");

module.exports = wrapInArray(${stringifiedSample.substring(
  // "[1,2,3]" becomes "1,2,3"
  1,
  stringifiedSample.length - 1
)})`;

fs.mkdirSync(TARGET_FOLDER, { recursive: true });
fs.writeFileSync(TARGET_FILE, generatedInput);

console.log(`Done! See ${TARGET_FILE}.`);
