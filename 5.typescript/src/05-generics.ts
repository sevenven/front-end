// 接口使用泛型
interface Result<T> {
  ok: 0 | 1,
  data: T
}

// 泛型方法
function getResult<T>(data: T): Result<T> {
  return {ok: 1, data}
}

// 用尖括号方式指定T为string
getResult<string>("hello")
// 用类型推定指定T为number
getResult(1)

// 进一步约束类型变量
interface Foo {
  foo: string
}

function getResult2<T extends Foo>(data: T): Result<T> {
  return { ok: 1, data }
}
getResult2({ foo: 'foo', bar: 'bar' })