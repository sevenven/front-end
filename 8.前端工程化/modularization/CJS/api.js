const handle = require('./handle')

const x = 5;

function setX(val) {
  x = val;
}

function getX() {
  return x;
}

function api() {
  return {
    code: 200,
    data: {
      a: 1,
      b: 2
    }
  }
}




module.exports = {
  x,
  setX,
  getX,
  api,
  handle
}
// exports.api = api;
// exports.handle = handle;
