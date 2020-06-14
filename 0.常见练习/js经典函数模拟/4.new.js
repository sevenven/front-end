/*
1.可以访问构造函数的属性
2.可以访问构造函数.prototype的属性
*/

function objectFactory () {
  var obj = {},
      constructor = Array.prototype.shift.call(arguments),
      res;
  obj.__proto__ = constructor.prototype;
  res = constructor.apply(obj, arguments);
  return Object.prototype.toString.call(res) === '[object Object]' ? res : obj;
}

function Bar (name, age, gender) {
	this.name = name;
	this.age = age;
	this.gender = gender;
	// return {
	// 	bobo: 'bobo',
	// 	zanzan: 'zanzan'
	// }
}
Bar.prototype.job = 'IT';
Bar.prototype.sayHi = function () {
	console.log('hi~ ' + this.name);
}

var bar = objectFactory(Bar, 'seven', 25, 'female');
console.log(bar.name, bar.age, bar.gender);
console.log(bar.bobo, bar.zanzan);
bar.sayHi();