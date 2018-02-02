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
 * 获取下一个ID
 * @type {[type]}
 */
export function getNextSongSheetId() {
  let songSheets = getSongSheet()
  let size = songSheets.length
  if (size > 0) {
    let lastId = songSheets[size - 1]
    return lastId + 1
  }
  return 0
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
