export default function applyMiddleware(...middlewares) {
  return createStore => reducer => {

    const store = createStore(reducer);
    let dispatch;

    // todo 加强dispatch
    const midApi = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args) // 这是加强的dispatch
    };
    const middlewaresChain = middlewares.map(middleware => middleware(midApi));
    // 此处加强dispatch被加强了
    dispatch = compose(...middlewaresChain)(store.dispatch);

    return {
      ...store,
      dispatch
    };
  };
}

function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  // 返回了一个聚合函数
  return funcs.reduce((a, b) => (...args) => b(a(...args)));
}
