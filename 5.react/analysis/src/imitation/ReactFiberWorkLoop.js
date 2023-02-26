import {
  updateFragmentComponent,
  updateFunctionComponent,
  updateClassComponent,
  updateHostComponent,
} from "./ReactFiberReconciler";
import { isStr, isFn } from "./utils";

// fiber根节点 work in propgress 当前正在工作当中的fiber节点
let workInProgressRoot = null;
// 将要处理的下一个fiber节点
let nextUnitOfWork = null;

// 处理更新
export function scheduleUpdateOnFiber(fiber) {
  workInProgressRoot = fiber;
  workInProgressRoot.sibling = null;
  nextUnitOfWork = workInProgressRoot;
}

// 浏览器空闲时会调用该回调函数
requestIdleCallback(workLoop);

// 浏览器空闲时循环更新fiber
function workLoop(IdleDeadline) {
  // 有下一个需要更新的fiber节点且浏览器有空闲时间
  while (nextUnitOfWork && IdleDeadline.timeRemaining() > 0) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  // 没有下一个需要处理的fiber节点
  if (!nextUnitOfWork && workInProgressRoot) {
    // 提交->挂载
    commitRoot();
  }
}

function performUnitOfWork(fiber) {
  // 1. 更新自己
  const { type } = fiber;
  if (isStr(type)) {// 原生标签
    updateHostComponent(fiber);
  } else if (isFn(type)) { // 函数组件
    type.prototype.isReactComponent ? updateClassComponent(fiber) : updateFunctionComponent(fiber);
  } else { // fragment
    updateFragmentComponent(fiber);
  }

  // 2. 返回下一个要更新的fiber
  // 深度优先遍历-王朝的故事
  if (fiber.child) {
    return fiber.child;
  }
  let next = fiber;
  while (next) {
    if (next.sibling) {
      return next.sibling;
    }
    next = next.return;
  }
  return null;
}

// 提交->挂载
function commitRoot() {
  commitWorker(workInProgressRoot.child);
}

// 找父dom节点
function getParentNode(fiber) {
  let parentFiber = fiber.return;
  while (!parentFiber.stateNode) {
    parentFiber = parentFiber.return;
  }
  return parentFiber.stateNode;
}

// 递归挂载
function commitWorker(fiber) {
  if (!fiber) {
    return;
  }
  const { stateNode } = fiber;

  // 父dom节点
  let parentNode = getParentNode(fiber); //fiber.return.stateNode;
  // 1.挂载自己
  if (stateNode) {
    parentNode.appendChild(stateNode);
  }
  // 2.挂载孩子
  commitWorker(fiber.child);
  // 3.挂载下一个兄弟
  commitWorker(fiber.sibling);
}
