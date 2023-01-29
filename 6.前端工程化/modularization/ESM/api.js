import handle from './handle.js';

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

export default {
  x,
  setX,
  getX,
  api,
  handle
}