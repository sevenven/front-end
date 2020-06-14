import React, { useState } from 'react';

const FruitAdd = ({ fruit, setFruit }) => {
  const [name, setName] = useState('');
  const addFruit = () => {
    setFruit([...fruit, name]);
    setName('');
  }
  return (
    <div>
      <h3>FruitAdd</h3>
      <input value={name} onChange={event => setName(event.target.value)} />
      <button onClick={addFruit}>add</button>
    </div>
  );
}

export default FruitAdd;