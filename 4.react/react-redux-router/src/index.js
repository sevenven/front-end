import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import store from './store'
import store from './store/index-react-redux'
// import { Provider } from 'react-redux'
import { Provider } from './imitation/react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

// store.subscribe(() => {
//   ReactDOM.render(<App />, document.getElementById('root'));
// })
