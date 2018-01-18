export const showNavslide = state => state.showNavslide
export const playList = state => state.playList
export const currentIndex = state => state.currentIndex
export const fullScreen = state => state.fullScreen

export const currentSong = (state) => {
  console.log(state.playList[state.currentIndex])
  return state.playList[state.currentIndex] || {}
}
