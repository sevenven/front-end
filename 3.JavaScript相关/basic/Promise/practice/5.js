const util = require('util');
const fs = require('fs');

let mineReadFile = util.promisify(fs.readFile);

mineReadFile('./resource.txt').then(value => {
  console.log(value.toString());
}, reason => {
  console.warn(reason);
});