class Promise {
  constructor(executor) {
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    this.callbacks = {}

    const resolve = (value) => {
      if (this.PromiseState !== 'pending') return;
      this.PromiseState = 'fulfilled';
      this.PromiseResult = value;
      // 先定义回调再改变状态，改变状态立即执行回调
      setTimeout(() => { // 异步调用【回调】
        this.callbacks.forEach((item) => {
          item.onResolved();
        })
      })
    }
    const reject = (reason) => {
      if (this.PromiseState !== 'pending') return;
      this.PromiseState = 'rejected';
      this.PromiseResult = reason;
      // 先定义回调再改变状态，改变状态立即执行回调
      setTimeout(() => {
        this.callbacks.forEach((item) => {
          item.onRejected();
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
    // onResolved传参不为函数处理
    if (typeof onResolved !== 'function') {
      onResolved = value => value;
    }
    // onRejected传参不为函数处理--重要！异常穿透需要
    if (typeof onRejected !== 'function') {
      onRejected = reason => { throw reason }
    }
    return new Promise((resolve, reject) => {
      // then返回的promise的state和result->由onResolved和onRejected执行的返回结果决定
      const onCallback = (type) => {
        try {
          const result = type(this.PromiseResult);
          if (result instanceof Promise) {
            result.then(value => {
              resolve(value);
            }, reason => {
              reject(reason);
            })
          } else {
            resolve(result);
          }
        } catch (e) { // 回调函数抛出异常处理
          reject(e);
        }
      }
      // 先改变状态再定义回调，定义回调的时候立即执行回调
      if (this.PromiseState === 'fulfilled' || this.PromiseState === 'rejected') {
        setTimeout(() => {
          onCallback(resolve, reject, this.PromiseState === 'fulfilled' ? onResolved : onRejected);
        })
      }
      // 先定义回调再改变状态，对回调函数做一个存储处理
      if (this.PromiseState === 'pending') {
        this.callbacks.push({
          onResolved: () => {
            onCallback(resolve, reject, onResolved);
          },
          onRejected: () => {
            onCallback(resolve, reject, onRejected);
          }
        })
      }
    })
  }

  catch = (onRejected) => {
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
      for (let i = 0; i < promises.length; i++) {
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
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(v => {
          resolve(v);
        }, r => {
          // 得知对象的状态是rejectd
          reject();
        })
      }
    })
  }

}