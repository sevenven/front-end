import {
  Component,
  useState,
  useReducer,
  useEffect,
  useLayoutEffect,
} from "../whichReact";

class ClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {count: 0};
  }

  handle = () => {
    const {count} = this.state;
    this.setState({count: count + 1});
  };
  render() {
    const {count} = this.state;

    return (
      <div className="class border">
        {this.props.name}
        <button onClick={this.handle}>{count}</button>
      </div>
    );
  }
}

function FunctionComponent(props) {
  const [count1, setCount1] = useReducer((x) => x + 2, 0); //hook2
  const [count2, setCount2] = useReducer((x) => x + 1, 0); //hook2

  useEffect(() => {
    console.log("omg useEffect", count2); //sy-log
  }, [count2]);

  useLayoutEffect(() => {
    console.log("omg useLayoutEffect", count2); //sy-log
  }, [count2]);
  return (
    <div className="border">
      <p>{props.name}</p>
      <button
        onClick={() => {
          setCount1();
        }}>
        {count1}
      </button>
      <button
        onClick={() => {
          setCount2();
        }}>
        {count2}
      </button>

      <ul>
        <li key="0">0</li>
        <li key="1">1</li>
        {count2 % 2 ? <li key="2">2</li> : null}
        <li key="3">3</li>
        <li key="4">4</li>
      </ul>
    </div>
  );
}

const jsx = (
  <div className="box border">
    <h1>omg</h1>
    <h2>ooo</h2>
    <FunctionComponent name="函数组件" />
    <ClassComponent name="class组件" />
  </div>
);

export default jsx;
