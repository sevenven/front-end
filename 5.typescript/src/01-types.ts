// 基本数据类型 string number boolean null undefined symbol

// 类型注解
let var1: string
var1 = 'aa'

// 类型推断:声明时如果有值会自动推断类型
let var2 = true

// 数组
let arr: string[]
arr = ['xiaozhan', 'wangyibo']

// 元组
let tupple: [string, number]
tupple = ['seven', 26]

// 任意类型
let varAny: any
varAny = 1
varAny = 'bobozanzan'

// 函数中类型约束
function greet (name: string): string {
  return 'hello ' + name
}
greet('xiaozhan')
greet('wangyibo')
// 没有返回值
function warn (): void {}

// 对象数据类型
function fn1 (o: object) {}
fn1({age: 26})
function fn2 (o: {age: number}) {}
fn2({age: 29})
// 类型别名type 自定义类型
type info = {age: number}
// 增强可读性
function fn3 (o: info) {}
fn2({age: 23})

// 类型断言 某些情况下用户比较确定值的类型 可以直接断言
// 断言 把比较宽泛的类型断言为更具体的类型
const someValue: any = 'this is a string'
const strLength = (someValue as string).length

// 联合类型
let union: string | number
union = '1'
union = 1

// 交叉类型
type First = {first: number}
type Second = {second: number}
type FirstAndSecond = First & Second

