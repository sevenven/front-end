// 必选参数
// 可选参数
// 默认值
function greeting (name: string, msg?: string, age=29): string {
  return "Hello, " + name;
}

greeting("xiaozhan");

// 函数重载 先声明再实现
// 声明
function watch (cb1: () => void): void;
function watch (cb1: () => void, cb2: (v1:any, v2:any) => void): void;
// 实现
function watch (cb1: () => void, cb2?: (v1:any, v2:any) => void): void {
  if (cb1 && cb2) {

  } else {

  }
}
