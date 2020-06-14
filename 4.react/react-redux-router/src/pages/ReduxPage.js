import React, { Component } from 'react';
import store from '../store'

class ReduxPage extends Component {
  componentDidMount() {
    store.subscribe(() => {
      this.forceUpdate();
    })
  }
  add = () => {
    store.dispatch({ type: 'add' })
  }
  minus = () => {
    store.dispatch({ type: 'minus' })
  }
  asyncAdd = () => {
    store.dispatch((dispatch) => {
      setTimeout(() => {
        dispatch({ type: 'add' })
      }, 1000);
    });
  }
  render() {
    return (
      <div>
        <h3>ReduxPage</h3>
        <p>{store.getState()}</p>
        <button onClick={this.add}>add</button>
        <button onClick={this.minus}>minus</button>
        <button onClick={this.asyncAdd}>asyncAdd</button>
      </div>
    );
  }
}

export default ReduxPage;