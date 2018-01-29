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
