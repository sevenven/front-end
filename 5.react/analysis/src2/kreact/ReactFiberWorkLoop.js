import {
  Deletion,
  isFn,
  isStr,
  LANE,
  NoContext,
  NoFlags,
  Placement,
  Update,
  updateNode,
  BatchedContext,
  HookPassive,
} from "./utils";
import {shouldYield, scheduleWork} from "./scheduler";
import {schedule} from "./scheduler";
import {
  updateHostComponent,
  updateFunctionComponent,
} from "./ReactFiberReconciler";

// 记录根节点
let workInProgressRoot = null;

export function scheduleUpdateOnFiber(fiber) {
  if (fiber && !(fiber.lane & LANE.DIRTY)) {
    fiber.alternate = {...fiber};
    fiber.lane = LANE.DIRTY;
    fiber.flags = Update;
    fiber.sibling = null;
    scheduleWork(workLoop, fiber);
  }
}

function workLoop(wip) {
  while (wip && !shouldYield()) {
    wip = performUnitOfWork(wip);
  }
  if (wip) {
    console.log("omg"); //sy-log
  }

  if (workInProgressRoot) {
    commitRoot(workInProgressRoot);
  }
}

function performUnitOfWork(wip) {
  const {type} = wip;
  if (isFn(type)) {
    updateFunctionComponent(wip);
  } else if (isStr(type)) {
    updateHostComponent(wip);
  }

  // 更新完之后， 把老节点存alternate
  // wip.alternate = tem;

  if (wip.child) {
    return wip.child;
  }
  while (wip) {
    if (!workInProgressRoot && wip.lane & LANE.DIRTY) {
      console.log("wi----p", wip); //sy-log
      // if (!workInProgressRoot && wip === workInProgressRoot) {
      console.log("stop"); //sy-log
      workInProgressRoot = wip;
      wip.lane &= ~LANE.DIRTY;
      return null;
    }
    if (wip.sibling) {
      return wip.sibling;
    }
    wip = wip.return;
  }
}

function commitRoot(fiber) {
  // 这个地方考虑是根组件更新还是函数组件
  // 如果是根组件，那container层不需要更新，从子节点就行了
  // 如果是函数组件，如执行setState,那就要从函数组件开始更新了
  fiber.return ? commit(fiber) : commit(fiber.child);
  // workInProgressRoot = null;
  workInProgressRoot = null;
}

function getParentNode(fiber) {
  while (fiber) {
    if (fiber.return.stateNode) {
      return fiber.return.stateNode;
    }
    fiber = fiber.return;
  }
  return null;
}

function invokeHooks(fiber) {
  const {updateQueue, layout, flags} = fiber;

  if (updateQueue && updateQueue.length > 0) {
    const updateQueueOfPassive = [];

    for (let i = 0; i < updateQueue.length; i++) {
      const effect = updateQueue[i];
      if (effect.hookFlags & HookPassive) {
        updateQueueOfPassive.push(effect);
      } else {
        effect.create();
      }
    }
    schedule(() => {
      for (let i = 0; i < updateQueueOfPassive.length; i++) {
        const effect = updateQueueOfPassive[i];
        effect.create();
      }
      fiber.updateQueue = null;
    });
  }
  // if (hooks) {
  //   if (flags & Deletion) {
  //     hooks.list.forEach((e) => e[2] && e[2]());
  //   } else {
  //     console.log("hooks", hooks); //sy-log
  //     side(hooks.layout);
  //     schedule(() => {
  //       side(hooks.effect);
  //     });
  //   }
  // }
}

function commit(wip) {
  if (!wip) {
    return;
  }

  const {type, flags, stateNode} = wip;
  if (isFn(type)) {
    invokeHooks(wip);
    // return;
  }

  let parentNode = getParentNode(wip);

  if (flags & Deletion) {
    console.log("Deletion"); //sy-log
    parentNode.removeChild(stateNode);
    wip.lane = 0;
    // return;
  }

  if (stateNode && flags & Update) {
    updateNode(stateNode, wip.alternate.props, wip.props);
  }

  if (stateNode && flags & Placement) {
    parentNode.insertBefore(wip.stateNode, wip.sibling?.node);
  }

  wip.lane = 0;
  wip.flags = NoFlags;
  commit(wip.child);
  commit(wip.sibling);
}
