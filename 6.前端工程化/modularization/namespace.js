
window.__Module = {
  api() {
    return {
      code: 200,
      data: {
        a: 1,
        b: 2
      }
    }
  },
  handle(data, key) {
    return data.data[key];
  },

  sum(a, b) {
    return a + b;
  },
}