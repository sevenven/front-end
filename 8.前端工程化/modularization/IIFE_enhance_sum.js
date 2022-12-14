(function (global, api) {

  function sum(a, b) {
    return a + b;
  }

  global.__Module = {
    sum,
    api
  }
  
})(window, window.__Module_API)