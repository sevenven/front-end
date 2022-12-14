import { memo, useRef } from "react";
import './index.scss'

let idSeq = new Date().getTime();

function Control(props) {
  const { addTodo } = props;
  const inputRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    const newText = inputRef.current.value.trim();
    if (newText.length === 0) return;
    addTodo({
      id: ++idSeq,
      text: newText,
      complete: false
    })
    inputRef.current.value = '';
  }

  return (
    <div className="control">
      <h1>todos</h1>
      <form onSubmit={onSubmit}>
        <input
          className="new-todo"
          type='text'
          placeholder="what needs to be done"
          ref={inputRef}
        />
      </form>
    </div>
  )

}

export default memo(Control)