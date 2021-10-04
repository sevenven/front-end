export default function thunk({getState, dispatch}) {
  return next => {
    console.log('thunk')
    return action => {
      if (typeof action === "function") {
        return action(dispatch, getState);
      }
      return next(action);
    }
  }
}