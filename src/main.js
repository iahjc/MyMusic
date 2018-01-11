// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { flexible } from 'common/js/utils/flexible'

import '../static/css/font-awesome.css'
import '../static/css/reset.css'

Vue.config.productionTip = false
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
