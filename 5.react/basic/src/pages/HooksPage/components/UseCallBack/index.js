import React, { useCallback, useState } from 'react';
import A, { MemoA } from './components/A'

export default function UseCallBack(props) {

  const [count, setCount] = useState(10);
  const [count2, setCount2] = useState(20);

  const addCount = useCallback(() => {
    console.log('addCount~~~~', count);
    setCount(count + 1)
  }, [count])

  const addCount2 = () => {
    console.log('addCount2~~~', count2)
    setCount2(count2 + 2)
  }

  const addAllCount = () => {
    console.log('addAllCount-count~~~~', count);
    console.log('addAllCount-count2~~~', count2)
    setCount(count + 1)
    setCount2(count2 + 2)
  }

  return (
    <div>
      <br/><br/>
      <h4>UseCallBack</h4>
      <button onClick={addAllCount}>addAll</button>
      <div>{count}</div>
      <button onClick={addCount}>add</button>
      <div>{count2}</div>
      <button onClick={addCount2}>add2</button>
      <A
        count={count}
        addCount={addCount}
      />
      <MemoA
        count={count}
        // useCallback需要搭配useMeno使用
        addCount={addCount}
      />
    </div>
  )
}