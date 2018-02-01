import axios from 'axios'

export function getRank() {
  let url = '/api/getRank'
  let params = {
    'g_tk': '5381',
    'uin': '0',
    'format': 'json',
    'inCharset': 'utf-8',
    'outCharset': 'utf-8',
    'notice': '0',
    'platform': 'h5',
    'needNewCode': '1',
    '_': '1516792793848'
  }

  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 全球榜
 */
export function getGlobalRank() {
  let url = '/api/getGlobalRank'
  let params = {
    'page': 'index',
    'format': 'html',
    'tpl': 'macv4',
    'v8debug': '1',
    'jsonCallback': 'jsonCallback'
  }

  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 歌曲列表
 */
export function getRankList(rid, updateKey) {
  let params = {
    'tpl': '3',
    'page': 'detail',
    'date': updateKey,
    'topid': rid,
    'type': 'top',
    'song_begin': '0',
    'song_num': '30',
    'g_tk': '5381',
    'jsonpCallback': 'MusicJsonCallbacktoplist',
    'loginUin': '0',
    'hostUin': '0',
    'format': 'jsonp',
    'inCharset': 'utf8',
    'outCharset': 'utf-8',
    'notice': '0',
    'platform': 'yqq',
    'needNewCode': '0'
  }

  let url = '/api/getRankList'
  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
