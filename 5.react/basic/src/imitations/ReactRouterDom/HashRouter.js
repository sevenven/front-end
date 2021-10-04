import React, { Component, Children } from "react";
import { createHashHistory } from "history";
import { RouterContext } from "./RouterContext";
import Router from "./Router";

export default class HashRouter extends Component {

  constructor(props) {
    super(props);
    this.history = createHashHistory();
  }

  render() {
    return <Router history={this.history} children={this.props.children} />;
  }
  
}
