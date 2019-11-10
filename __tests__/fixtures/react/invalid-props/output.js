let x = React.createElement(Foo, null);
x = React.createElement(Foo, spread);
x = React.createElement(Foo, {
  x: 1 + 1
});
x = React.createElement(Foo, {
  x: undefined
});
x = React.createElement(Foo, {
  x: x
});
x = React.createElement(Foo, {
  x: ok()
});
x = React.createElement(Foo, {
  x: x.y.z
});
x = React.createElement(Foo, {
  x: () => {}
});
