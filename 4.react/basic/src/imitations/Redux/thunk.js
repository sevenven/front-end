export default function thunk({getState, dispatch}) {
  return next => action => {
    if (typeof action === "function") {
      action(dispatch, getState);
    }
    return next(action);
  };
}