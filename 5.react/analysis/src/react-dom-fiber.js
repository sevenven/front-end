
import { Deletion, Placement, Update } from "./const";

// fiber根节点
let workInProgressRoot = null;
// 存储fiber根节点
let currentRoot = null;
// 下一个fiber任务
let nextUnitOfWork = null;
// 当前的fiber节点
let workInProgressFiber = null;

// ReactDOM渲染函数
function render(vnode, container) {
  workInProgressRoot = {
    type: 'div',
    props: {
      children: { ...vnode }
    },
    stateNode: container,
  }
  nextUnitOfWork = workInProgressRoot;
}

requestIdleCallback(workLoop);

// 浏览器空闲时循环更新fiber
function workLoop(IdleDeadline) {
  while (nextUnitOfWork && IdleDeadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  // requestIdleCallback(workLoop);
  if (!nextUnitOfWork && workInProgressRoot) {
    commitRoot();
  }
}

// 浏览器空闲时更新fiber
function performUnitOfWork(fiber) {
  const { type } = fiber;
  if (typeof type === 'string') { // 原生标签节点
    updateHostCpmponent(fiber)
  } else if (typeof type === 'symbol') { // fragment节点
    updateFragmentComponent(fiber);
  } else if (typeof type === 'function') {
    type.prototype.isReactComponent ? updateClassComponent(fiber) : updateFunctionComponent(fiber);
  }
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.return;
  }
}

// 渲染rootFiber
function commitRoot() {
  commitWorker(workInProgressRoot.child);
  currentRoot = workInProgressRoot;
  workInProgressRoot = null;
}

// 递归渲染fiber
function commitWorker(fiber) {
  if (!fiber) return;
  let parentNodeFiber = fiber.return;
  while (!parentNodeFiber.stateNode) {
    parentNodeFiber = parentNodeFiber.return;
  }
  let parentNode = parentNodeFiber.stateNode;
  if (fiber.flags & Placement && fiber.stateNode) { // 新增
    parentNode.appendChild(fiber.stateNode)
  } else if (fiber.flags & Update && fiber.stateNode) { // 修改

  } else if (fiber.flags & Deletion && fiber.stateNode) { // 删除

  }
  commitWorker(fiber.child);
  commitWorker(fiber.sibling);
}

// 原生标签节点处理
function updateHostCpmponent(fiber) {
  if (!fiber.stateNode) {
    fiber.stateNode = createNode(fiber);
  }
  reconcileChildren(fiber, fiber.props.children);
}

// fragment节点处理
function updateFragmentComponent(fiber) {
  reconcileChildren(fiber, fiber.props.children);
}

// 函数组件处理
function updateFunctionComponent(fiber) {
  workInProgressFiber = fiber;
  workInProgressFiber.hooks = [];
  workInProgressFiber.hookIndex = 0;
  const { type, props } = fiber;
  const child = type(props);
  reconcileChildren(fiber, child)
}

// 类组件处理
function updateClassComponent(fiber) {
  const { type, props } = fiber;
  const instance = new type(props);
  const child = instance.render();
  reconcileChildren(fiber, child)
}

// 从虚拟dom变成真实dom
function createNode(fiber) {
  const { type, props } = fiber;
  const node = document.createElement(type);
  updateNode(node, props);
  return node;
}

// 给节点添加属性
function updateNode(node, props) {
  Object.keys(props).forEach(prop => {
    if (prop === 'children') {
      if (isStringOrNumber(props[prop])) { // 文本节点处理
        node.textContent = props[prop] + "";
      }
    } else if (prop.slice(0, 2) === "on") {
      let eventName = prop.slice(2).toLocaleLowerCase();
      node.addEventListener(eventName, props[prop]);
    } else {
      node[prop] = props[prop]
    }
  });
}

// 遍历处理子节点
function reconcileChildren(fiber, children) {
  if (isStringOrNumber(children)) return;
  const newChildren = Array.isArray(children) ? children : [children];
  let prevFiber = null;
  let oldFiber = fiber.alternate && fiber.alternate.child;
  for (let i = 0; i < newChildren.length; i++) {
    let child = newChildren[i];
    let newFiber = null;
    let same = child && oldFiber && child.key === oldFiber.key && child.type === oldFiber.type;
    if (same) { // 复用（修改）

    }
    if (!same && child) { // 新增
      // 构建fiber结构
      newFiber = {
        kay: child.key || null,
        type: child.type,
        props: { ...child.props },
        child: null,
        sibling: null,
        return: fiber,
        stateNode: null,
        alternate: null,
        flags: Placement,
      }
    }
    if (!same && oldFiber) { // 删除

    }
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }
    if (i == 0) {
      fiber.child = newFiber;
    } else {
      prevFiber.sibling = newFiber;
    }
    prevFiber = newFiber;
  }
}

function isStringOrNumber(str) {
  return typeof str === 'string' || typeof str === 'number';
}

export function useState(init) {
  const oldHook = workInProgressFiber.alternate && workInProgressFiber.alternate.hookIndex[workInProgressFiber.hookIndex];
  const hook = oldHook ? {
    state: oldHook.state,
    queue: oldHook.queue
  } : {
    state: init,
    queue: [],
  }
  // const state = init;
  hook.queue.forEach((action) => {
    // 模拟批量更新
    hook.state = action;
  });
  const setState = (action) => {
    hook.queue.push(action);
    currentRoot = {
      stateNode: currentRoot.stateNode,
      props: currentRoot.props,
      alternate: currentRoot
    }
    nextUnitOfWork = currentRoot;
  }
  workInProgressFiber.hooks.push(hook);
  workInProgressFiber.hookIndex++;
  return [hook.state, setState];
}

export default {
  render
}