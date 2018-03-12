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
    songsNum,
    ifpicurl,
    nickname,
    logo
  }) {
    this.id = id
    this.songSheetName = songSheetName
    this.songs = songs
    this.desc = desc
    this.creater = creater
    this.headimg = headimg
    this.songsNum = songsNum
    this.ifpicurl = ifpicurl
    this.nickname = nickname
    this.logo = logo
  }

  getJson(songSheet) {
    return {
      'id': songSheet.id,
      'songSheetName': songSheet.songSheetName,
      'songs': songSheet.songs,
      'desc': songSheet.desc,
      'creater': songSheet.creater,
      'headimg': songSheet.headimg,
      'songsNum': songSheet.songsNum,
      'ifpicurl': songSheet.ifpicurl,
      'nickname': songSheet.nickname,
      'logo': songSheet.logo
    }
  }
}
