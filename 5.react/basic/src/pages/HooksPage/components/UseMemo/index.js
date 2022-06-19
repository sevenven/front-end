import React, { useState, useMemo } from 'react'

// 产品名称列表
const nameList = ['apple', 'peer', 'banana', 'lemon']

export default function UseMemo(props) {
  // 产品名称、价格
  const [name, setName] = useState('apple')
  const [price, setPrice] = useState(0)

  // 获取产品的名字
  const getProductName = () => {
    console.log('getProductName->每次渲染都会执行')
    return name
  }

  // 获取产品的名字
  const getProductNameMemo = useMemo(() => {
    console.log('getProductNameMemo->只有name发生了变化才会执行')
    // useMemo(() => fn)等价于useCallback(fn)
    return () => {
      // console.log('ofcourse返回函数的函数体的逻辑是每次都会重新执行的-所以千万不要把计算的逻辑写在这里面-一般就是用来返回计算的结果')
      return name
    }
  }, [name]) // 也可以这样[name === 'apple'] name === 'apple'才会重新执行传入的函数的逻辑

  return (
    <React.Fragment>
      <br/>
      <h4>useMemo</h4>
      <p>name: {name}&ensp;------&ensp;price: {price}</p>
      <p>getProductName: {getProductName()}</p>
      <p>getProductNameMemo: {getProductNameMemo()}</p>
      <button onClick={() => setPrice(price + 1)}>价钱+1</button>&emsp;
      <button onClick={() => setName(nameList[Math.random() * nameList.length << 0])}>修改名字</button>
      {/* <div></div> */}
    </React.Fragment>
  )
}