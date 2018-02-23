import axios from 'axios'
/**
 * 热门搜索
 */
export function hotSearchList() {
  let params = {
    'g_tk': '1928093487',
    'inCharset': 'utf-8',
    'outCharset': 'utf-8',
    'notice': '0',
    'format': 'jsonp',
    'uin': '0',
    'needNewCode': '1',
    'platform': 'h5',
    'jsonpCallback': 'jp7'
  }

  let url = '/api/hotSearchList'

  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function searchMvList(keywords) {
  let params = {
    'ct': '24',
    'qqmusic_ver': '1298',
    'remoteplace': 'txt.yqq.mv',
    'searchid': '141758728540226900',
    'aggr': '0',
    'catZhida': '1',
    'lossless': '0',
    'sem': '1',
    't': '12',
    'p': '1',
    'n': '28',
    'w': keywords,
    'g_tk': '5381',
    'jsonpCallback': 'MusicJsonCallback5987696727295411',
    'loginUin': '0',
    'hostUin': '0',
    'format': 'jsonp',
    'inCharset': 'utf8',
    'outCharset': 'utf-8',
    'notice': '0',
    'platform': 'yqq',
    'needNewCode': '0'
  }

  let url = '/api/searchKeyList'

  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function searchAlbumList(keywords) {
  let params = {
    'ct': '24',
    'qqmusic_ver': '1298',
    'remoteplace': 'txt.yqq.album',
    'searchid': '88838976198793884',
    'aggr': '0',
    'catZhida': '1',
    'lossless': '0',
    'sem': '10',
    't': '8',
    'p': '1',
    'n': '30',
    'w': keywords,
    'g_tk': '5381',
    'jsonpCallback': 'MusicJsonCallback5987696727295411',
    'loginUin': '0',
    'hostUin': '0',
    'format': 'jsonp',
    'inCharset': 'utf8',
    'outCharset': 'utf-8',
    'notice': '0',
    'platform': 'yqq',
    'needNewCode': '0'
  }

  let url = '/api/searchKeyList'

  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function searchLyricList(keywords) {
  let params = {
    'ct': '24',
    'qqmusic_ver': '1298',
    'remoteplace': 'txt.yqq.lyric',
    'searchid': '107155465531868920',
    'aggr': '0',
    'catZhida': '1',
    'lossless': '0',
    'sem': '1',
    't': '7',
    'p': '1',
    'n': '10',
    'w': keywords,
    'g_tk': '5381',
    'jsonpCallback': 'MusicJsonCallback09877858041956467',
    'loginUin': '0',
    'hostUin': '0',
    'format': 'jsonp',
    'inCharset': 'utf8',
    'outCharset': 'utf-8',
    'notice': '0',
    'platform': 'yqq',
    'needNewCode': '0'
  }

  let url = '/api/searchKeyList'

  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function searchSongSheetsList(keywords) {
  let params = {
    'remoteplace': 'txt.yqq.playlist',
    'searchid': '116681496833171412',
    'flag_qc': '0',
    'page_no': '0',
    'num_per_page': '21',
    'query': keywords,
    'g_tk': '5381',
    'jsonpCallback': 'MusicJsonCallback8043431003938759',
    'loginUin': '0',
    'hostUin': '0',
    'format': 'jsonp',
    'inCharset': 'utf8',
    'outCharset': 'utf-8',
    'notice': '0',
    'platform': 'yqq',
    'needNewCode': '0'
  }

  let url = '/api/searchSongSheetsList'

  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function searchKeyList(keywords) {
  let params = {
    'ct': '24',
    'qqmusic_ver': '1298',
    'new_json': '1',
    'remoteplace': 'txt.yqq.song',
    'searchid': '67480189750532713',
    't': '0',
    'aggr': '1',
    'cr': '1',
    'catZhida': '1',
    'lossless': '0',
    'flag_qc': '0',
    'p': '1',
    'n': '20',
    'w': keywords,
    'g_tk': '5381',
    'jsonpCallback': 'MusicJsonCallback5987696727295411',
    'loginUin': '0',
    'hostUin': '0',
    'format': 'jsonp',
    'inCharset': 'utf8',
    'outCharset': 'utf-8',
    'notice': '0',
    'platform': 'yqq',
    'needNewCode': '0'
  }

  let url = '/api/searchKeyList'

  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
