import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import UserPage from './UserPage';
import LoginPage from './LoginPage';
import PrivatePage from './PrivatePage';

const Detail = (props) => {
  const { id } = props.match.params;
  return (
  <div>{id}的Detail</div>
  );
}

const Search = (props) => {
  const { id } = props.match.params;
  return (
    <div>
      <p>Search: {id}</p>
      <Link to={"/search/" + id + "/detail"}>{id}的详情</Link>
      <Route path="/search/:id/detail" component={Detail} />
    </div>
  );
}

class ReactRouterPage extends Component {
  render() {
    const searchId = 123;
    return (
      <div>
        <h3>ReactRouterPage</h3>
        <BrowserRouter>
          <Link to="/">首页</Link>&emsp;
          <Link to="/user">用户中心</Link>&emsp;
          <Link to={"/search/" + searchId}>搜索</Link>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <PrivatePage path="/user" component={UserPage} />
            <Route exact path="/login" component={LoginPage} />
            {/* <Route path="/user"
              component={UserPage}
            // render={() => <div>user rebder</div>}
            // children={() => <div>user children</div>}
            /> */}
            <Route path="/search/:id" component={Search} />
            <Route render={() => <div>404</div>} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default ReactRouterPage;