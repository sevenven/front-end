import {createFiber} from "./fiber";
import {renderHooks, resetCursor} from "./hook";
// import {getCurrentlyRenderingFiber, setCurrentFiber} from "./ReactFiberWorkLoop";
import {isArray, isStringOrNumber, Update, updateNode} from "./utils";

export function updateHostComponent(wip) {
  const {type} = wip;
  if (!wip.stateNode) {
    wip.stateNode = document.createElement(type);
    updateNode(wip.stateNode, {}, wip.props);
  }

  reconcileChildren(wip, wip.props.children);
  // console.log("wip", wip); //sy-log
}

export function updateFunctionComponent(wip) {
  renderHooks(wip);

  const {type} = wip;
  const child = type(wip.props);
  reconcileChildren(wip, child);
}

export function reconcileChildren(returnFiber, children) {
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
    let newFiber = createFiber(newChild, {return: returnFiber});
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

function sameNode(a, b) {
  return !!(a && b && a.key === b.key && a.type === b.type);
}
