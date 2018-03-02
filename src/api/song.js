import axios from 'axios'
import { createSingerSong } from 'domain/song'

export default class SongApi {
  constructor() {
    this.reg = `^ MusicJsonCallbacksinger_track\\(`
    this.reg2 = '\\)$'
  }

  getSongs(conf) {
    return this._getServerSongs(conf)
  }

  _createSongs(songs) {
    let ret = []
    songs.forEach((musicData) => {
      if (musicData.musicData.albumid) {
        ret.push(createSingerSong(musicData.musicData))
      }
    })
    return ret
  }

  parseSongs(jsonStr) {
    let reg = new RegExp(this.reg)
    let reg2 = new RegExp(this.reg2)
    let json = JSON.parse(jsonStr.replace(reg, '').replace(reg2, ''))
    if (json.subcode === 0) {
      return this._createSongs(json.data.list)
    }
    return false
  }

  _getServerSongs(conf) {
    let params = {
      'g_tk': 5381,
      'jsonpCallback': 'MusicJsonCallbacksinger_track',
      'loginUin': '0',
      'hostUin': '0',
      'format': 'jsonp',
      'inCharset': 'utf8',
      'outCharset': 'utf-8',
      'notice': '0',
      'platform': 'yqq',
      'needNewCode': '0',
      'singermid': conf.mid,
      'order': 'listen',
      'begin': conf.page,
      'num': conf.num,
      'songstatus': '1'
    }

    let url = '/api/getSingerDetail'

    return axios.get(url, {
      params: params
    }).then((res) => {
      return Promise.resolve(res.data)
    })
  }

  getLyric(mid) {
    let params = {
      callback: 'MusicJsonCallback_lrc',
      pcachetime: +new Date(),
      songmid: mid,
      g_tk: '5381',
      jsonpCallback: 'MusicJsonCallback_lrc',
      loginUin: 0,
      hostUin: 0,
      format: 'json',
      inCharset: 'utf8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'yqq',
      needNewCode: 0
    }
    let url = '/api/lyric'
    return axios.get(url, {
      params: params
    }).then((res) => {
      return Promise.resolve(res.data)
    })
  }
}
