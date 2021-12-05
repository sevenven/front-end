import React, { Component } from 'react'

export default class Count extends Component {

  state = { 
    count: 0 
  }

  //加法
  increment = () => {
    const { value } = this.selectNumber
    const { count } = this.state
    this.setState({ count: count + value * 1 })
  }

  //减法
  decrement = () => {
    const { value } = this.selectNumber
    const { count } = this.state
    this.setState({ count: count - value * 1 })
  }

  //奇数再加
  incrementIfOdd = () => {
    const { value } = this.selectNumber
    const { count } = this.state
    if (count % 2 !== 0) {
      this.setState({ count: count + value * 1 })
    }
  }

  //异步加
  incrementAsync = () => {
    const { value } = this.selectNumber
    const { count } = this.state
    setTimeout(() => {
      this.setState({ count: count + value * 1 })
    }, 1000)
  }

  render() {
    return (
      <div>
        <h1>当前求和为：{this.state.count}</h1>
        <select ref={c => this.selectNumber = c}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>&emsp;
        <button onClick={this.increment}>+</button>&emsp;
        <button onClick={this.decrement}>-</button>&emsp;
        <button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>&emsp;
        <button onClick={this.incrementAsync}>异步加</button>&emsp;
      </div>
    )
  }
}
