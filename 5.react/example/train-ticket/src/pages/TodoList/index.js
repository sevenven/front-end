import { useCallback, useEffect, useState } from "react";
import Control from "./Control"
import Todos from "./Todos"
import './index.scss';

const LS_KEY = '@#$sbdjcbdjs'

export default function TodoList () {

  const [todos, setTodos] = useState([]);

  const addTodo = useCallback((todo) => {
    setTodos(todos => [...todos, todo])
  }, [])

  const removeTodo = useCallback((id) => {
    setTodos(todos => todos.filter(todo => todo.id !== id))
  }, [])

  const toggleTodo = useCallback((id) => {
    setTodos(todos => todos.map(todo => todo.id === id ? {...todo, complete: !todo.complete } : todo))
  }, [])

  useEffect(() => {
    // console.log('执行一下')
    const todos = JSON.parse(localStorage.getItem(LS_KEY)) || [];
    setTodos(todos)
  }, []);

  useEffect(() => {
    todos.length && localStorage.setItem(LS_KEY, JSON.stringify(todos))
  }, [todos]);

  return (
    <div className="todo-list">
      <Control 
        addTodo={addTodo} 
      />
      <Todos 
        todos={todos}
        removeTodo={removeTodo}
        toggleTodo={toggleTodo}
      />
    </div>
  )

}