import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'
import type { GlobalAPI } from 'types/global-api'

function Vue(options) {
  if (__DEV__ && !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

// 拆分一些Vue.prototype上的方法到其他文件
//@ts-expect-error Vue has function type
// init
initMixin(Vue)
//@ts-expect-error Vue has function type
// $set $delete $watch
stateMixin(Vue)
//@ts-expect-error Vue has function type
// $on $emit $once $off
eventsMixin(Vue)
//@ts-expect-error Vue has function type
// _update $forceUpdate $destroy
lifecycleMixin(Vue)
//@ts-expect-error Vue has function type
// _render $nextTick
renderMixin(Vue)

export default Vue as unknown as GlobalAPI
