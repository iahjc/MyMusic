import axios from 'axios'

export function getMvType() {
  let params = {
    'g_tk': '5381',
    'jsonpCallback': 'getMvlist',
    'loginUin': '0',
    'hostUin': '0',
    'format': 'jsonp',
    'inCharset': 'utf8',
    'outCharset': 'utf-8',
    'notice': '0',
    'platform': 'yqq',
    'needNewCode': '0',
    'utf8': '1',
    'type': '2',
    'year': '0',
    'area': '0',
    'tag': '0',
    'pageno': '0',
    'pagecount': '20',
    'otype': 'json',
    'taglist': '1',
    '_': '0.39269422918813635'
  }


  let url = '/api/getMvType'

  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
