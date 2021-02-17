export default function createStore(reducer, enhancer) {

  // 如果需要加强功能
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }

  let currentState;
  let currentListeners = [];

  function getState() {
    return currentState;
  }

  function dispatch(action) {
    currentState = reducer(currentState, action);
    currentListeners.forEach(listener => listener());
  }

  function subscribe(listener) {
    currentListeners.push(listener);
    return () => {
      const index = currentListeners.indexOf(listener);
      currentListeners.splice(index, 1); 
    }
  }

  dispatch({ type: 'REDUX@XW' });

  return {
    getState,
    dispatch,
    subscribe
  }
}