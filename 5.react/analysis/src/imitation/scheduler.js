const queue = [];
let deadline = 0;
const threshold = 1000 / 60;
const unit = [];

export function scheduleWork(callback, fiber) {
  const job = {callback, fiber};
  queue.push(job);
  schedule(flushWork);
}

export function schedule(callback) {
  const onlyOneUnit = unit.push(callback) === 1;
  return onlyOneUnit && postMessage();
}

const postMessage = (() => {
  const {port1, port2} = new MessageChannel();
  port1.onmessage = () => {
    // 相当于把unit数据复制到tem中，同时清空unit
    let tem = unit.splice(0, unit.length);
    tem.forEach((c) => c());
  };
  return () => port2.postMessage(null);
})();

// 开始更新
function flushWork() {
  deadline = getTime() + threshold;
  let job = queue[0];
  while (job && !shouldYield()) {
    const {callback, fiber} = job;
    job.callback = null;
    const next = callback(fiber);
    if (next) {
      job.callback = next;
    } else {
      queue.shift();
    }
    job = queue[0];
  }
}

export function shouldYield() {
  return getTime() >= deadline;
}

export function getTime() {
  return performance.now();
}
