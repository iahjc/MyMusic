import Jsonp from 'jsonp'
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
 * 歌单推荐
 */
export const modePlayList = [
  {
    'title': '每日新歌：赵天宇&#215;周震南教你攻克恋爱难题',
    'picUrl': 'http://p.qpic.cn/music_cover/ibSiagqKjw1zfTgxY7F8CfE3CQe3f4KmogUu93816CjiaFClMOgiaI3WsQ/600?n=1',
    'playNumber': '116.2万'
  },
  {
    'title': '每日新歌：赵天宇&#215;周震南教你攻克恋爱难题',
    'picUrl': 'http://p.qpic.cn/music_cover/ibSiagqKjw1zfTgxY7F8CfE3CQe3f4KmogUu93816CjiaFClMOgiaI3WsQ/600?n=1',
    'playNumber': '116.2万'
  },
  {
    'title': '每日新歌：赵天宇&#215;周震南教你攻克恋爱难题',
    'picUrl': 'http://p.qpic.cn/music_cover/ibSiagqKjw1zfTgxY7F8CfE3CQe3f4KmogUu93816CjiaFClMOgiaI3WsQ/600?n=1',
    'playNumber': '116.2万'
  },
  {
    'title': '每日新歌：赵天宇&#215;周震南教你攻克恋爱难题',
    'picUrl': 'http://p.qpic.cn/music_cover/ibSiagqKjw1zfTgxY7F8CfE3CQe3f4KmogUu93816CjiaFClMOgiaI3WsQ/600?n=1',
    'playNumber': '116.2万'
  },
  {
    'title': '每日新歌：赵天宇&#215;周震南教你攻克恋爱难题',
    'picUrl': 'http://p.qpic.cn/music_cover/ibSiagqKjw1zfTgxY7F8CfE3CQe3f4KmogUu93816CjiaFClMOgiaI3WsQ/600?n=1',
    'playNumber': '116.2万'
  },
  {
    'title': '每日新歌：赵天宇&#215;周震南教你攻克恋爱难题',
    'picUrl': 'http://p.qpic.cn/music_cover/ibSiagqKjw1zfTgxY7F8CfE3CQe3f4KmogUu93816CjiaFClMOgiaI3WsQ/600?n=1',
    'playNumber': '116.2万'
  }
]
