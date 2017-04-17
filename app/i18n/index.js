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

/**
 * This function translates the name or instructions from games if there are translations in the json file
 * This separate approach is required as I18n translations can not easily be extended/modified at runtime
 * However the I18n.locale is used to have a uniform locale throughout the app
 * Fallback is the name or instructions given outside of translations
 */
export function gameT(key: ("name" | "instructions"), game: Game){
  let locale: string = I18n.locale
  locale = locale.substring(0, 2)
  let trans = _.get(game, ['translations', locale, key])
  if(typeof trans === 'undefined'){
    trans = game[key];
  }
  return trans;
}
