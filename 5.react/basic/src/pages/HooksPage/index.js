import React, { useEffect, useLayoutEffect, useReducer, useState } from 'react';
import {couterReducer } from '../../store/reducer.js';

const init = initArg => initArg - 0;

export default function HooksPage(props) {

  const [state, dispatch] = useReducer(couterReducer, "0", init);

  const [count, setCount] = useState(10);

  useEffect(() => { // componentDidMount
    // console.log("useEffect state~~~", state);
    return () => {}; // componentWillUnmount
  }, [state]) // componentDidUpdate

  useLayoutEffect(() => { // componentDidMount
    // console.log("useLayoutEffect state~~~", state);
    return () => {}; // componentWillUnmount
  }, [state]) // componentDidUpdate

  return (
    <div>
      <h3>HooksPage</h3>
      <div>{count}</div>
      <button onClick={() => setCount(count + 2)}>add2</button>
      <div>{state}</div>
      <button onClick={() => dispatch({type: 'ADD', payload: 1})}>add</button>
    </div>
  )
}