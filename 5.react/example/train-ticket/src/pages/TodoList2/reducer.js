// export function reducer (state, action) {
// const { type, payload} = action;
// const { todos, incrementCount } = state;
// switch(type) {
//   case 'SET':
//     return {
//       ...state,
//       todos: payload,
//       incrementCount: incrementCount + 1
//     }
//   case 'ADD':
//     return {
//       ...state,
//       todos: [...todos, payload],
//       incrementCount: incrementCount + 1
//     }
//   case 'REMOVE':
//     return {
//       ...state,
//       todos: todos.filter(todo => todo.id !== payload)

//     }
//   case 'TOGGLE':
//     return {
//       ...state,
//       todos: todos.map(todo => todo.id === payload ? { ...todo, complete: !todo.complete } : todo)
//     }
//   default:
//     return state
// }
// }

export const reducer = {
  todos(state, action) {
    const { type, payload } = action;
    switch (type) {
      case 'SET':
        return payload
      case 'ADD':
        return [...state, payload]
      case 'REMOVE':
        return state.filter(todo => todo.id !== payload)
      case 'TOGGLE':
        return state.map(todo => todo.id === payload ? { ...todo, complete: !todo.complete } : todo)
      default:
        return state
    }
  },
  incrementCount(state, action) {
    const { type } = action;
    switch (type) {
      case 'SET':
        return state + 1
      case 'ADD':
        return state + 1
      default:
        return state
    }
  }
}