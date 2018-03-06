export const showNavslide = state => state.showNavslide
export const playList = state => state.playList
export const currentIndex = state => state.currentIndex
export const sequenceList = state => state.sequenceList
export const fullScreen = state => state.fullScreen
export const currentSong = (state) => {
  console.log(233232)
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
