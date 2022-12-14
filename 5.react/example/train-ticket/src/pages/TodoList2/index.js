import { useEffect, useState } from "react";
import Control from "./Control"
import Todos from "./Todos"
import { createAdd, createRemove, createSet, createToggle } from './action'
import { bindActionCreators, combineReducers } from "./util";
import { reducer } from './reducer'
import './index.scss';

const LS_KEY = '@#$sbdjcbdjs';

let store = {
  todos: [],
  incrementCount: 0,
}

export default function TodoList() {

  const [todos, setTodos] = useState([]);
  const [incrementCount, setIncrementCount] = useState(0);

  const dispatch = (action) => {

    const setter = {
      todos: setTodos,
      incrementCount: setIncrementCount
    }

    if (typeof action === 'function') {
      action(dispatch, () => store);
      return;
    }

    const newSate = combineReducers(reducer)(store, action);
    for (let key in newSate) {
      setter[key](newSate[key])
    }
  }

  useEffect(() => {
    // console.log('执行一下')
    const todos = JSON.parse(localStorage.getItem(LS_KEY)) || [];
    dispatch(createSet(todos))
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    todos.length && localStorage.setItem(LS_KEY, JSON.stringify(todos))
  }, [todos]);

  useEffect(() => {
    Object.assign(store, {
      todos,
      incrementCount
    })
  }, [todos, incrementCount])

  return (
    <div className="todo-list">
      <Control
        {
        ...bindActionCreators({
          addTodo: createAdd
        }, dispatch)
        }
      />
      <Todos
        todos={todos}
        {
        ...bindActionCreators({
          removeTodo: createRemove,
          toggleTodo: createToggle
        }, dispatch)
        }
      />
    </div>
  )

}