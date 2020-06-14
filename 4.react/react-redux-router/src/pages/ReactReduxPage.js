import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { connect } from '../imitation/react-redux';

class ReactReduxPage extends Component {
  render() {
    const { counter, add, minus } = this.props;
    return (
      <div>
        <h3>ReactReduxPage</h3>
        <p>{counter}</p>
        {/* <button onClick={() => dispatch({ type: 'add' })}>add</button> */}
        <button onClick={add}>add</button>
        <button onClick={minus}>minus</button>
      </div>
    );
  }
}

export default connect(
  state => ({ counter: state.counter }),
  {
    add: () => ({ type: 'add' }),
    minus: () => ({ type: 'minus' })
  }
)(ReactReduxPage);