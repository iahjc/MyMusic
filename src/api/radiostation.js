import axios from 'axios'
/**
 * 电台列表
 */
export function getRadioStationList() {
  let params = {
    'channel': 'radio',
    'format': 'jsonp',
    'page': 'index',
    'tpl': 'wk',
    'new': '1',
    'p': '0.6233492128029756',
    'g_tk': '5381',
    'jsonpCallback': 'MusicJsonCallback052271854983912514',
    'loginUin': '0',
    'hostUin': '0',
    'inCharset': 'utf8',
    'outCharset': 'utf-8',
    'notice': '0',
    'platform': 'yqq',
    'needNewCode': '0'
  }
  let url = '/api/getRadioStationList'
  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getClassRs() {
  let params = {
    'g_tk': '5381',
    'jsonpCallback': 'getPlaylistTags',
    'loginUin': '0',
    'hostUin': '0',
    'format': 'jsonp',
    'inCharset': 'utf8',
    'outCharset': 'utf-8',
    'notice': '0',
    'platform': 'yqq',
    'needNewCode': '0'
  }

  let url = '/api/getClassRs'
  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getClassRsList(catid) {
  let params = {
    'picmid': '1',
    'rnd': '0.12473363325887754',
    'g_tk': '5381',
    'jsonpCallback': 'getPlaylist',
    'loginUin': '0',
    'hostUin': '0',
    'format': 'jsonp',
    'inCharset': 'utf8',
    'outCharset': 'utf-8',
    'notice': '0',
    'platform': 'yqq',
    'needNewCode': '0',
    'categoryId': catid,
    'sortId': '5',
    'sin': '0',
    'ein': '29'
  }

  let url = '/api/getClassRsList'
  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
