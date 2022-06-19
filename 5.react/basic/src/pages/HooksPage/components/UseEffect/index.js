import React, { useState, useEffect } from 'react';

export default function UseEffect(props) {

  const [count, setCount] = useState(0);

  // 不同的useEffect处理不同的逻辑单元-更加清晰明了
  useEffect(() => {
    // componentDidMount&componentDidUpdate-数组不为空或者不传数组参数
    document.title = count;
  }, [count]);

  // 时间绑定与时间解绑写在了一处-有效降低忘记解绑的概率
  useEffect(() => {
    // componentDidMount-数组为空
    window.addEventListener('resize', onResize);
    // componentWillUnMount
    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, []);

  const onResize = (e) => {
    console.log('e~~~~', e, new Date().getTime())
  }

  return (
    <div>
      <br />
      <h3>UseEffect</h3>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>addCount</button>
    </div>
  )
}