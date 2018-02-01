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

  return axios.get(url, {
    params: params
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}