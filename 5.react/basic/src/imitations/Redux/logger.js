export default function logger({getState, dispatch}) {
  return next => { // 如果是compose时第一个执行的中间件-》是原始的store的dispatch, 如果是后面执行的中间件，是之前中间件最终执行的函数
    console.log('logger')
    return action => { // 使用中间件最终实际执行的代码
      console.log('---prev state---', getState());
      const returnValue = next(action);
      console.log('---next state---', getState());
      return returnValue;
    }
  }
}