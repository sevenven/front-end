let idSeq = new Date().getTime();

export function createSet(payload) {
  return {
    type: 'SET',
    payload
  }
}

export function createAdd(text) {
  return (dispatch, getState) => {

    setTimeout(() => {
      const { todos } = getState();
      if (!todos.find(todo => todo.text === text)) {
        dispatch({
            type: 'ADD',
            payload: {
              id: ++idSeq,
              text: text,
              complete: false
            }
        })
      }
    }, 3000)
  }
}

export function createRemove(payload) {
  return {
    type: 'REMOVE',
    payload
  }
}

export function createToggle(payload) {
  return {
    type: 'TOGGLE',
    payload
  }
}