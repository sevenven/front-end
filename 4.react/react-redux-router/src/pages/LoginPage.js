import React, { Component } from "react";
import { connect } from '../imitation/react-redux'
import { Redirect } from "react-router-dom";

class LoginPage extends Component {
  render() {
    const { isLogin, location, login } = this.props;
    const { redirect = "/" } = location.state || {};
    if (isLogin) {
      return <Redirect to={redirect} />;
      //return <Route path={path} component={component} />;
    }
    return (
      <div>
        <h3>LoginPage</h3>
        <p>This is LoginPage</p>
        <button onClick={login}>login</button>
      </div>
    );
  }
}

export default connect(
  //mapStateToProps
  state => ({ isLogin: state.user.isLogin }),
  //mapDispatchToProps
  {
    login: () => ({ type: "successLogin" })
  }
)(LoginPage);
