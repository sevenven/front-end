import React, { useState } from 'react';

export default function UseState(props) {

  // 数组的返回值设置可以方便的重命名-更好的见名知意
  // useState的参数还可以是一个函数
  const [count, setCount] = useState(10);

  return (
    <div>
      <br />
      <h3>UseState</h3>
      <div>{count}</div>
      <button onClick={() => setCount(count + 2)}>addCount</button>
    </div>
  )
}