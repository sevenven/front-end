import React, { useCallback } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useDispatch, useSelector } from '../../imitations/ReactRedux'

export default function ReactReduxHooksPage(props) {

  const count = useSelector(({count}) => count);
  const dispatch = useDispatch();

  const add = useCallback(() => {
    dispatch({
      type: 'ADD',
      payload: 1
    });
  }, [dispatch]) 

  return (
    <div>
      <h3>ReactReduxHooksPage</h3>
      <div>{count}</div>
      <button onClick={add}>add</button>
    </div>
  );
}