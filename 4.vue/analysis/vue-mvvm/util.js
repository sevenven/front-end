const getVMVal = (vm, exp) => {
  var val = vm.$data;
  exp = exp.split(".");
  exp.forEach((key) => {
    val = val[key];
  });
  return val;
};

// 设置exp在vm.$data中对应的值
const setVMVal = (vm, exp, newVal) => {
  var val = vm.$data;
  exp = exp.split(".");
  exp.forEach((key, index) => {
    if (index < exp.length - 1) val = val[key];
    else val[key] = newVal;
  });
};
