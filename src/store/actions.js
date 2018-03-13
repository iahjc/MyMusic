import * as types from './mutation-types'
import Storage from 'db/storage'
import {playMode} from 'common/js/playmode'
import {shuffle} from 'common/js/utils/util'

let stroage = new Storage()

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export const selectSingerMusic = function({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_PLAYING, true)
  commit(types.SET_CURRENTINDEX, index)
  commit(types.SET_FULLSCREEN, true)
}

export const randomPlay = function ({commit}, {list}) {
  commit(types.SET_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_CURRENTINDEX, 0)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYING, true)
}

/**
 * 添加歌曲
 * @param  {[type]} commit [description]
 * @param  {[type]} state  [description]
 * @param  {[type]} song   [description]
 * @return {[type]}        [description]
 */
export const insertSong = function ({commit, state}, song) {
  let playlist = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  // 记录当前歌曲
  let currentSong = playlist[currentIndex]
  // 查找当前列表中是否有待插入的歌曲并返回其索引
  let fpIndex = findIndex(playlist, song)
  // 因为是插入歌曲， 所以索引加1
  currentIndex++
  // 插入这首歌到当前索引位置
  playlist.splice(currentIndex, 0, song)
  // 如果已经包含了这首歌
  if (fpIndex > -1) {
    // 如果当前插入的序号大于列表中的序号
    if (currentIndex > fpIndex) {
      playlist.splice(fpIndex, 1)
      currentIndex--
    } else {
      playlist.splice(fpIndex + 1, 1)
    }
  }

  let currentSIndex = findIndex(sequenceList, currentSong) + 1
  let fsIndex = findIndex(sequenceList, song)
  sequenceList.splice(currentSIndex, 0, song)

  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENTINDEX, currentIndex)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYING, true)
}

export const deleteSong = function ({commit, state}, song) {
  let playlist = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  let pIndex = findIndex(playlist, song)
  playlist.splice(pIndex, 1)
  let sIndex = findIndex(sequenceList, song)
  sequenceList.splice(sIndex, 1)
  if (currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex--
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENTINDEX, currentIndex)

  if (!playlist.length) {
    commit(types.SET_PLAYING, false)
  } else {
    commit(types.SET_PLAYING, true)
  }
}

export const deleteSongList = function ({commit}) {
  commit(types.SET_CURRENTINDEX, -1)
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_PLAYING, false)
}

export const savePlayHistory = function({commit}, song) {
  commit(types.SET_PLAY_HISTORY, stroage.savePlayHistory(song))
}
