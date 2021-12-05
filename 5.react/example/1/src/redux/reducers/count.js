import { INCREMENT, DECREMENT } from '../constant'

export default function countReducer(prevState = 0, action) {
  const { type, data } = action;
  switch (type) {
    case INCREMENT:
      return prevState + data
    case DECREMENT:
      return prevState - data
    default:
      return prevState;
  }
}