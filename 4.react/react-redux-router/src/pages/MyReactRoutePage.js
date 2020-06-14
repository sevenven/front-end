import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from '../imitation/react-router-dom';
import HomePage from './HomePage';
import UserPage from './UserPage';

class MyReactRoutePage extends Component {
  render() { 
    return (
      <div>
        <h3>MyReactRoutePage</h3>
        <BrowserRouter>
          <Link to="/">首页</Link>&emsp;
          <Link to="/user">用户中心</Link>
          <Route path="/" component={HomePage} />
          <Route path="/user" component={UserPage} />
        </BrowserRouter>
      </div>
    );
  }
}
 
export default MyReactRoutePage;