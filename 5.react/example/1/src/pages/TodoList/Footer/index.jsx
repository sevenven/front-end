import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'

export default class Footer extends Component {

  static propTypes = {
    todos: PropTypes.array.isRequired,
    checkAllTodo: PropTypes.func.isRequired,
    clearAllDone: PropTypes.func.isRequired
  }

  handleCheckAll = (event) => {
    this.props.checkAllTodo(event.target.checked)
  }

  handleClearAllDone = () => {
    this.props.clearAllDone();
  }

  render() {

    const { todos } = this.props;
    const doneCount = todos.reduce((pre, cur) => pre + (cur.done ? 1 : 0), 0)
    return (
      <div className="todo-footer">
        <label>
          <input type="checkbox" checked={ todos.length && doneCount === todos.length} onChange={this.handleCheckAll} />
        </label>
        <span>
          <span>已完成{doneCount}</span> / 全部{todos.length}
        </span>
        <button className="btn btn-danger" onClick={this.handleClearAllDone}>清除已完成任务</button>
      </div>
    )
  }
}
