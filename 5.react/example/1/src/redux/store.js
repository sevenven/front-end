import { createStore, applyMiddleware } from 'redux'
//引入redux-thunk，用于支持函数类action
import thunk from 'redux-thunk'
import reducer from './reducers'

export default createStore(reducer, applyMiddleware(thunk))