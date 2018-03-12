<template>
  <section class="lyric-list">
    <div class="lyric-loading" v-show="songs.length <= 0">
      <loading :isShow="true" :msg="msg"></loading>
    </div>
    <div class="lyric-songs">
      <div class="lyric-songs-li" v-for="(item, index) in songs" :key="index">
        <div class="sls-l">
          <p>
            <span>{{item.name}}</span>
          </p>
          <p>
            {{item.des}}
          </p>

          <div class="lyric-cont" ref="lyric">
            <div v-html="glLyric(item.lyricTitle)" v-show="currentIndex !== index" class="lc-t"></div>

            <div class="lyric-wrapper" v-show="currentIndex === index" v-html="glLyric(item.lyricContent)">

            </div>

            <div class="lyric-show" @click="lookLyric(index)">
              <span>展开歌词</span> <i class="fa fa-caret-down"></i>
            </div>
          </div>
        </div>
        <div class="sls-m">
          <span v-show="item.vid" class="icon2">MV</span>
        </div>
        <div class="sls-r">
          <i class="fa fa-ellipsis-h"></i>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {searchLyricList} from 'api/search'
import {mapGetters} from 'vuex'
import Loading from 'base/loading/loading'
import {createSingerSong} from 'domain/song'
export default {
  components: {
    Loading
  },
  computed: {
    ...mapGetters([
      'keywords'
    ])
  },
  data() {
    return {
      showFlag: true,
      songs: [],
      currentIndex: -1
    }
  },
  created() {
    if (this.keywords) {
      this.msg = `正在搜索 '${this.keywords}'`
      this._searchLyricList(this.keywords)
    }
  },
  methods: {
    glLyric(str) {
      let ly = str.replace(/\\n/g, '<br />')
      return ly
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
    lookLyric(index) {
      this.currentIndex = index
    },
    _searchLyricList(key) {
      searchLyricList(key).then((res) => {
        let reg = new RegExp(`^MusicJsonCallback09877858041956467\\(`)
        let reg2 = new RegExp('\\)$')
        res = res.replace(reg, '').replace(reg2, '')
        res = JSON.parse(res)
        this.songs = this._initSongs(res.data.lyric.list)
      })
    }
  }
}
</script>

  <style lang="sass" scoped="" type="text/css">
    @import "../../common/scss/helpers/variables.scss";
    @import "../../common/scss/helpers/mixins.scss";
    @import "../../common/scss/base/base.scss";
    @import "../../common/scss/components/buttons.scss";
    .lyric-list
      .lyric-loading
        width: 100%
        position: absolute
        top: 400px
        display: flex
        justify-content: center
      .lyric-songs
        width: 100%
        .lyric-songs-li
          display: flex
          @include px2rem(border-bottom-width, 2px)
          border-style: solid
          border-color: #f2f2f2
          @include px2rem(padding-top, 20px)
          @include px2rem(padding-bottom, 20px)
          box-sizing: border-box
          padding-left: 2.5%
          .sls-l
            flex: 1
            p:first-child
              font-size: 28px; /*px*/
              color: #363636
              @include px2rem(height, 28px)
              @include px2rem(line-height, 28px)
            p:nth-child(2)
              @include px2rem(margin-top, 10px)
              font-size: 20px; /*px*/
              span:first-child
                color: #666
            p:last-child
              @include px2rem(margin-top, 10px)
              font-size: 24px; /*px*/
              color: #666666
            .lyric-cont
              @include px2rem(margin-top, 32px)
              .lyric-wrapper
                margin-top: 36px
                font-size: 20px; /*px*/
                line-height: 36px; /*px*/
              .lyric-show
                font-size: 20px; /*px*/
                color: #b4b4b4
                margin-top: 36px
              .lc-t
                @include px2rem(line-height, 38px)
          .sls-r
            @include px2rem(width, 80px)
            display: flex
            justify-content: center
            i
              font-size: 40px; /*px*/
              color: #afafaf
          .sls-m
            @include px2rem(width, 80px)
            display: flex
            justify-content: center
            .icon2
              background: #afafaf
              color: #fff
              @include px2rem(padding-left, 2px)
              @include px2rem(padding-right, 2px)
</style>
