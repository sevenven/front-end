import React, { useContext } from 'react';
import { Context, UserContext } from '../../../Context';

export default function UseContextPage (props) {
  // 函数组件使用useContext获取-可以订阅多个Context来源
  const { themeColor } = useContext(Context);
  const { name } = useContext(UserContext);
  return (
    <div>
      <h3>UseContextPage</h3>
      <div className={themeColor}>red word</div>
      <div>{name}</div>
    </div>
  )
}