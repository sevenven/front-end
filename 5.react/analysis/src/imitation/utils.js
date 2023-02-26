// ! flags
export const NoFlags = /*                      */ 0b00000000000000000000;

export const Placement = /*                    */ 0b0000000000000000000010;
export const Update = /*                       */ 0b0000000000000000000100;
export const Deletion = /*                     */ 0b0000000000000000001000;
export const Passive = /*                      */ 0b0000000000010000000000;

// *******************************************************************************************

// ! executionContext
export const NoContext = /*             */ 0b0000000;
export const BatchedContext = /*               */ 0b0000001;
export const EventContext = /*                 */ 0b0000010;
export const DiscreteEventContext = /*         */ 0b0000100;
export const LegacyUnbatchedContext = /*       */ 0b0001000;
export const RenderContext = /*                */ 0b0010000;
export const CommitContext = /*                */ 0b0100000;
// export const isWorking = /*                */ 0b0100000;

// *******************************************************************************************

export const LANE = {
  UPDATE: 1 << 1,
  PLACEMENT: 1 << 2,
  REMOVE: 1 << 3,
  DIRTY: 1 << 5,
  Suspense: 1 << 6,
  Error: 1 << 7,
  Boundary: (1 << 6) | (1 << 7),
};

// *******************************************************************************************

// ! HookFlags
export const HookLayout = /*    */ 0b010;
export const HookPassive = /*   */ 0b100;

// *******************************************************************************************

export function isFn(fn) {
  return typeof fn === "function";
}

export function isStr(s) {
  return typeof s === "string"; //|| typeof s === "number";
}

export function isStringOrNumber(s) {
  return typeof s === "string" || typeof s === "number";
}

export function isArray(arr) {
  return Array.isArray(arr);
}

export function is(x: any, y: any) {
  return (
    (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y) // eslint-disable-line no-self-compare
  );
}

const objectIs: (x: any, y: any) => boolean =
  typeof Object.is === "function" ? Object.is : is;

export function areHookInputsEqual(nextDeps, prevDeps) {
  if (prevDeps === null) {
    return false;
  }

  for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
    if (objectIs(nextDeps[i], prevDeps[i])) {
      continue;
    }
    return false;
  }
  return true;
}

// 更新原生标签的属性，如className、href、id、（style、事件）等
export function updateNode(node, prevVal, nextVal) {
  Object.keys(prevVal)
    // .filter(k => k !== "children")
    .forEach((k) => {
      if (k === "children") {
        // 有可能是文本
        if (isStringOrNumber(prevVal[k])) {
          node.textContent = "";
        }
      } else if (k.slice(0, 2) === "on") {
        const eventName = k.slice(2).toLocaleLowerCase();
        node.removeEventListener(eventName, prevVal[k]);
      } else {
        if (!(k in nextVal)) {
          node[k] = "";
        }
      }
    });

  Object.keys(nextVal)
    // .filter(k => k !== "children")
    .forEach((k) => {
      if (k === "children") {
        // 有可能是文本
        if (isStringOrNumber(nextVal[k])) {
          node.textContent = nextVal[k] + "";
        }
      } else if (k.slice(0, 2) === "on") {
        const eventName = k.slice(2).toLocaleLowerCase();
        node.addEventListener(eventName, nextVal[k]);
      } else {
        node[k] = nextVal[k];
      }
    });
}
