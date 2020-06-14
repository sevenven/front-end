export function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }
  let currentState = undefined;
  const listeners = [];
  function getState() {
    return currentState;
  }
  function dispatch(action) {
    currentState = reducer(currentState, action);
    listeners.forEach(listener => {
      listener();
    });
  }
  function subscribe(listener) {
    listeners.push(listener)
  }
  dispatch({ type: '@@redux/' + Math.random() })
  return {
    getState,
    dispatch,
    subscribe
  }
}

export function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args);
    let dispatch = store.dispatch;
    const mwArgs = {
      getState: store.getState,
      dispatch
    }
    const chain = middlewares.map(mw => mw(mwArgs));
    dispatch = compose(...chain)(dispatch);
    return { ...store, dispatch };
  }
}

function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((accumulator, currentValue) => (...args) => {
    return accumulator(currentValue(...args));
  });
}