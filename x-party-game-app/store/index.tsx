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

const matchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state
  }
};

export const store = createStore(matchReducer);