// import React, {Component} from "react";
// import ReactDOM from "react-dom";
import ReactDOM from "./imitation/react-dom";
import Component from "./imitation/component";
import { useState, useReducer } from './imitation/hook'
import "./index.css";

class ClassComponent extends Component {
  render() {
    return (
      <div className="border">
        <p>{this.props.name}</p>
      </div>
    );
  }
}

function FunctionComponent(props) {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useReducer((x) => x + 1, 0);
  return (
    <div className="border">
      <p>{props.name}</p>
      <p>{count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}>
        click
      </button>
      <p>{count2}</p>
      <button
        onClick={() => {
          setCount2(count2 + 1);
        }}>
        click
      </button>
    </div>
  );
}


function FragmentComponent(props) {
  return (
    <>
      <li>xiaozhan</li>
      <li>wangyibo</li>
    </>
  )
}


const jsx = (
  <div className="border">
    <h1>全栈</h1>
    <a href="https://www.kaikeba.com/">kkb</a>
    <FunctionComponent name="嘉恒" />
    <ClassComponent name="class" />
    <FragmentComponent />
    <ul>
      <>
        <li>0</li>
        <li>1</li>
      </>
    </ul>
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));
