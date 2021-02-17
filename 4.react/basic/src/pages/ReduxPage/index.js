import React, { Component } from 'react';
import store from '../../store';

export default class ReduxPage extends Component {

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  add = () => {
    store.dispatch({
      type: 'ADD',
      payload: 1
    })
  }

  asyncAdd = () => {
    // setTimeout(() => {
    //   store.dispatch({
    //     type: 'ADD',
    //     payload: 1
    //   })
    // }, 1000)
    store.dispatch((dispatch, getState) => {
      setTimeout(() => {
        dispatch({
          type: 'ADD',
          payload: 1
        })
      }, 1000)
    })
  }

  add2 = () => {
    store.dispatch({
      type: 'ADD2',
    })
  }

  render() { 
    return (
      <div>
        <h3>ReduxPage</h3>
        <div>{store.getState().count}</div>
        <button onClick={this.add}>add</button>
        <button onClick={this.asyncAdd}>asyncAdd</button>
        <div>{store.getState().count2.num}</div>
        <button onClick={this.add2}>add2</button>
      </div>
    );
  }
}

