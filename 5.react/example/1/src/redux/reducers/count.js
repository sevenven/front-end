export default function countReducer(prevState = 0, action) {
  const { type, data } = action;
  switch (type) {
    case 'increment':
      return prevState + data
    case 'decrement':
      return prevState - data
    default:
      return prevState;
  }
}