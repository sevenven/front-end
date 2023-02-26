import { createFiber } from "./fiber";
import { renderHooks } from "./hook";
import { Deletion, Placement, Update, isStringOrNumber, isArray, updateNode } from "./utils";

export function updateHostComponent(fiber) {
  if (!fiber.stateNode) {
    fiber.stateNode = document.createElement(fiber.type);
    // 更新属性
    updateNode(fiber.stateNode, {}, fiber.props);
  }

  reconcileChildren(fiber, fiber.props.children);
  console.log("fiber", fiber); //sy-log
}

// 函数组件
export function updateFunctionComponent(fiber) {
  renderHooks(fiber);

  const { type, props } = fiber;
  const children = type(props);
  reconcileChildren(fiber, children);
}

// 类组件处理
export function updateClassComponent(fiber) {
  const { type, props } = fiber;
  const instance = new type(props);
  const child = instance.render();
  reconcileChildren(fiber, child)
  // console.log('fiber~~~', fiber)
}

// Fragment处理
export function updateFragmentComponent(fiber) {
  reconcileChildren(fiber, fiber.props.children);
}

// function reconcileChildren(returnFiber, children) {
//   // 文本节点不需要进行协调
//   if (isStringOrNumber(children)) {
//     return;
//   }
//   const newChildren = Array.isArray(children) ? children : [children];

//   let previousFiber = null;
//   for (let i = 0; i < newChildren.length; i++) {
//     const newChild = newChildren[i];
//     const newFiber = createFiber(newChild, returnFiber);

//     if (previousFiber === null) {
//       returnFiber.child = newFiber;
//     } else {
//       previousFiber.sibling = newFiber;
//     }

//     previousFiber = newFiber;
//   }
// }

// 协调处理子节点
export function reconcileChildren(returnFiber, children) {
  // 文本节点不需要进行协调
  if (isStringOrNumber(children)) {
    return;
  }

  if (children === undefined) {
    return;
  }

  const newChildren = isArray(children) ? children : [children];
  let previousNewFiber = null;
  let oldFiber = (returnFiber.alternate && returnFiber.alternate.child) || null;

  for (let i = 0; i < newChildren.length; i++) {
    const newChild = newChildren[i];
    let newFiber = createFiber(newChild, { return: returnFiber });
    let same = sameNode(newChild, oldFiber);
    if (same) {
      // 更新
      Object.assign(newFiber, {
        alternate: oldFiber,
        stateNode: oldFiber.stateNode,
        flags: Update,
      });
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }
    if (previousNewFiber === null) {
      returnFiber.child = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }
    previousNewFiber = newFiber;
  }
}

// 是不是同一个节点 调用前提是统一层级下
function sameNode(a, b) {
  return !!(a && b && a.key === b.key && a.type === b.type);
}
