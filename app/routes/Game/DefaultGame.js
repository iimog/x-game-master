export type Game = {
  name: string,
  instructions: string,
  bestOf: number,
  translations: {
    ["en"|"de"]: {
      name?: string,
      instructions?: string,
    }
  }
}

const defaultGame: Game = {
  name: "Default Game",
  instructions: "Dummy Instructions",
  bestOf: 9,
  translations: {}
}

export default defaultGame
