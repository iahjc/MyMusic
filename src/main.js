// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import 'common/js/utils/hack'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import store from './store'
import VueLazyload from 'vue-lazyload'
import { flexible } from 'common/js/utils/flexible'
// import { processSongsUrl } from 'domain/song'
import '../static/css/font-awesome.css'
import '../static/css/reset.css'

/* eslint-disable no-unused-vars */
// import vConsole from 'vconsole'

Vue.config.productionTip = false

fastclick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require('common/image/default.gif')
})

// 添加终端适配
flexible(window)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
