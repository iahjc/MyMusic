import Vue from 'vue'
import Router from 'vue-router'
import MusicHall from 'components/music-hall/music-hall'
import Singer from 'components/singer/singer'
import SongList from 'components/song-list/song-list'
import SingerDetail from 'components/singer-detail/singer-detail'
import Rank from 'components/rank/rank'
import MyMusic from 'components/my-music/my-music'
import Main from 'components/main/main'
import Login from 'components/login/login'
import RadioStation from 'components/radio-station/radio-station'
import ClassRadiostation from 'components/class-radiostation/class-radiostation'
import GdDetail from 'components/gd-detail/gd-detail'
import Search from 'components/search/search'
import Mv from 'components/mv/mv'
import Album from 'components/album/album'
import RankList from 'components/rank-list/rank-list'
import SongSheet from 'components/song-sheet/song-sheet'
import SingleList from 'components/search/single-list'
import MvList from 'components/search/mv-list'
import AlbumList from 'components/search/album-list'
import SongsheetList from 'components/search/songsheet-list'
import LyricList from 'components/search/lyric-list'

Vue.use(Router)

const AlbumDetail = (resolve) => {
  import('components/album/album-detail').then((albumDetail) => {
    resolve(albumDetail)
  })
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/',
          component: MusicHall
        },
        {
          path: '/main/mymusic',
          component: MyMusic
        },
        {
          path: '/main/musichall',
          component: MusicHall
        }
      ]
    },
    {
      path: '/songsheet/:id',
      name: 'SongSheet',
      component: SongSheet
    },
    {
      path: '/album',
      name: 'Album',
      component: Album
    },
    {
      path: '/album/:id',
      name: 'AlbumDetail',
      component: AlbumDetail
    },
    {
      path: '/rank/:id',
      name: 'RankList',
      component: RankList
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      children: [
        {
          path: '/',
          component: SingleList
        },
        {
          path: '/search/searchmvlist',
          component: MvList
        },
        {
          path: '/search/searchalbumlist',
          component: AlbumList
        },
        {
          path: '/search/searchsongsheetlist',
          component: SongsheetList
        },
        {
          path: '/search/searchlyriclist',
          component: LyricList
        }
      ]
    },
    {
      path: '/mv',
      name: 'Mv',
      component: Mv
    },
    {
      path: '/gddetail/:id',
      name: 'GdDetail',
      component: GdDetail
    },
    {
      path: '/classradiostation',
      name: 'ClassRadiostation',
      component: ClassRadiostation
    },
    {
      path: '/radiostation',
      name: 'RadioStation',
      component: RadioStation
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/musichall',
      name: 'MusicHall',
      component: MusicHall
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer
    },
    {
      path: '/singer/:id',
      name: 'SingerDetail',
      component: SingerDetail
    },
    {
      path: '/songlist/:id',
      name: 'SongList',
      component: SongList
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank
    },
    {
      path: '/mymusic',
      name: 'MyMusic',
      component: MyMusic
    }
  ]
})
