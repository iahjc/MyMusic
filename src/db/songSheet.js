/**
 * 歌单数据操作
 */
let storage = window.localStorage

// 添加歌单
export function insertSongSheet(songSheet) {
  let songSheets = storage.getItem('songSheets')
  if (songSheets) {
    songSheets = JSON.parse(songSheets)
    if (songSheets.length > 0) {
      songSheets.push(songSheet)
      storage.setItem('songSheets', JSON.stringify(songSheets))
      return false
    }
  }
  songSheets = []
  songSheets.push(songSheet)
  storage.setItem('songSheets', JSON.stringify(songSheets))
}

/**
 * 根据id获取自建歌单
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
export function findSongSheet(id) {
  let songSheets = JSON.parse(storage.getItem('songSheets'))
  let songSheet = null
  if (songSheets && songSheets.length > 0) {
    songSheets.forEach((item) => {
      console.log(item.id + '  ' + id)
      if (parseInt(item.id) === parseInt(id)) {
        songSheet = item
        return false
      }
    })
  }
  return songSheet
}

/**
 * 根据自建歌单 添加歌曲
 * @param {[type]} id [description]
 */
export function addSongs(id, song) {
  let songSheets = JSON.parse(storage.getItem('songSheets'))
  let bool = true
  if (songSheets && songSheets.length > 0) {
    songSheets.forEach((item) => {
      if (parseInt(item.id) === parseInt(id)) {
        if (item.songs && item.songs.length >= 0) {
          if (findIndexSongs(item.songs, song.mid)) {
            item.songs.push(song)
            item.songsNum = item.songs.length
          }
        } else {
          bool = false
        }
      }
    })
    if (bool) {
      storage.setItem('songSheets', JSON.stringify(songSheets))
    }
    return bool
  }
//  return false
}

function findIndexSongs(songs, mid) {
  return songs.every((item) => {
    return item.mid !== mid
  })
}

/**
 * 获取下一个ID
 * @type {[type]}
 */
export function getNextSongSheetId() {
  // let songSheets = getSongSheet()
  // let size = songSheets.length
  // if (size > 0) {
  //   let lastId = songSheets[size - 1]
  //   return lastId + 1
  // }
  return new Date().getTime()
}

/**
 * 判断歌单名称是否重复
 * @param  {[type]}  songSheets [description]
 * @param  {[type]}  songSheet  [description]
 * @return {Boolean}            [description]
 */
export function isSongSheet(songSheetName) {
  let songSheets = storage.getItem('songSheets')
  let bool = false
  if (songSheets) {
    songSheets = JSON.parse(songSheets)
    if (songSheets.length > 0) {
      songSheets.forEach((item) => {
        console.log(item.songSheetName)
        if (songSheetName === item.songSheetName) {
          bool = true
        }
      })
    }
  }
  if (bool) {
    return true
  } else {
    return false
  }
}
// // 修改歌单
// export updateSongSheet() {
//
// }
//
// 删除歌单
export function deleteSongSheet(arr) {
  let songSheets = getSongSheet()
  if (songSheets.length > 0) {
    let indexes = []
    songSheets.forEach((item, index) => {
      arr.forEach((obj) => {
        if (item.id === obj.id && item.songSheetName === obj.songSheetName) {
          indexes.push(index)
        }
      })
    })
    indexes.forEach((item, index) => {
      songSheets.splice((item - index), 1)
    })
  }
  if (songSheets.length <= 0) {
    songSheets = []
  }
  storage.setItem('songSheets', JSON.stringify(songSheets))
}
//
// 获得歌单
export function getSongSheet() {
  let songSheets = storage.getItem('songSheets')
  if (songSheets) {
    return JSON.parse(songSheets)
  }
  return []
}
