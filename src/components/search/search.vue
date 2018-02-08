<template>
  <section class="search">
    <header class="s-h">
      <input type="text" ref="query" v-model="query" :placeholder="placeholder"/> <span @click="back">取消</span>
    </header>
    <scroll class="sh-wrapper">
      <div>
        <div class="sh-c1" v-show="showFlag">
          <div class="hot-search">
            <p>热门搜索</p>
            <ul>
              <li v-for="item in keys" @click="selectSearchItem(item.k)">
                {{item.k}}
              </li>
            </ul>
          </div>

          <div class="search-history">
            <div class="sh-t">
              <span>搜索历史</span> <span @click="clearAll">清除历史</span>
            </div>
            <ul class="sh-cont" ref="shcont">
              <li v-for="(item, index) in historyList">
                <span>{{item}}</span>
                <i class="fa fa-remove" @click="removeKey(item, index, $event)"></i>
              </li>
            </ul>
          </div>
        </div>

        <div class="sh-c2" v-show="scFlag">
          <search-cont :songs="songs"></search-cont>
        </div>
      </div>
    </scroll>
    <confirm ref="confirm"></confirm>
  </section>
</template>

<script>
import SearchHistory from 'db/searchHistory'
import Scroll from 'base/scroll/scroll'
import {hotSearchList, searchKeyList} from 'api/search'
import Confirm from 'base/confirm/confirm'
import {debounce} from 'common/js/utils/util'
import SearchCont from 'components/search-cont/search-cont'

let sh = new SearchHistory()
export default {
  components: {
    SearchCont,
    Scroll,
    Confirm
  },
  data() {
    return {
      keys: [],
      placeholder: '搜索音乐，歌词，歌单',
      query: '',
      songs: [],
      historyList: [],
      showFlag: true,
      scFlag: false
    }
  },
  created() {
    this.$watch('query', debounce((newQuery) => {
      this._searchKeyList(this.query)
    }, 800))

    this._hotSearchList()
    this._searchKeyList()
    this._getSearchHistoryList()
  },
  methods: {
    clearAll() {
      let _this = this
      this.$refs.confirm.show({
        title: '是否清空所有搜索历史',
        msg: ' ',
        btns: [
          {
            title: '取消',
            click: function(el) {
              el.hide()
            },
            color: "#1b1b1b"
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
      })
    },
    removeKey(item, index, ev) {
      sh.remove(item)

      let el = ev.target || ev.srcElement
      this.$refs.shcont.removeChild(el.parentNode)
    },
    _getSearchHistoryList() {
      this.historyList = sh.getAllSearchHistory()
    },
    selectSearchItem(key) {
      this.query = key
      // 添加历史记录
      sh.insert(key)

      // 执行搜索操作
      this.showFlag = false
      this.scFlag = true
    },
    back() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
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
    },
    _searchKeyList(keywords) {
      searchKeyList(keywords).then((res) => {
        let reg = new RegExp(`^MusicJsonCallback5987696727295411\\(`)
        let reg2 = new RegExp('\\)$')
        res = res.replace(reg, '').replace(reg2, '')
        res = JSON.parse(res)
        this.songs = res.data.song.list
        console.log(this.songs)
      })
    }
  }
}
</script>

  <style lang="sass" scoped="" type="text/css">
    @import "../../common/scss/helpers/variables.scss";
    @import "../../common/scss/helpers/mixins.scss";
    @import "../../common/scss/base/base.scss";

    .search
      width: 100%
      position: fixed
      left: 0
      bottom: 0
      top: 0
      .s-h
        display: flex
        align-items: center
        @include px2rem(height, 86px)
        background: #61bf81
        box-sizing: border-box
        padding-left: 4%
        justify-content: space-between
        padding-right: 2%
        input
          @include px2rem(width, 600px)
          @include px2rem(height, 60px)
          box-sizing: border-box
          padding-left: 2%
          border: 0
          background: #55a872
          @include px2rem(border-radius, 8px)
          @include font-dpr(14px)
          color: #e6f6e0
          &::placeholder
            color: #e6f6e0
        span
          color: #fff
          @include font-dpr(15px)
          display: flex
          @include px2rem(width, 86px)
          @include px2rem(height, 56px)
          justify-content: center
          align-items: center
      .sh-wrapper
        position: absolute
        @include px2rem(top, 86px)
        left: 0
        bottom: 0
        overflow: hidden
        width: 100%
        .hot-search
          width: 92%
          margin: 0 auto
          @include px2rem(margin-top, 36px)
          p
            @include font-dpr(12px)
            color: #6a6a6a
          ul
            display: flex
            flex-wrap: wrap
            li
              @include font-dpr(12px)
              @include px2rem(height, 54px)
              @include px2rem(padding-left, 20px)
              @include px2rem(padding-right, 20px)
              @include px2rem(border-width, 2px)
              @include px2rem(margin-right, 10px)
              @include px2rem(margin-top, 20px)
              border-radius: 300px
              border-style: solid
              border-color: #d6d6d6
              display: flex
              align-items: center
              box-sizing: border-box
              color: #000
        .search-history
          width: 100%
          .sh-cont
            width: 100%
            li
              align-items: center
              box-sizing: border-box
              display: flex
              justify-content: space-between
              @include px2rem(height, 90px)
              width: 90%
              margin: 0 auto
              @include font-dpr(15px)
              @include px2rem(border-bottom-width, 2px)
              border-style: solid
              border-color: #f0f0f0
              i
                @include font-dpr(14px)
                color: #808080
                @include px2rem(padding, 10px)
          .sh-t
            @include px2rem(height, 92px)
            display: flex
            justify-content: space-between
            align-items: center
            @include font-dpr(13px)
            @include px2rem(border-bottom-width, 2px)
            border-style: solid
            border-color: #f8f8f8
            box-sizing: border-box
            padding-left: 4%
            padding-right: 4%
            span:last-child
              color: #b0e4bb
</style>
