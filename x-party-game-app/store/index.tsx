import { createStore, StoreCreator } from 'redux';

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
    rounds: Array<Round>
}

const INITIAL_STATE: State = {
  players: [
    {name: "Markus", active: true},
    {name: "Hannah", active: true},
    {name: "Bernd", active: true},
    {name: "Moni", active: true},
    {name: "Moritz", active: true},
  ],
  games: [],
  rounds: []
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
        };
    case 'GAME_RESULT':
        // Add result of this game to previous rounds
        return {
            rounds: [...state.rounds, action.payload],
            players: state.players,
            games: state.games,
        };
    default:
      return state
  }
};

export const store = createStore(matchReducer);