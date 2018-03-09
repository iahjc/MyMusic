import axios from 'axios'
import { getUid } from 'common/js/utils/uid'
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

  getSongsUrl(songs) {
    const url = '/api/getPurlUrl'
    let mids = []
    let types = []

    songs.forEach((song) => {
      mids.push(song.mid)
      types.push(0)
    })

    const commonParams = {
      g_tk: 1928093487,
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      format: 'jsonp'
    }

    const urlMid = this._getUrlMid(mids, types)

    const data = Object.assign({}, commonParams, {
      g_tk: 5381,
      format: 'json',
      platform: 'h5',
      needNewCode: 1,
      uin: 0
    })

    return new Promise((resolve, reject) => {
      let tryTime = 3

      function request() {
        return axios.post(url, {
          comm: data,
          url_mid: urlMid
        }).then((response) => {
          const res = response.data
          if (res.code === 0) {
            let urlMid = res.url_mid
            if (urlMid && urlMid.code === 0) {
              const info = urlMid.data.midurlinfo[0]
              if (info && info.purl) {
                resolve(res)
              } else {
                retry()
              }
            } else {
              retry()
            }
          } else {
            retry()
          }
        })
      }

      function retry() {
        if (--tryTime >= 0) {
          request()
        } else {
          reject(new Error('Can not get the songs url'))
        }
      }

      request()
    })
  }

  _getUrlMid(mids, types) {
    const guid = getUid()
    return {
      module: 'vkey.GetVkeyServer',
      method: 'CgiGetVkey',
      param: {
        guid,
        songmid: mids,
        songtype: types,
        uin: '0',
        loginflag: 0,
        platform: '23'
      }
    }
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
