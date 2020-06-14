import React, { Component } from 'react';
import { createPortal } from 'react-dom';

class Dialog extends Component {
  constructor(props) {
    super(props);
    this.node = document.createElement('div');
    document.body.appendChild(this.node)
  }
  componentWillUnmount() {
    document.body.removeChild(this.node);
  }
  render() {
    return createPortal(
      (
        <div className="dialog">
          <h3>Dialog</h3>
        </div>
      ),
      this.node
    );
  }
}

export default Dialog;