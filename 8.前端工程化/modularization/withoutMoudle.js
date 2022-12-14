function api () {
  return {
    code: 200,
    data: {
      a: 1,
      b: 2
    }
  }
}

function handle (data, key) {
  return data.data[key];
}

function sum (a, b) {
  return a + b;
}