import React, { useState, useEffect } from 'react';

const FunctionComponentPage = () => {
  const [date, setDate] = useState(new Date());
  const [counter, setCounter] = useState(0);
  // 副作用
  // 相当于 componentDidMount componentDidUpdate componentWillUnmount的结合
  useEffect(() => {
    // console.log('useEffect');
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  // console.log('render');
  return (
    <div>
      <h3>FunctionComponentPage</h3>
      <p>{date.toLocaleTimeString()}</p>
      <button onClick={() => setCounter(counter + 1)}>{counter}</button>
    </div>
  );
}

export default FunctionComponentPage;