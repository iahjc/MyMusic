import * as types from './mutation-types'

const matutaions = {
  [types.SET_SHOWNAVSLIDE_STATE](state, flag) {
    state.showNavslide = flag
  },
  [types.SET_PLAYLIST](state, list) {
    state.playList = list
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  },
  [types.SET_CURRENTINDEX](state, index) {
    state.currentIndex = index
  },
  [types.SET_FULLSCREEN](state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYING](state, flag) {
    state.playing = flag
  },
  [types.SET_MODE](state, mode) {
    state.mode = mode
  }
}

export default matutaions
