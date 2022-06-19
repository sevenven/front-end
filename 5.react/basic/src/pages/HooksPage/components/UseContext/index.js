import React, { useContext, useState } from 'react';
import { Context } from '../../../../Context';

function Counter(props) {
  // 接收一个 context 对象，并返回该 context 的当前值
  const count = useContext(Context);
  return (
    <div>Counter: {count}</div>
  )
}

export default function UseContext(props) {

  const [count, setCount] = useState(10);

  return (
    <div>
      <br />
      <h3>UseContext</h3>
      <div>{count}</div>
      <button onClick={() => setCount(count + 2)}>addCount</button>
      <Context.Provider value={count}>
        <Counter />
      </Context.Provider>
    </div>
  )
}