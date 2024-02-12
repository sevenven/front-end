function jQuery(selector) {
  const result = document.querySelectorAll(selector);
  const length = result.length;
  for (var i = 0; i < length; i++) {
    this[i] = result[i];
  }
  this.length = length;
  this.selector = selector;
}

jQuery.prototype.get = function (index) {
  return this[index];
}

jQuery.prototype.each = function (fn) {
  for (var i = 0; i < this.length; i++) {
    fn(this[i])
  }
}

jQuery.prototype.on = function (type, fn) {
  return this.each(elem => {
    elem.addEventListener(type, fn, false)
  })
}

// 插件
jQuery.prototype.dialog = function (info) {
  alert(info)
}

// 造轮子
function myJQuery(selector) {
  jQuery.call(this, selector)
}

myJQuery.prototype = new jQuery();
myJQuery.prototype.constructor = myJQuery;

myJQuery.prototype.addClass = function (className) {
  // ...
}

