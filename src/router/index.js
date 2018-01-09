import Vue from 'vue'
import Router from 'vue-router'
import MusicHall from 'components/music-hall/music-hall'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MusicHall',
      component: MusicHall
    }
  ]
})
