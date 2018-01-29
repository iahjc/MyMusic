import Vue from 'vue'
import Router from 'vue-router'
import MusicHall from 'components/music-hall/music-hall'
import Singer from 'components/singer/singer'
import SongList from 'components/song-list/song-list'
import SingerDetail from 'components/singer-detail/singer-detail'
import Rank from 'components/rank/rank'
import MyMusic from 'components/my-music/my-music'
import Main from 'components/main/main'

Vue.use(Router)

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
