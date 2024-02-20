// 节流
function throttle(fn, deley) {
  let timer = null;
  return (...args) => {
    if (timer) return;
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, deley);
  };
}

window.onscroll = throttle((e) => {
  const scrollTop =
    document.body.scrollTop || document.documentElement.scrollTop;
  console.log("滚动条位置：" + scrollTop);
  console.log("e.target: " + e.target);
}, 200);

// 防抖
function debounce(fn, delay) {
  let timer = null;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

window.onscroll = debounce((e) => {
  const scrollTop =
    document.body.scrollTop || document.documentElement.scrollTop;
  console.log("滚动条位置：" + scrollTop);
  console.log("e.target: " + e.target);
}, 500);
