import React from 'react';
import ClassComponentPage from './pages/ClassComponentPage';
import FunctionComponentPage from './pages/FunctionComponentPage';
import FormPage from './pages/FormPage';
import LifeCyclePage from './pages/LifeCyclePage';

function App() {
  return (
    <div className="App">
      <LifeCyclePage />
      <FormPage />
      <FunctionComponentPage />
      <ClassComponentPage />
    </div>
  );
}

export default App;
