import React from 'react';
import ReduxPage from './pages/ReduxPage';
import ReactReduxPage from './pages/ReactReduxPage';
import ReactRouterPage from './pages/ReactRouterPage';
import MyReactRoutePage from './pages/MyReactRoutePage';

function App() {
  return (
    <div className="App">
      <MyReactRoutePage />
      <ReactRouterPage />
      <ReactReduxPage />
      <ReduxPage />
    </div>
  );
}

export default App;
