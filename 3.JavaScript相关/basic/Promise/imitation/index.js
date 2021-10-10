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

Promise.resolve = function (value) {

}

Promise.reject = function (reason) {

}

Promise.prototype.then = function (onResolved, onRejected) {
  // resolv执行及返回值处理
  const onResolvedCallback = (resolve, reject) => {
    try {
      const result = onResolved(this.PromiseResult);
      if (result instanceof Promise) {
        result.then(value => {
          resolve(value);
        }, reason => {
          reject(reason);
        })
      } else {
        resolve(result);
      }
    } catch (e) {
      reject(e);
    }
  }
  // rreject执行及返回值处理
  const onRejectedCallback = (resolve, reject) => {
    try {
      const result = onRejected(this.PromiseResult);
      if (result instanceof Promise) {
        result.then(value => {
          resolve(value);
        }, reason => {
          reject(reason);
        })
      } else {
        reject(result);
      }
    } catch (e) {
      reject(e);
    }
  }
  return new Promise((resolve, reject) => {
    // 同步resolv执行及返回值处理
    if (this.PromiseState === 'fullfilled') {
      onResolvedCallback(resolve, reject);
    }
    // 同步reject执行及返回值处理
    if (this.PromiseState === 'rejected') {
      onRejectedCallback(resolve, reject);
    }
    // 异步resolv和reject执行及返回值处理
    if (this.PromiseState === 'pending') {
      this.callbacks = {
        onResolved: this.callbacks.onResolved ? [...this.callbacks.onResolved, () => {
          onResolvedCallback(resolve, reject)
        }] : [() => {
          onResolvedCallback(resolve, reject)
        }],
        onRejected: this.callbacks.onRejected ? [...this.callbacks.onRejected, () => {
          onRejectedCallback(resolve, reject)
        }] : [() => {
          onRejectedCallback(resolve, reject)
        }]
      }
    }
  })
}