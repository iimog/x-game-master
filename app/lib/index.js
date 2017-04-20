/* @flow */

import _ from 'lodash'

export type Teams = [Array<number>,Array<number>]

export function shuffleTeams(teams: Teams): Teams{
  let allTeams = [...teams[0], ...teams[1]]
  allTeams = _.shuffle(allTeams)
  let half = Math.ceil(allTeams.length/2)
  let newTeams = [allTeams.slice(0, half),allTeams.slice(half)]
  return newTeams
}
