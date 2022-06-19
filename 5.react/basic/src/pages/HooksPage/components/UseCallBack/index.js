import React, { useCallback, useState } from 'react';
import A, { MemoA } from './components/A'

export default function UseCallBack(props) {

  const [count, setCount] = useState(10);
  const [count2, setCount2] = useState(20);

  // 使用了useCallback，函数地址只有当依赖发生变化的时候才会改变
  const addCount = useCallback(() => {
    console.log('addCount~~~~', count);
    setCount(count + 1)
  }, [count])

  const addCount2 = () => {
    console.log('addCount2~~~', count2)
    setCount2(count2 + 2)
  }

  return (
    <div>
      <br/>
      <h4>UseCallBack</h4>
      <div>{count}</div>
      <button onClick={addCount}>add</button>
      <div>{count2}</div>
      <button onClick={addCount2}>add2</button>
      <A
        count={count}
        // 接受一个函数作为props
        addCount={addCount}
      />
      <MemoA
        count={count}
        // 接受一个函数作为props
        // useCallback需要搭配React.memo使用-浅比较
        addCount={addCount}
      />
    </div>
  )
}