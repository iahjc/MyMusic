import {playMode} from 'common/js/playmode'
import Storage from 'db/storage'

let stroage = new Storage()

const state = {
  showNavslide: false,
  playList: [],
  sequenceList: [],
  currentIndex: -1,
  fullScreen: false,
  playing: false,
  mode: playMode.sequence,
  singer: {},
  navFlag: false,
  userInfo: {},
  catName: '',
  topList: {},
  keywords: '',
  playHistory: stroage.loadPlayHistory(),
  shareState: false,
  auxiliaryState: false,
  auxiliaryList: [],
  auxiliaryActions: [],
  messageState: false,
  messageOptions: {}
}

export default state
