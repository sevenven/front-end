
import React, { useRef } from 'react';
import FancyInput from './components/FancyInput';

export default function UseImperativeHandle (props) {
  // useRef1: 获取组件实例
  const fancyInputRef = useRef();

  return (
    <React.Fragment>
      <br/>
      <h4>UseRef&UseImperativeHandle</h4>
      <FancyInput ref={fancyInputRef} />
      <button
        onClick={() => console.log(fancyInputRef.current)}
      >
        父组件访问子组件的实例属性
      </button>
    </React.Fragment>
  )
}