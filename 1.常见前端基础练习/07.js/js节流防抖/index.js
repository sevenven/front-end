// 节流
function throttle (fn, delay) {
  let valid = true;
  return function () {
    if (!valid) return;
    valid = false;
    setTimeout(function () {
      fn();
      valid = true;
    }, delay)
  }
} 

window.onscroll = throttle(function () {
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  console.log('滚动条位置：' + scrollTop);
}, 200)


// 防抖
function debounce (fn, delay) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn, delay);
  }
}

window.onscroll = debounce(function () {
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  console.log('滚动条位置：' + scrollTop);
}, 200)