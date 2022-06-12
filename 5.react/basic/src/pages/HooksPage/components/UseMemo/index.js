import React, { useState, useMemo } from 'react'

// 产品名称列表
const nameList = ['apple', 'peer', 'banana', 'lemon']

export default function UseMemo(props) {
  // 产品名称、价格
  const [price, setPrice] = useState(0)
  const [name, setName] = useState('apple')

  // 获取产品的名字
  const getProductName = () => {
    console.log('getProductName~~~')
    return name
  }

  // 获取产品的名字
  const getProductNameMemo = useMemo(() => {
    console.log('getProductNameMemo~~~')
    return () => name
  }, [name])

  return (
    <React.Fragment>
      <br/><br/>
      <h4>useMemo</h4>
      <p>name: {name}</p>
      <p>price: {price}</p>
      <p>getProductName: {getProductName()}</p>
      <p>getProductNameMemo: {getProductNameMemo()}</p>
      <button onClick={() => setPrice(price + 1)}>价钱+1</button>&emsp;
      <button onClick={() => setName(nameList[Math.random() * nameList.length << 0])}>修改名字</button>
      <div></div>
    </React.Fragment>
  )
}