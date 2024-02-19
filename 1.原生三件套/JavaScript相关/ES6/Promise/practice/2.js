const fs = require("fs");

// 回调形式
// fs.readFile("./assets/liyingying.txt", (err, data) => {
//   if (err) throw err;
//   console.log(data.toString());
// });

// Promise形式
let p = new Promise((resolve, reject) => {
  fs.readFile("./assets/liyingying.txt", (err, data) => {
    if (err) reject(err);
    resolve(data);
  });
});

p.then(
  (value) => {
    console.log(value.toString());
  },
  (reason) => {
    console.warn(reason);
  }
);
