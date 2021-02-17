import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { connect } from '../../imitations/ReactRedux';
// import { bindActionCreators } from 'redux';
import { bindActionCreators } from '../../imitations/Redux';

export default 
// hoc 是个函数，接受组件作为参数，返回一个新的组件
@connect(
  // mapStateToProps
  ({count}) => ({count}),
  // mapDispatchToProps Object | Function
  // {
  //   add: () => ({ type: 'ADD', payload: 1 }),
  //   minus: () => ({ type: 'MINUS', payload: 1 })
  // }
  (dispatch) => {
    let creators = {
      add: () => ({ type: 'ADD', payload: 1 }),
      minus: () => ({ type: 'MINUS', payload: 1 })
    }
    creators = bindActionCreators(creators, dispatch);
    return {
      dispatch,
      ...creators
    }
  }
) 
class ReactReduxPage extends Component {

  add = () => {
    this.props.dispatch({
      type: 'ADD',
      payload: 1
    })
  }

  render() { 
    const { count, add, minus } = this.props;
    console.log(this.props)
    return (
      <div>
        <h3>ReactReduxPage</h3>
        <div>{count}</div>
        <button onClick={this.add}>add</button>
        <button onClick={add}>add</button>
        <button onClick={minus}>minus</button>
      </div>
    );
  }
}
