// 分为16.4之前的生命周期和16.4之后的生命周期
// 引入新生命周期函数的缘由：Fiber
import React, { Component } from "react";

class LifeCyclePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
    console.log('constructor', this.state);
  }
  // componentWillMount() {
  // UNSAFE_componentWillMount() {
  //   console.log('componentWillMount', this.state);
  // }
  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps', props, state);
    return state.counter < 5 ? null : {counter: 0};
  }
  componentDidMount() {
    console.log('componentDidMount', this.state);
  }
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }
  shouldComponentUpdate() {
    return true;
  }
  // componentWillUpdate() {
  // UNSAFE_componentWillUpdate() {
  //   console.log('componentWillUpdate', this.state);
  // }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate', prevProps, prevState);
    return null;
  }
  componentDidUpdate() {
    console.log('componentDidUpdate', this.state);
  }
  setCounter = () => {
    this.setState({
      counter: this.state.counter + 1
    })
  }
  render() {
    const { counter } = this.state;
    console.log('render', this.state);
    return (
      <div>
        <h3>LifeCyclePage</h3>
        <button onClick={this.setCounter}>{counter}</button>
        {!(counter % 2) && <Foo counter={counter} />}
      </div>
    );
  }
}

class Foo extends Component {
  // componentWillReceiveProps() {
  UNSAFE_componentWillReceiveProps() {
    console.log('componentWillReceiveProps', this.props);
  }
  // 只有在已挂载组件的props更新的时候才会执行
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }
  render() {
    const { counter } = this.props
    return (
      <div>
        <p>{counter}</p>
      </div>
    );
  }
}

export default LifeCyclePage;
