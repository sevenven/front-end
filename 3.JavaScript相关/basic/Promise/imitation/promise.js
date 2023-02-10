function Promise(executor) {
  this.PromiseState = 'pending';
  this.PromiseResult = null;
  // 保存onResolved、onRejected回调
  this.callbacks = [];

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
  } catch (e) { // executor抛出异常处理 
    reject(e);
  }
}

Promise.prototype.then = function (onResolved, onRejected) {
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
        onResolved: () => { onCallback(resolve, reject, onResolved); },
        onRejected: () => { onCallback(resolve, reject, onRejected); }
      })
    }
  })
}

Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected);
}

Promise.resolve = function (value) {
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

Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason);
  })
}

Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let count = 0,
      length = promises.length,
      arr = [];
    for (let i = 0; i < length; i++) {
      promises[i].then(value => {
        // 得知对象的状态是fulfilled
        count++;
        arr[i] = value;
        if (count === length) {
          resolve(arr);
        }
      }, reason => {
        // 得知对象的状态是rejectd
        reject(reason);
      })
    }
  })
}

Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(value => {
        resolve(value);
      }, reason => {
        // 得知对象的状态是rejectd
        reject(reason);
      })
    }
  })
}