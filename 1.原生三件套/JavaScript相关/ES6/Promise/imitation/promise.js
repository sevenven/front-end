const promiseUtil = {
  _processValueByType(value, resolve, reject) {
    if (value instanceof Promise) {
      value.then(
        (_value) => resolve(_value),
        (_reason) => reject(_reason)
      );
    } else {
      resolve(value);
    }
  },
};

function Promise(executor) {
  this.promiseState = "pending";
  this.promiseResult = null;
  this.callbacks = [];

  const resolve = (value) => {
    if (this.promiseState !== "pending") return;
    this.promiseState = "fulfilled";
    this.promiseResult = value;

    this.callbacks.forEach((item) => item.onResolved());
  };
  const reject = (reason) => {
    if (this.promiseState !== "pending") return;
    this.promiseState = "rejected";
    this.promiseResult = reason;

    this.callbacks.forEach((item) => item.onRejected());
  };
  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

Promise.prototype.then = function (onResolved, onRejected) {
  if (typeof onResolved !== "function") onResolved = (value) => value;
  if (typeof onRejected !== "function")
    onRejected = (reason) => {
      throw reason;
    };
  return new Promise((resolve, reject) => {
    const onCallback = (callback) => {
      const result = callback(this.promiseResult);
      promiseUtil._processValueByType(result, resolve, reject);
    };

    if (this.promiseState === "fulfilled") onCallback(onResolved);

    if (this.promiseState === "rejected") onCallback(onRejected);

    if (this.promiseState === "pending") {
      this.callbacks.push({
        onResolved: () => onCallback(onResolved),
        onRejected: () => onCallback(onRejected),
      });
    }
  });
};

Promise.prototype.catch = function (onRejected) {
  return this.then(null, onReject);
};

Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    promiseUtil._processValueByType(value, resolve, reject);
  });
};

Promise.reject = function (reason) {
  return new Promise((resolve, reject) => reject(reason));
};

Promise.all = function (promises) {
  let arr = [],
    count = 0,
    num = promises.length;
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise.then(
        (value) => {
          arr.push(value);
          count++;
          if (count === num) {
            resolve(arr);
          }
        },
        (reason) => reject(reason)
      );
    });
  });
};

Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise.then(
        (value) => resolve(value),
        (reason) => reject(reason)
      );
    });
  });
};
