/* @flow */

import I18n from 'react-native-i18n'
import en from './en.js'
import de from './de.js'
import _ from 'lodash'

I18n.fallbacks = true
resetI18n()

export function extendI18n(translations: {[string]: any}){
  _.merge(I18n.translations, translations);
}

export function resetI18n(){
  I18n.translations = {
    en: en,
    de: de,
  }
}

export default I18n
