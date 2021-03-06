export default function logger({getState, dispatch}) {
  return next => {
    console.log('logger')
    return action => {
      console.log('---prev state---', getState());
      const returnValue = next(action);
      console.log('---next state---', getState());
      return returnValue;
    }
  }
}