import * as React from "react";
// import { Component, useState } from 'react';
// import * as ReactDOM from 'react-dom';
import Component from './imitation/component';
import ReactDOM, { useState } from './imitation/react-dom-fiber';
import './index.css';


function FunctionComponent(props) {
  const [count, setCount] = useState(0);
  return (
    <div className="border">
      <p>{props.name}</p>
      <button onClick={() => { setCount(count + 1) }}>{count}</button>
    </div>
  )
}

class ClassComponent extends Component {
  render() {
    return (
      <div className="border">
        <p>{this.props.name}</p>
      </div>
    )
  }
}

function UseFragmentComponent(props) {
  return (
    <>
      <li>youfei</li>
      <li>douluodalu</li>
    </>
  )
}

const jsx = (
  <div className="border">
    <h1>全栈</h1>
    <a href="https://www.baidu.com/">baiduyixia</a>
    <FunctionComponent name="函数组件" />
    <ClassComponent name="类组件" />
    <ul>
      <UseFragmentComponent />
    </ul>
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));