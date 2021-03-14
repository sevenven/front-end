// 柯里化之前
function add(x, y) {
  return x + y;
}
add(1, 2);

// 柯里化之后
function addX(x) {
  return function (y) {
    return x + y;
  }
}
addX(1)(2);