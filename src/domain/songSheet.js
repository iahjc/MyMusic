/**
 * 歌单实体类
 * @type {[type]}
 */
export default class SongSheet {
  constructor({
    id,
    songSheetName,
    songs,
    desc,
    creater,
    headimg,
    songsNum
  }) {
    this.id = id
    this.songSheetName = songSheetName
    this.songs = songs
    this.desc = desc
    this.creater = creater
    this.headimg = headimg
    this.songsNum = songsNum
  }

  getJson(songSheet) {
    return {
      'id': songSheet.id,
      'songSheetName': songSheet.songSheetName,
      'songs': songSheet.songs,
      'desc': songSheet.desc,
      'creater': songSheet.creater,
      'headimg': songSheet.headimg,
      'songsNum': songSheet.songsNum
    }
  }
}
