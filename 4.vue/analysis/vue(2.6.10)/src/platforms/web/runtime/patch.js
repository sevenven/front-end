/* @flow */

import * as nodeOps from 'web/runtime/node-ops'
import { createPatchFunction } from 'core/vdom/patch'
import baseModules from 'core/vdom/modules/index'
import platformModules from 'web/runtime/modules/index'

// the directive module should be applied last, after all
// built-in modules have been applied.
const modules = platformModules.concat(baseModules)

// 生成patch的工厂函数
// 传入平台特有的节点操作方法实现跨平台
export const patch: Function = createPatchFunction({ 
  nodeOps, // 节点操作
  modules  // 属性操作
})
