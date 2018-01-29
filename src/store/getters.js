export const showNavslide = state => state.showNavslide
export const playList = state => state.playList
export const currentIndex = state => state.currentIndex
export const fullScreen = state => state.fullScreen
export const currentSong = (state) => {
  return state.playList[state.currentIndex] || {}
}
export const playing = state => state.playing
export const mode = state => state.mode
export const singer = state => state.singer
export const navFlag = state => state.navFlag
