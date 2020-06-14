import React from 'react';
import { Provider } from './AppContext'
import HomePage from './pages/HomePage';
import HocPage from './pages/HocPage';
import HookPage from './pages/HookPage';
import UseReducerPage from './pages/UseReducerPage';
import UseContextPage from './pages/UseContextPage';

const store = {
  user: {
    name: 'seven'
  }
}

function App() {
  return (
    <div className="App">
      <UseReducerPage />
      <HookPage />
      <HocPage />
      <Provider value={store}>
        <UseContextPage />
        <HomePage />
        {/* <Consumer>
          {
            ctx => (
              <>
                <div>{ctx.user.name}</div>
                <HomePage {...ctx} />
              </>
            )
          }
        </Consumer> */}
      </Provider>
      {/* <HomePage {...store} /> */}
    </div>
  );
}

export default App;
