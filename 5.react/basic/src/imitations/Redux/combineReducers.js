export default function combineReducers(reducers) {
  return function combination(state = {}, action) {
    let nextState = {};
    let hasChange = false;
    for (let key in reducers) {
      nextState[key] = reducers[key](state[key], action);
      hasChange = hasChange || nextState[key] !== state[key];
    }
    return hasChange ? nextState : state;
  }
}