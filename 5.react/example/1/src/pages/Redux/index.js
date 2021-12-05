import React, { Component } from 'react'
import store from '../../redux/store'
import { increment, decrement, incrementAsync } from '../../redux/actions/count'

export default class Count extends Component {

  componentDidMount() {
    this.unSubscribe = store.subscribe(() => {
      this.forceUpdate()
    })
  }

  componentWillUnmount() {
    this.unSubscribe()
  }

  //加法
  increment = () => {
    const { value } = this.selectNumber
    store.dispatch(increment(value * 1))
  }

  //减法
  decrement = () => {
    const { value } = this.selectNumber
    store.dispatch(decrement(value * 1))
  }

  //奇数再加
  incrementIfOdd = () => {
    const { count } = store.getState();
    if (count % 2 !== 0) {
      const { value } = this.selectNumber
      store.dispatch(increment(value * 1))
    }
  }

  //异步加
  incrementAsync = () => {
    const { value } = this.selectNumber
    store.dispatch(incrementAsync(value * 1, 1000))
    // incrementAsync(value * 1, 1000)(store.dispatch);
  }

  render() {
    const { count } = store.getState();
    return (
      <div>
        <h1>当前求和为：{count}</h1>
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
