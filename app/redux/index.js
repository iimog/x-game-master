/* @flow */

// The types of actions that you can dispatch to modify the state of the store
export const types = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
}

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
  add: (item: string) => {
    return {type: types.ADD, payload: item}
  },
  remove: (index: number) => {
    return {type: types.REMOVE, payload: index}
  }
}

// Initial state of the store
const initialState = {
  players: ['Hannah', 'Markus', 'Tobi', 'Lo', 'Moritz'],
}

// Function to handle actions and update the state of the store.
// Notes:
// - The reducer must return a new state object. It must never modify
//   the state object. State objects should be treated as immutable.
// - We set \`state\` to our \`initialState\` by default. Redux will
//   call reducer() with no state on startup, and we are expected to
//   return the initial state of the app in this case.
export const reducer = (state: typeof initialState = initialState, action: {type: string, payload: any}) => {
  const {players} = state
  const {type, payload} = action

  switch (type) {
    case types.ADD: {
      return {
        ...state,
        players: [payload, ...players],
      }
    }
    case types.REMOVE: {
      return {
        ...state,
        players: players.filter((todo, i) => i !== payload),
      }
    }
  }

  return state
}
