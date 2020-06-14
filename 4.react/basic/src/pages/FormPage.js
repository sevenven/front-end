import React, { Component } from 'react';

class FormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
  }
  submit = () => {
    const username = this.refs.username.value;
    console.log('username: ', username);
    console.log('username: ', this.state.username);
  }
  usernameChange = event => {
    this.setState({
      username: event.target.value
    });
  }
  render() {
    const { username } = this.state;
    return (
      <div>
        <h3>FormPage</h3>
        {/* 非受控组件 */}
        <input ref="username" />
        {/* 受控组件 */}
        <input onChange={this.usernameChange} value={username} />
        <button onClick={this.submit}>提交</button>
      </div>
    );
  }
}

export default FormPage;
