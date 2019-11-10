# babel-plugin-transform-optimize-object-literal

Because I heard `JSON.parse` is blazing fast https://v8.dev/blog/cost-of-javascript-2019#json

Input:

```javascript
const foo = { a: "3", d: "f" };
const bar = [1, 4, -2, true, false, {}, "ok"];
```

Output:

```javascript
const foo = JSON.parse('{"a":"3","d":"f"}');
const bar = JSON.parse('[1,4,-2,true,false,{},"ok"]');
```

## Usage

```
yarn add -D babel-plugin-transform-optimize-object-literal
```

`.babelrc`:

```json
{
  "plugins": [
    [
      "babel-plugin-transform-optimize-object-literal",
      {
        "skipArrayOptimizationIfLengthIsBelow": 0,
        "skipObjectOptimizationIfLengthIsBelow": 0
      }
    ]
  ]
}
```
