/**
 * 专辑实体类
 */
 export default class Album {
   constructor({albumID, albumMID, albumName, albumtype, desc, company, lan, pubTime}) {
     this.albumID = albumID
     this.albumMID = albumMID
     this.albumName = albumName
     this.albumtype = albumName
     this.headimg = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albumMID}.jpg?max_age=2592000`
     this.desc = desc
     this.company = company
     this.lan = lan
     this.pubTime = pubTime
   }
 }

 export function createAlbum(album) {
   return new Album({
     albumID: album.albumID,
     albumMID: album.albumMID,
     albumName: album.albumName,
     albumtype: album.albumtype,
     desc: album.desc,
     company: album.company,
     lan: album.lan,
     pubTime: album.pubTime
   })
 }
