import React, { Component } from 'react'
import { nanoid } from 'nanoid'
import Header from './Header'
import List from './List'
import Footer from './Footer'
import './index.css'

export default class TodoList extends Component {

  state = {
    todos: [
      {
        id: nanoid(),
        name: '吃饭',
        done: true
      },
      {
        id: nanoid(),
        name: '睡觉',
        done: true
      },
      {
        id: nanoid(),
        name: '写代码',
        done: false
      },
      {
        id: nanoid(),
        name: '逛街',
        done: false
      },
    ]
  }

  addTodo = (name) => {
    const { todos } = this.state;
    this.setState({
      todos: [...todos, {
        id: nanoid(),
        name,
        done: false
      }]
    })
  }

  changeTodo = (id, done) => {
    let { todos } = this.state;
    todos = todos.map(todo => {
      if (todo.id === id)
        todo.done = done
      return todo;
    })
    this.setState({
      todos
    })
  }

  deleteTodo = (id) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    })
  }

  checkAllTodo = (done) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.map((todo) => {
        return { ...todo, done }
      })
    })
  }

  clearAllDone = () => {
    const { todos } = this.state
    this.setState({
      todos: todos.filter((todo) => !todo.done)
    })
  }

  render() {

    const { todos } = this.state;

    return (
      <div className="todo-container">
        <div className="todo-wrap">
          <Header addTodo={this.addTodo} />
          <List todos={todos} changeTodo={this.changeTodo} deleteTodo={this.deleteTodo} />
          <Footer todos={todos} checkAllTodo={this.checkAllTodo} clearAllDone={this.clearAllDone} />
        </div>
      </div>
    )
  }
}
