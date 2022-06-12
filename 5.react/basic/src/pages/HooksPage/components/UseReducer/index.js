import React, { useReducer } from 'react';
import { couterReducer } from '../../../../store/reducer';

const init = initArg => initArg - 0;

export default function UseReducer(props) {

  const [state, dispatch] = useReducer(couterReducer, "0", init);
  
  return (
    <div>
      <br/><br/>
      <h3>UseReducer</h3>
      <div>{state}</div>
      <button onClick={() => dispatch({ type: 'ADD', payload: 1 })}>add</button>
    </div>
  )
}