/* @flow */

import _ from 'lodash'

// The types of actions that you can dispatch to modify the state of the store
export const types = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  SET_TEAMS: 'SET_TEAMS',
  SET_NUMBER_OF_GAMES: 'SET_NUMBER_OF_GAMES',
}

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
  add: (item: string) => {
    return {type: types.ADD, payload: item}
  },
  remove: (index: number) => {
    return {type: types.REMOVE, payload: index}
  },
  setTeams: (teams: [Array<number>,Array<number>]) => {
    return {type: types.SET_TEAMS, payload: teams}
  },
  setNumberOfGames: (numberOfGames: number) => {
    return {type: types.SET_NUMBER_OF_GAMES, payload: numberOfGames}
  },
}

// Initial state of the store
const initialState = {
  players: ['Hannah', 'Markus', 'Tobi', 'Lo', 'Moritz'],
  teams: [[0,1,2],[3,4]],
  matchSettings: {
    numberOfGames: 7,
  },
}

function isValidTeams(teams: [Array<number>,Array<number>], numTeams: number): boolean{
  let allTeams = [...teams[0], ...teams[1]]
  if(allTeams.length !== numTeams){
    return false
  }
  for(let i=0; i<numTeams; i++){
    if(_.indexOf(allTeams, i) === -1){
      return false
    }
  }
  return true
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
      t = [t.slice(0, Math.ceil(t.length/2)),t.slice(Math.ceil(t.length/2))]
      return {
        ...state,
        players: p,
        teams: t
      }
    }
    case types.REMOVE: {
      let p = players.filter((todo, i) => i !== payload)
      let t = Array.from({length: p.length}, (value, key) => key)
      t = [t.slice(0, Math.ceil(t.length/2)),t.slice(Math.ceil(t.length/2))]
      return {
        ...state,
        players: p,
        teams: t
      }
    }
    case types.SET_TEAMS: {
      if( isValidTeams(payload, players.length)){
        return {
          ...state,
          teams: payload
        }
      } else {
        return state
      }
    }
    case types.SET_NUMBER_OF_GAMES: {
      return {
        ...state,
        matchSettings: {
          ...state.matchSettings,
          numberOfGames: payload,
        }
      }
    }
  }

  return state
}
