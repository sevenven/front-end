function Promise(executor) {
  this.PromiseState = 'pending';
  this.PromiseResult = null;
  this.callbacks = {}

  const resolve = (value) => {
    if (this.PromiseState !== 'pending') return;
    this.PromiseState = 'fullfilled';
    this.PromiseResult = value;
    this.callbacks.onResolved && this.callbacks.onResolved.forEach((item) => {
      item(value);
    })
  }
  const reject = (reason) => {
    if (this.PromiseState !== 'pending') return;
    this.PromiseState = 'rejected';
    this.PromiseResult = reason;
    this.callbacks.onRejected && this.callbacks.onRejected.forEach((item) => {
      item(reason);
    })
  }
  try {
    // 同步调用【执行器函数】
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

Promise.resolve = function () {

}

Promise.reject = function () {

}

Promise.prototype.then = function (onResolved, onRejected) {
  if (this.PromiseState === 'fullfilled') {
    onResolved(this.PromiseResult);
  }
  if (this.PromiseState === 'rejected') {
    onRejected(this.PromiseResult);
  }
  if (this.PromiseState === 'pending') {
    this.callbacks = {
      onResolved: this.callbacks.onResolved ? [...this.callbacks.onResolved, onResolved] : [onResolved],
      onRejected: this.callbacks.onRejected ? [...this.callbacks.onRejected, onRejected] : [onRejected]
    }
  }
}