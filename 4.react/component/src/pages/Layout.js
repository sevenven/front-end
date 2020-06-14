import React, { Component } from 'react';
import TopBar from '../components/TopBar';

class Layout extends Component {
  componentDidMount() {
    const { title = "商城" } = this.props;
    document.title = title;
  }
  render() {
    const { showTopBar } = this.props;
    return (
      <div className="border">
        <h3>Layout</h3>
        {showTopBar && <TopBar />}
        {this.props.children}
      </div>
    );
  }
}

export default Layout;