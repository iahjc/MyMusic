<template lang="html">
  <transition name="b">
  <section :class="$style.search" v-show="flag">
    <header :class="$style.input">
      <input type="text" ref="query" v-model="query" :placeholder="placeholder"/>
      <span @click="back">取消</span>
    </header>
    <scroll :class="$style.content">
      <div>
        <div :class="$style.keywords" v-show="showFlag">
          <hot-search :keys="keys" @selectKeyword="selectKeyword"></hot-search>
          <search-history :historyList="historyList" @selectItem="selectHistoryKeys" @clearAll="clearAll" @removeKey="removeKey"></search-history>
        </div>
        <div :class="$style.wrapper" v-show="!showFlag">
          <songs-list :songs="songs" @selectItem="selectItem"></songs-list>
        </div>
        <div :class="$style.loading" v-show="this.songs.length <= 0 && !showFlag">
          <loading :isShow="true" :msg="msg"></loading>
        </div>
      </div>
    </scroll>
    <confirm ref="confirm"></confirm>
  </section>
  </transition>
</template>

<script>
import SearchHistoryDb from 'db/searchHistory'
import Scroll from 'base/scroll/scroll'
import {hotSearchList, search} from 'api/search'
import Confirm from 'base/confirm/confirm'
import {debounce} from 'common/js/utils/util'
// import {prefixStyle} from 'common/js/utils/dom'
import SearchHistory from 'components/search/search-history'
import HotSearch from 'components/search/hot-search'
import SongsList from 'components/search/songs-list'
import {createSingerSong} from 'domain/song'
import Loading from 'base/loading/loading'

// let transform = prefixStyle('transform')
// let l = 100
let sh = new SearchHistoryDb()

const perpage = 20
export default {
  components: {
    Scroll,
    Confirm,
    SearchHistory,
    HotSearch,
    SongsList,
    Loading
  },
  data() {
    return {
      page: 1,
      flag: false,
      keys: [],
      placeholder: '搜索音乐，歌词，歌单',
      query: '',
      songs: [],
      historyList: [],
      showFlag: true,
      msg: '正在加载中...'
    }
  },
  created() {
    this.$watch('query', debounce((newQuery) => {
      this.query = newQuery
      if (this.query === '') {
        this.showFlag = true
      } else {
        search(this.query, this.page, true, perpage).then((res) => {
          if (res.code === 0) {
            this.songs = this._initSongs(res.data.song.list)
          }
        })
        this.showFlag = false
      }
    }, 800))

    this._hotSearchList()
    this._getSearchHistoryList()
  },
  mounted() {
  },
  methods: {
    selectItem(item, index, ev) {
      this.$emit('selectItem', item, index, ev)
    },
    selectHistoryKeys(keys) {
      this.selectKeyword(keys)
    },
    _initSongs(list) {
      let ret = []
      list.forEach((musicData) => {
        if (musicData.albummid && musicData.songmid) {
          ret.push(createSingerSong(musicData))
        }
      })
      return ret
    },
    show() {
      this.flag = true
    },
    hide() {
      this.title = ''
      this.songs = []
      this.showFlag = true
      this.flag = false
    },
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
      })
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

      // 执行搜索操作
      this.showFlag = false
    },
    back() {
      this.hide()
      // 同步刷新缓存的数据
      this.$emit('refreshSongsheet')
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
<style lang="sass" scoped="" type="text/css">
  @import "../../common/scss/components/animation.scss";
</style>
  <style lang="sass" scoped="" type="text/css" module>
    .search
      width: 100%
      position: fixed
      left: 0
      bottom: 0
      top: 0
      background: #fff
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
        .loading
          position: absolute
          top: 100px
          left: 50%
          transform: translateX(-50%)
        .wrapper
</style>
