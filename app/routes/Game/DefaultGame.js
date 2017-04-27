export type Game = {
  name: string,
  instructions: string,
  bestOf: number,
  activePlayers: number,
  tiePossible: boolean,
  translations: {
    ["string"]: {
      name?: string,
      instructions?: string,
    }
  }
}

const defaultGame: Game = {
  name: "Default Game",
  instructions: "Dummy Instructions",
  bestOf: 5,
  activePlayers: 1,
  tiePossible: false,
  translations: {}
}

export default defaultGame
