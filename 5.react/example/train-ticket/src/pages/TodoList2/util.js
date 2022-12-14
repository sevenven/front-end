export const bindActionCreators = (actionCreators, dispatch) => {
  const ret= {};
  for (let key in actionCreators) {
    ret[key] = function(...args) {
      const actionCreator = actionCreators[key];
      const action = actionCreator(...args);
      dispatch(action)
    }
  }
  return ret;
}

export const combineReducers = (reducer) => {
  return (state, action) => {
    let changed = {};
    for (let key in reducer) {
      reducer[key](state[key], action);
      changed[key] = reducer[key](state[key], action);
    }
    return {
      ...state,
      ...changed
    };
  }
}