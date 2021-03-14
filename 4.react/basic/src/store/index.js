// import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createStore, combineReducers, applyMiddleware } from '../imitations/Redux';
// import thunk from 'redux-thunk';
import thunk from '../../src/imitations/Redux/thunk';
// import logger from 'redux-logger';
import logger from '../../src/imitations/Redux/logger';
import { couterReducer, couterReducer2 } from './reducer';

const store = createStore(combineReducers({
  count: couterReducer,
  count2: couterReducer2
}), applyMiddleware(thunk, logger));

export default store;