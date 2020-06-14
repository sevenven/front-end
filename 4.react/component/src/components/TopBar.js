import React, { Component } from 'react';
import { Consumer } from '../AppContext';

class TopBar extends Component {
  render() {
    return (
      <div className="border">
        <h3>TopBar</h3>
        <Consumer>{ctx => <div>TopBar-{ctx.user.name}</div>}</Consumer>
      </div>
    );
  }
}

export default TopBar;