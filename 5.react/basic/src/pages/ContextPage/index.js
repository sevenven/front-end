import React, { Component } from 'react';
import { Context, UserContext } from '../../Context';
import ContextTypePage from './ContextTypePage';
import ConsumerPage from './ConsumerPage';
import UseContextPage from './UseContextPage';
import './index.scss';

export default class ContextPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      theme: {
        themeColor: 'red'
      },
      user: {
        name: 'seven',
      }
    }
  }

  changeColor = () => {
    const { themeColor } = this.state.theme;
    this.setState({
      theme: { themeColor: themeColor === 'red' ? 'green' : 'red' }
    })
  }

  render() { 
    const {user, theme} = this.state;
    return (
      <div>
        <h3>ContextPage</h3>
        <button onClick={this.changeColor}>~~click~~</button>
        <Context.Provider value={theme}>
          <UserContext.Provider value={user} >
            {/* 类组件使用contextType */}
            <ContextTypePage />
            {/* 函数组件使用userContext */}
            <UseContextPage />
            {/* 类组件及函数组件通用 */}
            <ConsumerPage />
          </UserContext.Provider>
        </Context.Provider>
      </div>
    );
  }
}