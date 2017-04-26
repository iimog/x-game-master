export type Game = {
  name: string,
  instructions: string,
  bestOf: number,
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
  translations: {}
}

export default defaultGame
