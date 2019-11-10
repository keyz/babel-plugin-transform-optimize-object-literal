const { wrapInArray } = require("../../../utils");

module.exports = wrapInArray(
  <Foo yes />,
  <Foo yes>barbar</Foo>,
  <Foo name="Tom" />,
  <Foo
    name="Tom"
    age={22}
    yes
    no={false}
    nothing={null}
    data1={[1, 2, { ok: true }]}
    data2={{
      foo: "bar",
      lol: "ok"
    }}
  />,
  <Foo name="Tom">
    <Foo name="James">
      <Foo name="Mary">
        <Foo name="Steph"></Foo>
      </Foo>
    </Foo>
  </Foo>,
  <Foo x={1} {...spread} />,
  <Foo {...spread} x={1} />
);
