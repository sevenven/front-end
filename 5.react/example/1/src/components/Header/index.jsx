import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Header extends Component {

  back = () => {
    this.props.history.goBack()
  }

  forward = () => {
    this.props.history.goForward()
  }

  go = () => {
    this.props.history.go(-1);
  }

  render() {
    return (
      <div className="page-header">
        <h2>React</h2>
        <button onClick={this.back}>回退</button>&nbsp;
        <button onClick={this.forward}>前进</button>&nbsp;
        <button onClick={this.go}>go</button>
      </div>
    )
  }
}

export default withRouter(Header);
