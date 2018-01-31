import {playMode} from 'common/js/playmode'

const state = {
  showNavslide: false,
  playList: [],
  sequenceList: [],
  currentIndex: 0,
  fullScreen: false,
  playing: false,
  mode: playMode.sequence,
  singer: {},
  navFlag: false,
  userInfo: {}
}

export default state
