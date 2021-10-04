
import { Deletion, Placement, Update } from "./const";

// fiber根节点
let workInProgressRoot = null;
// 存储fiber更节点
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
function performUnitOfWork(workInProgress) {
  const { type } = workInProgress;
  if (typeof type === 'string') { // 原生标签节点
    updateHostCpmponent(workInProgress)
  } else if (typeof type === 'symbol') { // fragment节点
    updateFragmentComponent(workInProgress);
  } else if (typeof type === 'function') {
    type.prototype.isReactComponent ? updateClassComponent(workInProgress) : updateFunctionComponent(workInProgress);
  }
  if (workInProgress.child) {
    return workInProgress.child;
  }
  let nextFiber = workInProgress;
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
function commitWorker(workInProgress) {
  if (!workInProgress) return;
  let parentNodeFiber = workInProgress.return;
  while (!parentNodeFiber.stateNode) {
    parentNodeFiber = parentNodeFiber.return;
  }
  let parentNode = parentNodeFiber.stateNode;
  if (workInProgress.flags & Placement && workInProgress.stateNode) { // 新增
    parentNode.appendChild(workInProgress.stateNode)
  } else if (workInProgress.flags & Update && workInProgress.stateNode) { // 修改

  } else if (workInProgress.flags & Deletion && workInProgress.stateNode) { // 删除

  }
  commitWorker(workInProgress.child);
  commitWorker(workInProgress.sibling);
}

// 原生标签节点处理
function updateHostCpmponent(workInProgress) {
  if (!workInProgress.stateNode) {
    workInProgress.stateNode = createNode(workInProgress);
  }
  reconcileChildren(workInProgress, workInProgress.props.children);
}

// fragment节点处理
function updateFragmentComponent(workInProgress) {
  reconcileChildren(workInProgress, workInProgress.props.children);
}

// 函数组件处理
function updateFunctionComponent(workInProgress) {
  workInProgressFiber = workInProgress;
  workInProgressFiber.hooks = [];
  workInProgressFiber.hookIndex = 0;
  const { type, props } = workInProgress;
  const child = type(props);
  reconcileChildren(workInProgress, child)
}

// 类组件处理
function updateClassComponent(workInProgress) {
  const { type, props } = workInProgress;
  const instance = new type(props);
  const child = instance.render();
  reconcileChildren(workInProgress, child)
}

// 从虚拟dom变成真实dom
function createNode(workInProgress) {
  const { type, props } = workInProgress;
  const node = document.createElement(type);
  updateNode(node, props);
  return node;
}

// 给节点添加属性
function updateNode(node, props) {
  Object.keys(props).forEach(prop => {
    if (prop === 'children') {
      if (isStringOrNumber(props[prop])) {
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
function reconcileChildren(workInProgress, children) {
  if (isStringOrNumber(children)) return;
  const newChildren = Array.isArray(children) ? children : [children];
  let prevFiber = null;
  let oldFiber = workInProgress.alternate && workInProgress.alternate.child;
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
        return: workInProgress,
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
      workInProgress.child = newFiber;
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