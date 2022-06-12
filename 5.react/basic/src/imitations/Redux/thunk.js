export default function thunk({getState, dispatch}) {
  return next => { // 如果是compose时第一个执行的中间件-》是原始的store的dispatch, 如果是后面执行的中间件，是之前中间件最终执行的函数
    console.log('thunk')
    return action => { // 使用中间件最终实际执行的代码
      if (typeof action === "function") {
        return action(dispatch, getState);
      }
      return next(action);
    }
  }
}