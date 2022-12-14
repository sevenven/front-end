import { memo } from "react"

function Item(props) {

  const { todo: {
    id,
    text,
    complete
  }, removeTodo, toggleTodo } = props

  const onChange = () => {
    toggleTodo(id)
  }

  const onRemove = () => {
    removeTodo(id)
  }


  return (
    <li className="todo-item">
      <input
        type="checkbox"
        onChange={onChange}
        checked={complete}
      />
      <label className={complete ? 'complete' : ''}>{text}</label>
      <button onClick={onRemove}>&#xd7;</button>
    </li>
  )

}

export default memo(Item)