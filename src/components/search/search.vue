<template lang="html">
  <section :class="$style.search">
    <header :class="$style.input">
      <input type="text" ref="query" v-model="query" :placeholder="placeholder"/>
      <span @click="back">取消</span>
    </header>
    <scroll :class="$style.content">
      <div>
        <div :class="$style.keywords" v-show="showFlag">
          <hot-search :keys="keys" @selectKeyword="selectKeyword"></hot-search>
          <search-history :historyList="historyList" @selectItem="selectKeyword" @clearAll="clearAll" @removeKey="removeKey"></search-history>
        </div>
        <div :class="$style.wrapper" v-show="!showFlag">
          <navMenu :navs="navs" @selectMenuItem="selectMenuItem"></navMenu>
          <router-view></router-view>
        </div>
      </div>
    </scroll>
    <confirm ref="confirm"></confirm>
  </section>
</template>

<script>
import SearchHistoryDb from 'db/searchHistory'
import Scroll from 'base/scroll/scroll'
import {hotSearchList} from 'api/search'
import Confirm from 'base/confirm/confirm'
import {debounce} from 'common/js/utils/util'
import {mapMutations} from 'vuex'
// import {prefixStyle} from 'common/js/utils/dom'
import SearchHistory from 'components/search/search-history'
import HotSearch from 'components/search/hot-search'
import NavMenu from 'base/nav-menu/nav-menu'
//
// let transform = prefixStyle('transform')
// let l = 100
let sh = new SearchHistoryDb()
export default {
  components: {
    Scroll,
    Confirm,
    SearchHistory,
    HotSearch,
    NavMenu
  },
  data() {
    return {
      keys: [],
      placeholder: '搜索音乐，歌词，歌单',
      query: '',
      songs: [],
      historyList: [],
      showFlag: true,
      zhida: {},
      navs: [
        {
          to: '/search/',
          title: '单曲'
        },
        {
          to: '/search/searchmvlist',
          title: 'MV'
        },
        {
          to: '/search/searchalbumlist',
          title: '专辑'
        },
        {
          to: '/search/searchsongsheetlist',
          title: '歌单'
        },
        {
          to: '/search/searchlyriclist',
          title: '歌词'
        }
      ]
    }
  },
  created() {
    this.$watch('query', debounce((newQuery) => {
      this.query = newQuery
      this.setKeywords(this.query)
      this.showFlag = false
    }, 800))

    this._hotSearchList()
    this._getSearchHistoryList()
  },
  mounted() {
    this.w = window.document.body.clientWidth / 5
  },
  methods: {
    selectMenuItem(item, index, ev) {
      this.$router.push({
        path: this.navs[index].to
      })
    },
    ...mapMutations({
      'setKeywords': 'SET_KEYWORDS'
    }),
    clearAll() {
      let _this = this
      let options = {
        title: '是否清空所有搜索历史',
        msg: ' ',
        btns: [
          {
            title: '取消',
            click: function(el) {
              el.hide()
            },
            color: '#1b1b1b'
          },
          {
             title: '清空',
             click: function(el) {
               sh.clearAll()
               el.hide()
               _this.$refs.shcont.innerHTML = ''
             },
             color: '#719e8a'
          }
        ]
      }
      this.$refs.confirm.show(options)
    },
    removeKey(item, index, removeItem, ev) {
      sh.remove(item)
      removeItem(ev)
    },
    _getSearchHistoryList() {
      this.historyList = sh.getAllSearchHistory()
    },
    selectKeyword(key) {
      this.query = key
      // 添加历史记录
      sh.insert(key)

      this.setKeywords(key)

      // 执行搜索操作
      this.showFlag = false
    },
    back() {
      this.$router.push({
        path: '/main/musichall'
      })
    },
    _hotSearchList() {
      hotSearchList().then((res) => {
        let reg = new RegExp(`^jp7\\(`)
        let reg2 = new RegExp('\\)$')
        res = res.replace(reg, '').replace(reg2, '')
        res = JSON.parse(res)
        this.keys = res.data.hotkey
        this.keys.length = 9
      })
    }
  }
}
</script>

  <style lang="sass" scoped="" type="text/css" module>
    .search
      width: 100%
      position: fixed
      left: 0
      bottom: 0
      top: 0
      .input
        display: flex
        align-items: center
        height: 86px
        background: #61bf81
        box-sizing: border-box
        padding-left: 4%
        justify-content: space-between
        padding-right: 2%
        input
          width: 600px
          height: 60px
          box-sizing: border-box
          padding-left: 2%
          border: 0
          background: #55a872
          border-radius: 8px
          font-size: 28px; /*px*/
          color: #e6f6e0
          &::placeholder
            color: #e6f6e0
        span
          color: #fff
          font-size: 30px; /*px*/
          display: flex
          width: 86px
          height: 56px
          justify-content: center
          align-items: center
      .content
        position: absolute
        top: 86px
        left: 0
        bottom: 0
        overflow: hidden
        width: 100%
        .keywords
          width: 100%
        .wrapper
          .sd-wrapper
            position: relative
            box-sizing: border-box
            .cur
              width: 20%
              height: 5px
              position: absolute
              left: 0
              bottom: 0
              background: #5ac47a
            .sd-nav
              display: flex
              width: 100%
              height: 85px
              box-sizing: border-box
              border-bottom: 1px solid #eaeaea; /*px*/
              flex-direction: row
              li
                width: 20%
                box-sizing: border-box
                color: #7f7f7f
                font-size: 30px; /*px*/
                display: flex
                justify-content: center
                align-items: center
</style>
