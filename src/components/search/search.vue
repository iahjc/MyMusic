<template>
  <section class="search">
    <header class="s-h">
      <input type="text" ref="query" v-model="query" :placeholder="placeholder"/> <span @click="back">取消</span>
    </header>
    <div class="sh-c1" v-show="false">
      <div class="hot-search">
        <p>热门搜索</p>
        <ul>
          <li v-for="item in keys">
            {{item.k}}
          </li>
        </ul>
      </div>

      <div class="search-history">
        <div class="sh-t">
          <span>搜索历史</span> <span>清除历史</span>
        </div>
        <ul>
          <li>
            <span></span> <i></i>
          </li>
        </ul>
      </div>
    </div>

    <div class="sh-c2">
      <search-cont :songs="songs"></search-cont>
    </div>

  </section>
</template>

<script>
import {hotSearchList, searchKeyList} from 'api/search'
import {debounce} from 'common/js/utils/util'
import SearchCont from 'components/search-cont/search-cont'
export default {
  components: {
    SearchCont
  },
  data() {
    return {
      keys: [],
      placeholder: '搜索音乐，歌词，歌单',
      query: '',
      songs: []
    }
  },
  created() {
    this.$watch('query', debounce((newQuery) => {
      this._searchKeyList(this.query)
    }, 800))

    this._hotSearchList()
    this._searchKeyList()
  },
  methods: {
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
