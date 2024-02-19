const obj = {
  name: "seven",
  address: {
    city: "chengdu",
  },
  arr: ["a", "b", "c", , { d: 4, e: 5 }],
  [Symbol("age")]: 20,
  set: new Set([1, 2, 3]),
  map: new Map([
    ["a", 1],
    ["b", 2],
  ]),
};

// 方案一
// const obj2 = JSON.parse(JSON.stringify(obj));
// obj2.address.city = "mianyang"

// console.log(obj)
// console.log(obj2)

// 方案二
/**
 * 深拷贝
 * @param {Object} obj 深拷贝对象
 */
function deepClone(obj) {
  if (typeof obj !== "object" || obj == null) return obj;

  let result;
  if (obj instanceof Array) {
    result = [];
    for (let i = 0; i < obj.length; i++) result[i] = deepClone(obj[i]);
  } else if (obj instanceof Set) {
    result = new Set([...obj]);
  } else if (obj instanceof Map) {
    result = new Map([...obj]);
  } else {
    result = {};
    Reflect.ownKeys(obj).forEach((key) => {
      result[key] = deepClone(obj[key]);
    });
  }
  return result;
}

const obj3 = deepClone(obj);
obj3.address.city = "mianyang";

console.log(obj);
console.log(obj3);
