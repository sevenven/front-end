import { Placement } from './utils'

export function createFiber(vnode, returnFiber) {
  const fiber = {
    type: vnode.type, // 类型
    key: vnode.key, // 标记当前层级下的唯一性
    props: vnode.props,
    child: null, // 第一个子fiber
    sibling: null, // 下一个兄弟fiber
    return: returnFiber, // 父fiber
    alternate: null, // 老节点
    stateNode: null, // 原生标签的时候是dom节点 类组件的时候是实例
    flags: Placement, // 标记当前节点类型（比如插入、更新、删除等）
    // memorizeState: null, // 类组件中指的是状态值 函数组件指的是第一个hook
  }
  return fiber;
}