import Jsonp from 'jsonp'
import axios from 'axios'
/**
 * qq音乐上抓取banner数据
 * @return {[type]} 返回一个promise对象
 */
export function getSlideData() {
  let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=1152921504662152394&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1515637692432'
  return new Promise(function(resolve, reject) {
    Jsonp(url, {
      param: 'jsonpCallback'
    }, function(err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

/**
 * 获取歌曲播放时间戳
 * @return {[type]} [description]
 */
export function getExpressSong(songmid, filename, callback) {
  let url = '/api/getExpressSong'
  let data = {
    'g_tk': '1928093487',
    'inCharset': 'utf-8',
    'outCharset': 'utf-8',
    'notice': '0',
    'format': 'json',
    'cid': '205361747',
    'platform': 'yqq',
    'hostUin': '0',
    'needNewCode': '0',
    'uin': '0',
    'songmid': songmid,
    'filename': filename,
    'guid': '8707000960',
    'callback': callback
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取收藏量
 * @param  {[type]} disstid [description]
 * @return {[type]}         [description]
 */
export function getCollectionNum(disstid) {
  const url = '/api/getCollectionNum'
  let callback = 'getFavNum' + disstid
  const data = {
    'g_tk': '5381',
    'jsonpCallback': 'getFavNum2979243714',
    'loginUin': '0',
    'hostUin': '0',
    'format': 'jsonp',
    'inCharset': 'utf8',
    'outCharset': 'utf-8',
    'notice': '0',
    'platform': 'yqq',
    'needNewCode': '0',
    'cid': '322',
    'nocompress': '1',
    'disstid': disstid,
    'callback': callback
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 歌单列表
 * @type {String}
 */
export function getSongList(disstid) {
  const url = '/api/getSongList'
  const data = {
    'g_tk': '1928093487',
    'uin': '0',
    'format': 'jsonp',
    'inCharset': 'utf-8',
    'outCharset': 'utf-8',
    'notice': '0',
    'platform': 'yqq',
    'needNewCode': '0',
    'new_format': '1',
    'disstid': disstid,
    'jsonpCallback': 'playlistinfoCallback',
    'type': '1',
    'json': '1',
    'utf8': '1',
    'onlysong': '0'
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 歌单推荐
 * @return {[type]} [description]
 */
export function singerRecommend() {
  const url = '/api/singerRecommend'
  const commonParams = {
    g_tk: 1928093487,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp'
  }

  // const options = {
  //   param: 'jsonpCallback'
  // }

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 歌手列表
 * @return {[type]} [description]
 */
export function singerList(condition) {
  let url = `/api/getSingerList`
  let params = {
    'channel': 'singer',
    'page': 'list',
    'key': condition,
    'pagesize': '100',
    'pagenum': '1',
    'g_tk': '5381',
    'jsonpCallback': 'GetSingerListCallback',
    'loginUin': '0',
    'hostUin': '0',
    'format': 'jsonp',
    'inCharset': 'utf8',
    'outCharset': 'utf-8',
    'notice': '0',
    'platform': 'yqq',
    'needNewCode': '0'
  }

  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
