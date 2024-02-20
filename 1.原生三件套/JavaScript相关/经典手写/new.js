// 立即创建一个新的对象
// 将新建对象设置为函数的this&
// 执行函数中的代码
// 将新建对象作为返回值返回
// 可以访问构造函数的属性&显示原型对象

function myNew(constructor, ...args) {
  let obj = {},
    result;
  obj.__proto__ = constructor.prototype;
  result = constructor.apply(obj, args);
  return result instanceof Object ? result : obj;
}

function Bar(name, age, gender) {
  this.name = name;
  this.age = age;
  this.gender = gender;
  // return {
  // 	bobo: 'bobo',
  // 	zanzan: 'zanzan'
  // }
}
Bar.prototype.job = "IT";
Bar.prototype.sayHi = function () {
  console.log("hi~ " + this.name);
};

var bar = myNew(Bar, "seven", 25, "female");
console.log(bar.name, bar.age, bar.gender);
console.log(bar.bobo, bar.zanzan);
bar.sayHi();
