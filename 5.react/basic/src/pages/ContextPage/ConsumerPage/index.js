import React, { Component } from 'react';
import { Context, UserContext } from '../../../Context';

export default class ConsumerPage extends Component {
  render() { 
    return (
      <div>
        <h3>ConsumerPage</h3>
        <Context.Consumer>
          {
            ({themeColor}) => {
              return <div className={themeColor}>red word</div>
            }
          }
        </Context.Consumer>
        <UserContext.Consumer>
          {
            ({name}) => {
              return <div>{name}</div>
            }
          }
        </UserContext.Consumer>
      </div>
    );
  }
}