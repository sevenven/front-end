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

class Promise {
  constructor(executor) {
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
  then(onResolved, onRejected) {
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

      if (this.promiseState === "fulfilled") {
        onCallback(onResolved);
      }

      if (this.promiseState === "rejected") {
        onCallback(onRejected);
      }

      if (this.promiseState === "pending") {
        this.callbacks.push({
          onResolved: () => onCallback(onResolved),
          onRejected: () => onCallback(onRejected),
        });
      }
    });
  }
  catch(onReject) {
    return this.then(null, onReject);
  }

  static resolve(value) {
    return new Promise((resolve, reject) => {
      promiseUtil._processValueByType(value, resolve, reject);
    });
  }
  static reject(reason) {
    return new Promise((resolve, reject) => reject(reason));
  }
  static all(promises) {
    return new Promise((resolve, reject) => {
      let arr = [],
        count = 0,
        num = promises.length;
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
  }
  static race(promises) {
    return new Promise((resolve, reject) => {
      promises.forEach((promise) => {
        promise.then(
          (value) => resolve(value),
          (reason) => reject(reason)
        );
      });
    });
  }
}
