import Vue from 'vue'
import Router from 'vue-router'
import MusicHall from 'components/music-hall/music-hall'
import Singer from 'components/singer/singer'
import SongList from 'components/song-list/song-list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MusicHall',
      component: MusicHall
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
      path: '/songlist/:id',
      name: 'SongList',
      component: SongList
    }
  ]
})
