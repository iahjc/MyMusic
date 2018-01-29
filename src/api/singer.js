import axios from 'axios'

export function getFSNum(mid) {
  let url = '/api/getFSNum'
  let params = {
    'g_tk': 5381,
    'jsonpCallback': 'orderNum0025NhlN2yWrP41516324279689',
    'loginUin': '0',
    'hostUin': '0',
    'format': 'jsonp',
    'inCharset': 'utf8',
    'outCharset': 'utf-8',
    'notice': '0',
    'platform': 'yqq',
    'needNewCode': '0',
    'singermid': '0025NhlN2yWrP4',
    'utf8': '1',
    'rnd': '1516324279689'
  }

  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSingerDetail(mid) {
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
    'singermid': mid,
    'order': 'listen',
    'begin': '0',
    'num': '30',
    'songstatus': '1'
  }

  let url = '/api/getSingerDetail'

  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取歌手详情
 * @param  {[type]} mid [description]
 * @return {[type]}     [description]
 */
export function getSinger(mid) {
  let params = {
    'singermid': mid,
    'utf8': '1',
    'outCharset': 'utf-8',
    'format': 'xml',
    'r': '1516757464606'
  }

  let url = '/api/getSinger'

  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
