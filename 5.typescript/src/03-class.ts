class Sup {
  private _foo = "foo"; // 私有属性 不能在类的外部访问
  protected bar = "bar"; // 保护属性 可以在子类中访问

  // 构造函数参数加修饰符，能够定义为成员属性
  constructor (public tua = "tua") {}

  // 方法也有修饰符
  private someMethod () {}

  // 存储器 重新定义属性访问与修改逻辑
  get foo () {
    return this._foo + '123';
  }

  set foo (val) {
    this.foo = val + '123';
  }
}

class Sub extends Sup {
  someVal () {
    this.bar;
    this.tua;
    this.foo;
  }
}