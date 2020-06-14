import React, { useState, useEffect } from 'react';
import FruitList from '../components/FruitList';
import FruitAdd from '../components/FruitAdd';

const HookPage = () => {
  const [fruit, setFruit] = useState(['apple', 'banana', 'pear'])
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <h3>HookPage</h3>
      <FruitList fruit={fruit} setFruit={setFruit} />
      <FruitAdd fruit={fruit} setFruit={setFruit} />
      <p>{useClock().toLocaleTimeString()}</p>
      <button onClick={() => setCounter(counter + 1)}>{counter}</button>
    </div>
  );
}

// 自定义hook 
// 命名一定要用use开头
function useClock() {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return date;
}

export default HookPage;