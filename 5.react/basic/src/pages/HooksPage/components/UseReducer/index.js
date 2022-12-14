import React, { useReducer } from 'react';
import { couterReducer } from '../../../../store/reducer';

const init = initArg => initArg - 0;

export default function UseReducer(props) {

  // useState的替代方案。它接收一个形如 (state, action) => newState 的 reducer（纯函数），并返回当前的 state 以及与其配套的 dispatch 方法。
  // 它还可以接收第二和第三个参数，分别为默认值以及对于默认值的处理函数
  const [state, dispatch] = useReducer(couterReducer, "0", init);

  const handleClick = () => {
    // 与redux的dispach一样
    dispatch({ type: 'ADD', payload: 1 })
  }
  
  return (
    <div>
      <br/><br/>
      <h3>UseReducer</h3>
      <div>{state}</div>
      <button onClick={handleClick}>add</button>
    </div>
  )
}