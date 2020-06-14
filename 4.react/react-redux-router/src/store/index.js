// import { createStore, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk';
// import logger from 'redux-logger'
import { createStore, applyMiddleware } from '../imitation/redux'

function counterReducer(state = 0, action) {
  switch (action.type) {
    case 'add':
      return state + 1;
    case 'minus':
      return state - 1;
    default:
      return state;
  }
}

function logger() {
  return dispatch => action => {
    console.log(action.type + "执行了！");
    return dispatch(action);
  };
}

function thunk() {
  return dispatch => action => {
    if (typeof action === "function") {
      return action(dispatch);
    }
    return dispatch(action);
  };
}

const store = createStore(counterReducer, applyMiddleware(thunk, logger));

export default store;