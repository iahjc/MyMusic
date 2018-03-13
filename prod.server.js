var express = require('express')
var config = require('./config/index0')
var axios = require('axios')
const bodyParser = require('body-parser')

var port = 8086

var app = express()

app.use(bodyParser.urlencoded({extended: true}))
const querystring = require('querystring')

var apiRoutes = express.Router()

apiRoutes.get('/getCollectionNum', function (req, res) {
  var url = 'https://c.y.qq.com/3gmusic/fcgi-bin/3g_dir_order_uinlist'
    axios.get(url, {
      headers: {
        referer: 'https://y.qq.com/',
        host: 'y.qq.com'
      },
      params: req.query
    }).then((response) => {
      res.json(response.data)
    }).catch((e) => {
      console.log(e)
    })
})

apiRoutes.get('/singerRecommend', function (req, res) {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
    axios.get(url, {
      headers: {
        referer: 'https://c.y.qq.com/',
        host: 'c.y.qq.com'
      },
      params: req.query
    }).then((response) => {
      res.json(response.data)
    }).catch((e) => {
      console.log(e)
    })
})

apiRoutes.get('/getSongList', function (req, res) {
  var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
    axios.get(url, {
      headers: {
        referer: 'https://y.qq.com/',
        host: 'y.qq.com'
      },
      params: req.query
    }).then((response) => {
      res.json(response.data)
    }).catch((e) => {
      console.log(e)
    })
})

apiRoutes.get('/getExpressSong', function (req, res) {
  // let url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?g_tk=5381&jsonpCallback=MusicJsonCallback6224818263178897&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&cid=205361747&callback=MusicJsonCallback6224818263178897&uin=0&songmid=003OUlho2HcRHC&filename=C400003OUlho2HcRHC.m4a&guid=2419123392'
  let url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
    axios.get(url, {
      headers: {
        referer: 'https://c.y.qq.com',
        host: 'c.y.qq.com'
      },
      params: req.query
    }).then((response) => {
      res.json(response.data)
    }).catch((e) => {
      console.log(e)
    })
})

apiRoutes.get('/getSingerList', function (req, res) {
  let url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/getFSNum', function (req, res) {
  let url = 'https://c.y.qq.com/rsc/fcgi-bin/fcg_order_singer_getnum.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/getSingerDetail', function (req, res) {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/getSinger', function (req, res) {
  let url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_singer_desc.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/getRank', function (req, res) {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/getGlobalRank', function (req, res) {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_opt.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/getMV', function (req, res) {
  let url = 'https://c.y.qq.com/mv/fcgi-bin/fcg_singer_mv.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/getAlbum', function (req, res) {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_album.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/getRadioStationList', function (req, res) {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_radiolist.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/getClassRs', function (req, res) {
  let url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_tag_conf.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/getClassRsList', function (req, res) {
  let url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/hotSearchList', function (req, res) {
  let url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/searchSongSheetsList', function (req, res) {
  let url = 'https://c.y.qq.com/soso/fcgi-bin/client_music_search_songlist'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/searchKeyList', function (req, res) {
  let url = 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/getMvType', function (req, res) {
  let url = 'https://c.y.qq.com/v8/fcg-bin/getmv_by_tag'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/getAlbumType', function (req, res) {
  let url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://u.y.qq.com',
      host: 'u.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/getRankList', function (req, res) {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/getIndexNewAlbum', function (req, res) {
  let url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://u.y.qq.com',
      host: 'u.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/getRadioSongs', function (req, res) {
  let url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://u.y.qq.com',
      host: 'u.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/lyric', function (req, res) {
  let url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    var ret = response.data
    if (typeof ret === 'string') {
      var reg = /^\w+\(({[^()]+})\)$/
      var matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/getAlbumInfo', function (req, res) {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.post('/getPurlUrl', bodyParser.json(), function (req, res) {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  axios.post(url, req.body, {
    headers: {
      referer: 'https://y.qq.com/',
      origin: 'https://y.qq.com',
      'Content-type': 'application/x-www-form-urlencoded'
    }
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})


app.use('/api', apiRoutes)

app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
