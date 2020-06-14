import React, { Component } from 'react';
import Dialog from '../components/Dialog';

class DialogPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  handleClick = () => {
    this.setState({
      show: !this.state.show
    })
  }

  render() {
    const { show } = this.state;
    return (
      <div>
        <h3>DialogPage</h3>
        <button className="ant-btn" onClick={this.handleClick}>toggle</button>
        {show && <Dialog />}
      </div>
    );
  }
}

export default DialogPage;