export default function applyMiddleware(...middlewares) {
  return createStore => reducer => {
    const store = createStore(reducer);
    let dispatch = store.dispatch;

    // 加强dispatch
    const midApi = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args)
    };

    console.log('middlewares', middlewares)
    
    const middlewaresChain = middlewares.map(middleware => middleware(midApi));

    console.log('middlewaresChain', middlewaresChain)

    // 聚合之后的dispatch一旦执行，所有中间件也要按照顺序执行，还要修改状态（store.dispatch）
    dispatch = compose(...middlewaresChain)(store.dispatch);


    //加强完dispatch之后
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
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
