/* @flow */

import _ from 'lodash'
import type Game from '../routes/Game/DefaultGame'

// The types of actions that you can dispatch to modify the state of the store
export const types = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  SET_TEAMS: 'SET_TEAMS',
  SET_NUMBER_OF_GAMES: 'SET_NUMBER_OF_GAMES',
  SET_SCORE_INCREASING: 'SET_SCORE_INCREASING',
  SET_PLAY_MODE: 'SET_PLAY_MODE',
  SET_GAMES: 'SET_GAMES',
  ADD_RESULT: 'ADD_RESULT',
  RESET_MATCH: 'RESET_MATCH',
  SET_GAME: 'SET_GAME',
  DELETE_GAME: 'DELETE_GAME',
}

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
  addPlayer: (item: string) => {
    return {type: types.ADD, payload: item}
  },
  removePlayer: (index: number) => {
    return {type: types.REMOVE, payload: index}
  },
  setTeams: (teams: [Array<number>,Array<number>]) => {
    return {type: types.SET_TEAMS, payload: teams}
  },
  setNumberOfGames: (numberOfGames: number) => {
    return {type: types.SET_NUMBER_OF_GAMES, payload: numberOfGames}
  },
  setScoreIncreasing: (increasing: boolean) => {
    return {type: types.SET_SCORE_INCREASING, payload: increasing}
  },
  setPlayMode: (mode: string) => {
    return {type: types.SET_PLAY_MODE, payload: mode}
  },
  setGames: (games: {[string]: Game}) => {
    return {type: types.SET_GAMES, payload: games}
  },
  addResult: (gameID: string, winnerTeam: number) => {
    return {type: types.ADD_RESULT, payload: {gameID: gameID, winnerTeam: winnerTeam}}
  },
  resetMatch: () => {
    return {type: types.RESET_MATCH, payload: null}
  },
  setGame: (gameID: string, newGame: Object) => {
    return {type: types.SET_GAME, payload: {id: gameID, game: newGame}}
  },
  deleteGame: (gameID: string) => {
    return {type: types.DELETE_GAME, payload: {id: gameID}}
  }
}

export const PlayMode = {
  CLASSIC: "CLASSIC",
  CLUB: "CLUB",
}

const simpleGames = require('../games/simple.json')
// Initial state of the store
const initialState = {
  collection: simpleGames,
  players: ['Hannah', 'Markus', 'Tobi', 'Lo', 'Moritz'],
  teams: [[0,1,2],[3,4]],
  games: {},
  playedGames: [],
  teamWin: [],
  playerWin: [],
  matchSettings: {
    playMode: PlayMode.CLASSIC,
    numberOfGames: 7,
    scoreIncreasing: true,
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

function isValidPlayMode(playMode: string): boolean{
  return playMode === PlayMode.CLASSIC || playMode === PlayMode.CLUB
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
    case types.SET_SCORE_INCREASING: {
      return {
        ...state,
        matchSettings: {
          ...state.matchSettings,
          scoreIncreasing: payload,
        }
      }
    }
    case types.SET_PLAY_MODE: {
      if(isValidPlayMode(payload)){
        return {
          ...state,
          matchSettings: {
            ...state.matchSettings,
            playMode: payload,
          }
        }
      } else {
        return state
      }
    }
    case types.SET_GAMES: {
      return {
        ...state,
        games:  payload,
      }
    }
    case types.ADD_RESULT: {
      let teamWin = [...state.teamWin]
      let playerWin = [...state.playerWin]
      if(payload.winnerTeam != -1){
        teamWin.push(payload.winnerTeam)
        playerWin.push([...state.teams[payload.winnerTeam]])
      }
      return {
        ...state,
        playedGames: [...state.playedGames, payload.gameID],
        teamWin: teamWin,
        playerWin: playerWin,
      }
    }
    case types.RESET_MATCH: {
      return {
        ...state,
        playedGames: [],
        teamWin: [],
        playerWin: [],
      }
    }
    case types.SET_GAME: {
      let newCollection = {...state.collection}
      newCollection[payload.id] = payload.game
      return {
        ...state,
        collection: newCollection
      }
    }
    case types.DELETE_GAME: {
      let newCollection = {...state.collection}
      delete newCollection[payload.id]
      return {
        ...state,
        collection: newCollection
      }
    }
  }

  return state
}
