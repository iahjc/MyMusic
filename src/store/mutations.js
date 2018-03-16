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
  },
  [types.SET_KEYWORDS](state, keywords) {
    state.keywords = keywords
  },
  [types.SET_PLAY_HISTORY](state, history) {
    state.playHistory = history
  },
  [types.SET_SHARESTATE](state, flag) {
    state.shareState = flag
  },
  [types.SET_AUXILIARYSTATE](state, flag) {
    state.auxiliaryState = flag
  },
  [types.SET_AUXILIARYLIST](state, list) {
    state.auxiliaryList = list
  },
  [types.SET_AUXILIARYACTIONS](state, list) {
    state.auxiliaryActions = list
  },
  [types.SET_MESSAGESTATE](state, flag) {
    state.messageState = flag
  },
  [types.SET_MESSAGEOPTIONS](state, obj) {
    state.messageOptions = obj
  }
}

export default matutaions
