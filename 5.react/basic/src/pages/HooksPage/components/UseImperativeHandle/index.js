
import React, { useRef } from 'react';
import FancyInput from './components/FancyInput';

export default function UseImperativeHandle (props) {

  const fancyInputRef = useRef();

  return (
    <React.Fragment>
      <br/><br/>
      <h4>UseImperativeHandle</h4>
      <FancyInput ref={fancyInputRef} />
      <button
        onClick={() => console.log(fancyInputRef.current)}
      >
        父组件访问子组件的实例属性
      </button>
    </React.Fragment>
  )
}