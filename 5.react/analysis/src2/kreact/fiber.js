import {Placement} from "./utils";

export function createFiber(vnode, other = {}) {
  const newFiber = {
    type: vnode.type,
    key: vnode.key,
    props: vnode.props,
    stateNode: null,
    return: null,
    child: null,
    sibling: null,
    alternate: null,
    flags: Placement,
    ...other,
  };
  return newFiber;
}
