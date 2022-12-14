(function (global) {

  var x = 5;

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

  function handle(data, key) {
    return data.data[key];
  }

  global.__Module_API = {
    setX,
    getX,
    api,
    handle,
  }
  
})(window)