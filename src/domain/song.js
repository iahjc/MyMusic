import {getExpressSong} from 'api/musichall'
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
    des
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
  }
}

/**
 * 创建歌曲工厂方法
 * @param  {[type]} musicData [description]
 * @return {[type]}           [description]
 */
export function createSong(musicData) {
  let song = new Song({
    id: musicData.id,
    mid: musicData.mid,
    singer: filterSinger(musicData.singer),
    des: setDes(musicData.singer[0].name, musicData.album.name),
    name: musicData.name,
    album: musicData.album.name,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.album.mid}.jpg?max_age=2592000`
  })
  let callbackName = 'jb' + Math.random(10000) + 'jb'
  getExpressSong(song.mid, 'C400' + musicData.mid + '.m4a', callbackName).then((res) => {
    let reg = new RegExp(`^${callbackName}\\(`)
    let reg2 = new RegExp('\\)$')
    res = res.replace(reg, '').replace(reg2, '')
    res = JSON.parse(res)
    song.url = `http://dl.stream.qqmusic.qq.com/${res.data.items[0].filename}?vkey=${res.data.items[0].vkey}&guid=8707000960&uin=0&fromtag=66`
  })
  return song
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
