import axios from 'axios'

export function getAlbumType() {
  let params = {
    'callback': 'getUCGI17417625182878815',
    'g_tk': '5381',
    'jsonpCallback': 'getUCGI17417625182878815',
    'loginUin': '1152921504662152394',
    'hostUin': '0',
    'format': 'jsonp',
    'inCharset': 'utf8',
    'outCharset': 'utf-8',
    'notice': '0',
    'platform': 'yqq',
    'needNewCode': '0',
    'data': '{"albumlib":{"method":"get_album_by_tags","param":{"area":7,"company":-1,"genre":-1,"type":-1,"year":-1,"sort":2,"get_tags":1,"sin":0,"num":20,"click_albumid":0},"module":"music.web_album_library"}}'
  }

  let url = '/api/getAlbumType'

  return axios.get(url, {params: params}).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取首页最新专辑
export function getIndexNewAlbum() {
  let _data = {
    'comm': {
      'ct': 24
    },
    'new_album': {
      'module': 'QQMusic.MusichallServer',
      'method': 'GetNewAlbum',
      'param': {
        'type': 1,
        'category': '-1',
        'genre': 0,
        'year': 1,
        'company': -1,
        'sort': 1,
        'start': 0,
        'end': 39
      }
    }
  }

  let params = {
    'callback': 'recom41121723644638686',
    'g_tk': '5381',
    'jsonpCallback': 'recom41121723644638686',
    'loginUin': '0',
    'hostUin': '0',
    'format': 'jsonp',
    'inCharset': 'utf8',
    'outCharset': 'utf-8',
    'notice': '0',
    'platform': 'yqq',
    'needNewCode': '0',
    'data': _data
  }

  let url = '/api/getIndexNewAlbum'

  return axios.get(url, {params: params}).then((res) => {
    return Promise.resolve(res.data)
  })
}
