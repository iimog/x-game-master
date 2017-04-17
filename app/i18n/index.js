/* @flow */

import I18n from 'react-native-i18n'
import en from './en.js'
import de from './de.js'
import _ from 'lodash'
import type Game from '../routes/Game/DefaultGame'

I18n.fallbacks = true
I18n.translations = {
  en: en,
  de: de,
}

export default I18n

export function gameT(key: ("name" | "instructions"), game: Game){
  let locale: string = I18n.locale
  locale = locale.substring(0, 2)
  let trans = _.get(game, ['translations', locale, key])
  if(typeof trans === 'undefined'){
    trans = game[key];
  }
  return trans;
}
