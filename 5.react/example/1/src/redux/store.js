import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
//引入redux-thunk，用于支持函数类action
import thunk from 'redux-thunk'
import reducer from './reducers'

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))