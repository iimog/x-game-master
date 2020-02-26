import { createStore, StoreCreator } from 'redux';
//import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';
import _ from 'lodash';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

export type Player = {
  name: string,
  active: boolean
}

export type Round = {
  game: string,
  teams: [Array<Player>, Array<Player>],
  winner: -1 | 0 | 1 | null
}

type State = {
    players: Array<Player>,
    games: Array<String>,
    rounds: Array<Round>,
    matchId: number,
    lastChange: number,
}

const INITIAL_STATE: State = {
  players: [
    {name: "Markus", active: true},
    {name: "Hannah", active: true},
    {name: "Tobias", active: true},
    {name: "Moritz", active: true},
  ],
  games: ["Snake 🐍","Tron 🏍","Darts 🎯"],
  rounds: [],
  matchId: -1,
  lastChange: -1,
};

// TODO can I check payload types?
const matchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'START_MATCH':
        // Start new game with players and games (replacing old state)
        return {
            players: action.payload.players,
            games: action.payload.games,
            rounds: [],
            matchId: Date.now(),
            lastChange: Date.now(),
        };
    case 'LOAD_MATCH':
        // Load match with state from payload (replacing old state)
        return action.payload;
    case 'GAME_RESULT':
        // Set result of this game
        let rounds = _.cloneDeep(state.rounds);
        rounds[rounds.length-1].winner = action.payload;
        return {...state, 
            rounds: rounds,
            lastChange: Date.now(),
        };
    case 'START_NEXT_GAME':
        // Add result of this game to previous rounds
        return {...state,
            rounds: [...state.rounds, {
              teams: action.payload,
              game: state.games[state.rounds.length],
              winner: -1
            }],
            lastChange: Date.now(),
        };
    case 'TOGGLE_PLAYER':
        // Toggle active/inactive status of player with payload name
        let newPlayers = state.players.map(p => {
            let newPlayer = p;
            if(p.name == action.payload){
                newPlayer.active = !newPlayer.active;
            }
            return newPlayer;
        })
        return {...state,
            players: newPlayers,
        };
    case 'TOGGLE_GAME_RESULT':
        // Swap winner of a finished game
        let newRounds = _.cloneDeep(state.rounds);
        let winnerBefore = newRounds[action.payload].winner
        if(winnerBefore>=0)
          newRounds[action.payload].winner = winnerBefore == 0 ? 1 : 0
        return {...state, rounds: newRounds, lastChange: Date.now()}
    case 'REMOVE_GAME':
        // Remove a game (can be played or unplayed)
        let newState = _.cloneDeep(state);
        newState.games.splice(action.payload,1)
        if(newState.rounds.length > action.payload){
          newState.rounds.splice(action.payload,1)
        }
        newState.lastChange = Date.now()
        return newState
    default:
      return state
  }
};

const persistedReducer = persistReducer(persistConfig, matchReducer)

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);