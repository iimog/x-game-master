import { createStore, StoreCreator } from 'redux'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer } from 'redux-persist'
import _ from 'lodash'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

export type Player = {
  name: string,
  active: boolean
}

export type Game = {
  name: string,
  fixedPosition: boolean
}

export type Round = {
  game: Game,
  teams: [Array<Player>, Array<Player>],
  winner: -1 | 0 | 1
}

export type State = {
    players: Array<Player>,
    games: Array<Game>,
    rounds: Array<Round>,
    matchId: number,
    lastChange: number,
}

export type Match = {
  players: Array<Player>,
  games: Array<Game>,
  rounds: Array<Round>,
  lastChange: number
}

const INITIAL_STATE: State = {
  players: [],
  games: [],
  rounds: [],
  matchId: -1,
  lastChange: -1,
};

function withTime<T>(reducer: (state: State, action: PayloadAction<T & { time: number }>)=>any){
 return  {
   reducer,
   prepare(payload: T){
     return { payload: {...payload, time: Date.now()}}
   }
 }
}

// TODO can I check payload types?
const matchSlice = createSlice({
  name: 'match',
  initialState: INITIAL_STATE,
  reducers: {
    reset(state){
      state.rounds = []; 
      state.lastChange = -1; 
      state.matchId = -1
    },
    startMatch: withTime<{players: Player[], games: Game[]}>((state, action) => {
      return {
        players: action.payload.players,
        games: action.payload.games,
        rounds: [],
        matchId: action.payload.time,
        lastChange: action.payload.time,
      }
    }),
    loadMatch(state, action: PayloadAction<State>){
      return action.payload
    },
    gameResult: withTime<{winnerIndex: 0|-1|1}>((state, {payload}) => {
      state.rounds[state.rounds.length-1].winner = payload.winnerIndex
      state.lastChange = payload.time
    }),
    startNextGame: withTime<{teams: [Player[], Player[]]}>((state, {payload: {teams, time}}) => {
      state.rounds.push({
        teams,
        game: state.games[state.rounds.length],
        winner: -1
      })
      state.lastChange = time
    }),
    togglePlayer(state, action: PayloadAction<string>){
      const player = state.players.find(x => x.name == action.payload)
      if(player){
        player.active = !player.active
      }
    },
    toggleGameResult: withTime<{roundIndex: number}>((state, { payload: {roundIndex, time}}) => {
      const round = state.rounds[roundIndex]
      round.winner = round.winner == 0 ? 1 : 0
      state.lastChange = time
    }),
    removeGame: withTime<{roundIndex: number}>((state, {payload: {roundIndex, time}}) => {
      state.games.splice(roundIndex, 1)
      if(state.rounds.length > roundIndex){
        state.rounds.splice(roundIndex, 1)
      }
      state.lastChange = time
    })
  }
})

declare const dispatch: import("@reduxjs/toolkit").Dispatch;
//dispatch(matchSlice.actions.startMatch({  }))

const persistedReducer = persistReducer(persistConfig, matchSlice.reducer)

export const { actions } = matchSlice
export const store = createStore(persistedReducer)
export const persistor = persistStore(store)