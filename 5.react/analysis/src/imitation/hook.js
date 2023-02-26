import { Passive, Layout, HookPassive, HookLayout, Update } from "./utils";
import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop";
import { areHookInputsEqual, isFn } from "./utils";

let currentHook = null;
let workInProgressHook = null;
let currentlyRenderingFiber = null;

export function renderHooks(fiber) {
  currentlyRenderingFiber = fiber;
  currentlyRenderingFiber.memoizedState = null;
  currentlyRenderingFiber.updateQueue = null;
  workInProgressHook = null;
}

function updateWorkInProgressHook() {
  let hook;

  if (currentlyRenderingFiber.alternate) {
    // 不是初次渲染

    const current = currentlyRenderingFiber.alternate;

    currentlyRenderingFiber.memoizedState = current.memoizedState;

    if (workInProgressHook) {
      hook = workInProgressHook = workInProgressHook.next;
      currentHook = currentHook.next;
    } else {
      hook = workInProgressHook = currentlyRenderingFiber.memoizedState;
      currentHook = current.memoizedState;
    }
  } else {
    // 初次渲染
    hook = { memoizedState: null, queue: [], next: null };

    if (workInProgressHook) {
      workInProgressHook = workInProgressHook.next = hook;
    } else {
      currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
    }
  }

  return hook;
}

export function useState(initalState) {
  return useReducer(null, initalState);
}

export function useReducer(reducer, initalState) {
  const hook = updateWorkInProgressHook();

  if (!currentlyRenderingFiber.alternate) {
    hook.memoizedState = initalState;
  }

  const dispatch = (action) => {
    hook.memoizedState = reducer ? reducer(hook.memoizedState, action) : (isFn(action) ? action(hook.memoizedState) : action);
    scheduleUpdateOnFiber(currentlyRenderingFiber);
  };

  return [hook.memoizedState, dispatch];
}

export function useEffect(create, deps) {
  return updateEffectImpl(Passive, HookPassive, create, deps);
}

export function useLayoutEffect(create, deps) {
  return updateEffectImpl(Update, HookLayout, create, deps);
}

function updateEffectImpl(fiberFlags, hookFlags, create, deps) {
  let hook = updateWorkInProgressHook();

  const nextDeps = deps === undefined ? null : deps;

  if (currentHook !== null) {
    const prevEffect = currentHook.memoizedState;
    if (nextDeps !== null) {
      const prevDeps = prevEffect.deps;
      if (areHookInputsEqual(nextDeps, prevDeps)) {
        // 依赖未发生改变，则不更新
        return;
      }
    }
  }

  // 标记更新，如passive或者layout
  currentlyRenderingFiber.flags |= fiberFlags;
  const effect = { hookFlags, create, deps: nextDeps };

  hook.memoizedState = effect;

  if (!currentlyRenderingFiber.updateQueue) {
    currentlyRenderingFiber.updateQueue = [effect];
  } else {
    currentlyRenderingFiber.updateQueue.push(effect);
  }
}
