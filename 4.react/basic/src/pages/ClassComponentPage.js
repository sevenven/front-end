import React, { Component } from 'react';

class ClassComponentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      counter: 0
    }
  }
  // 组件挂载完成之后执行当前生命周期
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        date: new Date()
      });
    }, 1000);
    // setTimeout(() => {
    //   this.setCounter();
    // }, 0);
    document.getElementById('test').addEventListener('click', this.setCounter)
  }
  // 组件卸载之前执行
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  setCounter = () => {
    this.setState({
      counter: this.state.counter + 1
    }, () => {
      console.log('omg', this.state.counter);
    });
    // this.setState({
    //   counter: this.state.counter + 2
    // });
    console.log('counter', this.state.counter);
    // this.setState(nextState => {
    //   return {
    //     counter: nextState.counter + 1
    //   }
    // });
    // this.setState(nextState => {
    //   return {
    //     counter: nextState.counter + 2
    //   }
    // });
  }
  render() {
    const { date, counter } = this.state;
    return (
      <div>
        <h3>ClassComponentPage</h3>
        <p>{date.toLocaleTimeString()}</p>
        <button onClick={this.setCounter}>{counter}</button>
        <button id="test">{counter}</button>
      </div>
    );
  }
}

export default ClassComponentPage;