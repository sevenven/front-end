import React, { Component } from 'react'
import './index.css'

export default class Item extends Component {

  state = {
    isHover: false
  }

  handleMouseEnter = () => {
    this.setState({
      isHover: true
    })
  }

  handleMouseLeave = () => {
    this.setState({
      isHover: false
    })
  }

  handleCheck = (id) => {
    return (event) => {
      this.props.changeTodo(id, event.target.checked)
    }
  }

  handleDetete = (id) => {
    this.props.deleteTodo(id)
  }

  render() {

    const { todo } = this.props;
    const { isHover } = this.state;

    return (
      <li onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} style={{ backgroundColor: isHover ? '#eee' : '#fff'}}>
        <label>
          <input type="checkbox" checked={todo.done} onChange={this.handleCheck(todo.id)} />
          <span>{todo.name}</span>
        </label>
        <button className="btn btn-danger" style={{display: `${isHover ? 'block' : 'none'}`}} onClick={() => {
          this.handleDetete(todo.id)
        }} >删除</button>
      </li>
    )
  }
}
