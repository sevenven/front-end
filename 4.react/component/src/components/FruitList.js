import React from 'react';

const FruitList = ({ fruit, setFruit }) => {
  const delFruit = (delIndex) => {
    const tmp = [...fruit];
    tmp.splice(delIndex, 1);
    setFruit(tmp);
  }
  return (
    <div>
      <h3>FruitList</h3>
      <ul>
        {
          fruit.map((item, index) => {
            return <li key={index} onClick={() => delFruit(index)}>{item}</li>
          })
        }
      </ul>
    </div>
  );
}

export default FruitList;