class Promise {
  constructor(executor) {
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    this.callbacks = {}

    const resolve = (value) => {
      if (this.PromiseState !== 'pending') return;
      this.PromiseState = 'fulfilled';
      this.PromiseResult = value;
      setTimeout(() => {
        this.callbacks.onResolved && this.callbacks.onResolved.forEach((item) => {
          item();
        })
      })
    }
    const reject = (reason) => {
      if (this.PromiseState !== 'pending') return;
      this.PromiseState = 'rejected';
      this.PromiseResult = reason;
      setTimeout(() => {
        this.callbacks.onRejected && this.callbacks.onRejected.forEach((item) => {
          item();
        })
      })
    }
    try {
      // 同步调用【执行器函数】
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then = (onResolved, onRejected) => {
    // onResolved和onRejected执行及返回值处理
    const onCallback = (resolve, reject, callBack) => {
      try {
        const result = callBack(this.PromiseResult);
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
    // onResolved传参不为函数处理
    if (typeof onResolved !== 'function') {
      onResolved = value => value;
    }
    // onRejected传参不为函数处理
    if (typeof onRejected !== 'function') {
      onRejected = reason => { throw reason }
    }
    return new Promise((resolve, reject) => {
      // 同步resolv执行及返回值处理
      if (this.PromiseState === 'fulfilled') {
        setTimeout(() => {
          onCallback(resolve, reject, onResolved);
        })
      }
      // 同步reject执行及返回值处理
      if (this.PromiseState === 'rejected') {
        setTimeout(() => {
          onCallback(resolve, reject, onRejected);
        })
      }
      // 异步resolv和reject执行及返回值处理
      if (this.PromiseState === 'pending') {
        this.callbacks = {
          onResolved: this.callbacks.onResolved ? [...this.callbacks.onResolved, () => {
            onCallback(resolve, reject, onResolved);
          }] : [() => {
            onCallback(resolve, reject, onResolved);
          }],
          onRejected: this.callbacks.onRejected ? [...this.callbacks.onRejected, () => {
            onCallback(resolve, reject, onRejected);
          }] : [() => {
            onCallback(resolve, reject, onRejected);
          }]
        }
      }
    })
  }

  .catch = (onRejected) => {
    return this.then(undefined, onRejected);
  }

  static resolve = (value) => {
    return new Promise((resolve, reject) => {
      if (value instanceof Promise) {
        value.then(v => {
          resolve(v);
        }, r => {
          reject(r);
        })
      } else {
        resolve(value);
      }
    })
  }

  static reject = (reason) => {
    return new Promise((resolve, reject) => {
      reject(reason);
    })
  }

  static all = (promises) => {
    return new Promise((resolve, reject) => {
      let count = 0;
      let arr = [];
      for(let i = 0; i < promises.length; i++) {
        promises[i].then(v => {
          // 得知对象的状态是fulfilled
          count++;
          arr[i] = v;
          if (count === promises.length) {
            resolve(arr);
          }
        }, r => {
          // 得知对象的状态是rejectd
          reject();
        })
      }
    })
  }

  static race = (promises) => {
    return new Promise((resolve, reject) => {
      for(let i = 0; i < promises.length; i++) {
        promises[i].then(v => {
          resolve(v);
        }, r => {
          // 得知对象的状态是rejectd
          reject();
        })
      }
    })

}