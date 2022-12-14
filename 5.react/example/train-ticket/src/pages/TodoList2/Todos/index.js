import { memo } from 'react'
import TodoItem from './Item'
import './index.scss'

function Todos(props) {

  const { todos, removeTodo, toggleTodo } = props

  return (
    <ul className='todos'>
      {
        todos.map(todo => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              removeTodo={removeTodo}
              toggleTodo={toggleTodo}
            />
          )
        })
      }
    </ul>
  )

}

export default memo(Todos)