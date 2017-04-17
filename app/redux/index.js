/* @flow */

// The types of actions that you can dispatch to modify the state of the store
export const types = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  SHUFFLE: 'SHUFFLE'
}

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
  add: (item: string) => {
    return {type: types.ADD, payload: item}
  },
  remove: (index: number) => {
    return {type: types.REMOVE, payload: index}
  },
  shuffle: () => {
    return {type: types.SHUFFLE, payload: null}
  },
}

// Initial state of the store
const initialState = {
  players: ['Hannah', 'Markus', 'Tobi', 'Lo', 'Moritz'],
  teams: [[0,1,2],[3,4]]
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items The array containing the items.
 */
const shuffle = <T>(a: Array<T>): Array<T> => {
    let b = [...a];
    for (let i = b.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        // the next three lines could be replaced by [b[i - 1]b[j]] = [b[j], b[i - 1]] but flow (v0.38.0) does not like it
        let [x,y] = [b[j], b[i - 1]];
        b[i - 1] = x;
        b[j] = y;
    }
    return b;
}

// Function to handle actions and update the state of the store.
// Notes:
// - The reducer must return a new state object. It must never modify
//   the state object. State objects should be treated as immutable.
// - We set \`state\` to our \`initialState\` by default. Redux will
//   call reducer() with no state on startup, and we are expected to
//   return the initial state of the app in this case.
export const reducer = (state: typeof initialState = initialState, action: {type: string, payload: any}) => {
  const {players, teams} = state
  const {type, payload} = action

  switch (type) {
    case types.ADD: {
      let p = [payload, ...players]
      let t = Array.from({length: p.length}, (value, key) => key)
      t = [t.slice(0, Math.ceil(t.length)),t.slice(Math.ceil(t.length))]
      return {
        ...state,
        players: p,
        teams: t
      }
    }
    case types.REMOVE: {
      let p = players.filter((todo, i) => i !== payload)
      let t = Array.from({length: p.length}, (value, key) => key)
      t = [t.slice(0, Math.ceil(t.length)),t.slice(Math.ceil(t.length))]
      return {
        ...state,
        players: p,
        teams: t
      }
    }
    case types.SHUFFLE: {
      let t = Array.from({length: players.length}, (value, key) => key)
      t = shuffle(t)
      t = [t.slice(0, Math.ceil(t.length)),t.slice(Math.ceil(t.length))]
      return {
        ...state,
        teams: t
      }
    }
  }

  return state
}
