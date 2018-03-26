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
          border-bottom: 1px solid #f2f2f2
          padding-top: 20px
          padding-bottom: 20px
          box-sizing: border-box
          padding-left: 2.5%
          .sls-l
            flex: 1
            p:first-child
              font-size: 28px; /*px*/
              color: #363636
              height: 28px
              line-height: 28px
            p:nth-child(2)
              margin-top: 10px
              font-size: 20px; /*px*/
              span:first-child
                color: #666
            p:last-child
              margin-top: 10px
              font-size: 24px; /*px*/
              color: #666666
            .lyric-cont
              margin-top: 32px
              .lyric-wrapper
                margin-top: 36px
                font-size: 20px; /*px*/
                line-height: 36px; /*px*/
              .lyric-show
                font-size: 20px; /*px*/
                color: #b4b4b4
                margin-top: 36px
              .lc-t
                line-height: 38px
          .sls-r
            width: 80px
            display: flex
            justify-content: center
            i
              font-size: 40px; /*px*/
              color: #afafaf
          .sls-m
            width: 80px
            display: flex
            justify-content: center
            .icon2
              background: #afafaf
              color: #fff
              padding-left: 2px
              padding-right: 2px
</style>
