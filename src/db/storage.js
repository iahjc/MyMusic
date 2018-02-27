const PLAY_KEY = '__play__'
const PLAY_MAX_LEN = 200

export default class Storage {
  constructor() {
    this.storage = window.localStorage
  }

  /**
   * 返回具体的数据类型
   * @return {[type]} [description]
   */
  get() {
    let strjson = this.storage.getItem(PLAY_KEY)
    let json = JSON.parse(strjson)

    if (json) {
      return json
    } else {
      this.storage.setItem(PLAY_KEY, JSON.stringify([]))
      return []
    }
  }

  savePlayHistory(song) {
    let songs = this.get()
    console.log(songs)
    this.insertArray(songs, song, (item) => {
      return song.id === item.id
    }, PLAY_MAX_LEN)
    this.set(songs)
    return songs
  }

  loadPlayHistory() {
    return this.get()
  }

  set(items) {
    let strjson = JSON.stringify(items)
    this.storage.setItem(PLAY_KEY, strjson)
  }

  insertArray(arr, val, compare, maxLen) {
    const index = arr.findIndex(compare)
    if (index === 0) {
      return
    }
    if (index > 0) {
      arr.splice(index, 1)
    }
    arr.unshift(val)
    if (maxLen && arr.length > maxLen) {
      arr.pop()
    }
  }
 }
