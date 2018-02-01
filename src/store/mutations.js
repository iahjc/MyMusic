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
  },
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.SET_NAVFLAG](state, flag) {
    state.navFlag = flag
  },
  [types.SET_USERINFO](state, user) {
    state.userInfo = user
  },
  [types.SET_CATNAME](state, name) {
    state.catName = name
  },
  [types.SET_TOPLIST](state, list) {
    state.topList = list
  }
}

export default matutaions
