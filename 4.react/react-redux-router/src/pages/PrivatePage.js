import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from '../imitation/react-redux'

class PrivatePage extends Component {
  render() {
    const { isLogin, path, component } = this.props;
    if (isLogin) {
      return <Route path={path} component={component} />;
    }
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { redirect: path }
        }}
      />
    );
  }
}

export default connect(
  state => ({ isLogin: state.user.isLogin })
)(PrivatePage);
