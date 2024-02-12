
/**
 * 深拷贝
 * @param {Object} obj 深拷贝对象
 */
function deepClone(obj) {
  if (typeof obj !== 'object' || obj == null) return obj;

  let result = {};
  if (obj instanceof Array) {
    result = [];
  } else {
    result = {}
  }
  for (let key in obj) {
    // 保证key不是原型链上的属性
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key])
    }
  }
  return result;
}

const obj = {
  age: 20,
  name: 'seven',
  address: {
    city: 'chengdu'
  },
  arr: ['a', 'b', 'c']
}

const obj2 = obj;
obj2.address.city = 'chongqing';
console.log(obj2.address, obj.address)

const obj3 = deepClone(obj)
obj3.address.city = 'chengdu';
console.log(obj3.address, obj.address)


