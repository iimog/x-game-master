import I18n from 'react-native-i18n'

I18n.fallbacks = true
I18n.translations = {
  en: {
    newGame: "New Game",
    continueGame: "Continue Game",
    settings: "Settings"
  },
  de: {
    newGame: "Neues Spiel",
    continueGame: "Spiel fortsetzen",
    settings: "Einstellungen"
  }
}

export default I18n
