import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom'
import HomePage from './HomePage';
import UserPage from './UserPage';

class ReactRouterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div>
        <h3>ReactRouterPage</h3>
        <BrowserRouter>
          <Link to="/">首页</Link>&emsp;
          <Link to="/user">用户中心</Link>
          <Route exact path='/' component={HomePage} />
          <Route
            path='/user'
            // children={() => <div>children user</div>}
            // render={() => <div>render user</div>}
            component={UserPage}
          />
        </BrowserRouter>
      </div>
    );
  }
}

export default ReactRouterPage;