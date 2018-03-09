// import {getExpressSong} from 'api/musichall'
import {Base64} from 'js-base64'
import SongApi from 'api/song'
let songApi = new SongApi()
/**
 * 歌曲实体类
 * @type {[type]}
 */
export default class Song {
  constructor({
    id,
    mid,
    singer,
    name,
    album,
    duration,
    image,
    url,
    des,
    isMv,
    isOnly,
    pay,
    count,
    lyricContent,
    lyricTitle,
    description
  }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
    this.des = des
    this.isMv = isMv
    this.isOnly = isOnly
    this.pay = pay
    this.count = count
    this.lyricContent = lyricContent
    this.lyricTitle = lyricTitle
    this.description = description
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      songApi.getLyric(this.mid).then((res) => {
        if (res.retcode === 0) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          let err = 'no lyric'
          reject(err)
        }
      })
    })
  }
}

/**
 * 歌手创建歌曲列表
 * @type {Song}
 */
export function createSingerSong(musicData) {
  let song = new Song({
    id: musicData.albumid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    des: musicData.singer[0].name + ' - ' + musicData.albumname + ' - ' + musicData.albumdesc,
    name: musicData.songname,
    album: musicData.albumname,
    isOnly: musicData.isonly,
    duration: musicData.interval,
    isMv: setIsMv(musicData.vid),
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    lyricContent: musicData.content,
    lyricTitle: musicData.lyric,
    description: musicData.desc,
    url: musicData.url
  })
  return song
}

/**
 * 创建歌曲工厂方法
 * @param  {[type]} musicData [description]
 * @return {[type]}           [description]
 */
export function createSong(musicData) {
  let song = new Song({
    id: musicData.id,
    mid: getMid(musicData),
    singer: filterSinger(musicData.singer),
    des: setDes(musicData.singer[0].name, musicData.album.name),
    name: musicData.name,
    album: musicData.album.name,
    duration: musicData.interval,
    isOnly: musicData.isonly,
    isMv: setIsMv(musicData.mv),
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.album.mid}.jpg?max_age=2592000`,
    pay: musicData.pay,
    count: musicData.cur_song_num,
    lyricContent: musicData.content,
    description: musicData.desc,
    url: musicData.url
  })
  return song
}

function getMid(musicData) {
  if (musicData.mid) {
    return musicData.mid
  } else if (musicData.ksong) {
    return musicData.ksong.mid
  }
}

function setIsMv(mv) {
  if (mv) {
    if (mv === '' || mv.vid === '') {
      return false
    } else {
      return true
    }
  } else {
    return false
  }
}

function setDes(name, albumName) {
  return `${name} - ${albumName}`
}

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}

export function processSongsUrl(songs) {
  if (!songs.length) {
    return Promise.resolve(songs)
  }

  return songApi.getSongsUrl(songs).then((res) => {
    if (res.code === 0) {
      let midUrlInfo = res.url_mid.data.midurlinfo
      midUrlInfo.forEach((info, index) => {
        let song = songs[index]
        song.url = `http://dl.stream.qqmusic.qq.com/${info.purl}`
      })
    }
    return songs
  })
}
