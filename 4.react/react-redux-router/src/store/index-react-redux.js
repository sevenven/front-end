import { createStore, combineReducers } from 'redux'

function couterReducer(state = 0, action) {
  switch (action.type) {
    case 'add':
      return state + 1;
    case 'minus':
      return state - 1;
    default:
      return state;
  }
}

const initLogin = {
  isLogin: false,
  user: { name: '' }
}

function loginReducer(state = { ...initLogin }, action) {
  switch (action.type) {
    case 'successLogin':
      return { isLogin: true, user: { name: 'seven' } }
    default:
      return state;
  }
}

const store = createStore(combineReducers({
  counter: couterReducer,
  user: loginReducer
}));

export default store;