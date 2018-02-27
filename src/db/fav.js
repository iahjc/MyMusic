const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LEN = 200

export default class Fav {
  constructor() {
    this.storage = window.localStorage
  }

  /**
   * 返回具体的数据类型
   * @return {[type]} [description]
   */
  get() {
    let strjson = this.storage.getItem(FAVORITE_KEY)
    let json = JSON.parse(strjson)

    if (json) {
      return json
    } else {
      this.storage.setItem(FAVORITE_KEY, JSON.stringify([]))
      return []
    }
  }

  saveFavoriteList(song) {
    let songs = this.get()
    this.insertArray(songs, song, (item) => {
      return song.id === item.id
    }, FAVORITE_MAX_LEN)
    this.set(songs)
    return songs
  }

  loadFavoriteList() {
    return this.get()
  }

  set(items) {
    let strjson = JSON.stringify(items)
    this.storage.setItem(FAVORITE_MAX_LEN, strjson)
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
