let x = <Foo />;
x = <Foo {...spread} />;
x = <Foo x={1 + 1} />;
x = <Foo x={undefined} />;
x = <Foo x={x} />;
x = <Foo x={ok()} />;
x = <Foo x={x.y.z} />;
x = <Foo x={() => {}} />;
