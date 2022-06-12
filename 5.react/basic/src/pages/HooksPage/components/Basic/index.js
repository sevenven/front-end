import React, { useState, useEffect, useLayoutEffect } from 'react';

export default function Basic(props) {

  const [count, setCount] = useState(10);

  useEffect(() => { // componentDidMount
    console.log("useEffect state~~~", count);
    return () => { }; // componentWillUnmount
  }, [count]) // componentDidUpdate

  useLayoutEffect(() => { // componentDidMount
    console.log("useLayoutEffect state~~~", count);
    return () => { }; // componentWillUnmount
  }, [count]) // componentDidUpdate

  return (
    <div>
      <br/>
      <h3>Basic</h3>
      <div>{count}</div>
      <button onClick={() => setCount(count + 2)}>add2</button>
    </div>
  )
}