export const showNavslide = state => state.showNavslide
export const playList = state => state.playList
export const currentIndex = state => state.currentIndex
export const sequenceList = state => state.sequenceList
export const fullScreen = state => state.fullScreen
export const currentSong = (state) => {
  return state.playList[state.currentIndex] || {}
}
export const playing = state => state.playing
export const mode = state => state.mode
export const singer = state => state.singer
export const navFlag = state => state.navFlag
export const userInfo = state => state.userInfo
export const catName = state => state.catName
export const topList = state => state.topList
export const keywords = state => state.keywords
export const playHistory = state => state.playHistory
export const shareState = state => state.shareState
export const auxiliaryState = state => state.auxiliaryState
export const auxiliaryList = state => state.auxiliaryList
export const auxiliaryActions = state => state.auxiliaryActions
