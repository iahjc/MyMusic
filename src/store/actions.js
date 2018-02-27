import * as types from './mutation-types'
import Storage from 'db/storage'

let stroage = new Storage()

export const selectSingerMusic = function({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAYING, true)
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_CURRENTINDEX, index)
  commit(types.SET_FULLSCREEN, true)
}

export const savePlayHistory = function({commit}, song) {
  commit(types.SET_PLAY_HISTORY, stroage.savePlayHistory(song))
}
