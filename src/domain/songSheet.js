/**
 * 歌单实体类
 * @type {[type]}
 */
export default class SongSheet {
  constructor({
    id,
    songSheetName,
    songList,
    des,
    creater,
    headimg,
    songsNum
  }) {
    this.id = id
    this.songSheetName = songSheetName
    this.songList = songList
    this.des = des
    this.creater = creater
    this.headimg = headimg
    this.songsNum = songsNum
  }

  getJson(songSheet) {
    return {
      'id': songSheet.id,
      'songSheetName': songSheet.songSheetName,
      'songList': songSheet.songList,
      'des': songSheet.des,
      'creater': songSheet.creater,
      'headimg': songSheet.headimg,
      'songsNum': songSheet.songsNum
    }
  }
}
