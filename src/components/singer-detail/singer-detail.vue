<template>
  <section class="singer-detail">
    <t-header :title="title" @back="back"></t-header>
    <author-detail :singer="singer" :fansNum="fansNum"></author-detail>
    <div :class="$style.bgLayer" ref="bgLayer">
    </div>

    <scroll class="sd-wrapper"
      :data="songList"
      @scroll="scroll"
      :listen-scroll="listenScroll"
      :probe-type="probeType"
      @scrollToEnd="searchMore"
      :pullup="pullup"
      :beforeScroll="beforeScroll"
      ref="list"
    >
      <div>
        <div class="sd-nav-wrapper">
          <nav-menu @selectMenuItem="selectMenuItem" :navs="navs"></nav-menu>
        </div>

        <div class="sd-cont">
          <div class="sd-c-1">
            <div class="sd-c-search">
            </div>
            <music-list :songList="songList" @selectItem="selectItem" ref="ml"></music-list>
          </div>
          <div class="sd-c-2">
            <album-list :albumList="albumList" ref="al" @selectAlbumItem="selectAlbumItem"></album-list>
          </div>
          <div class="sd-c-3">
            <mv-list :mvList="mvList" ref="mv"></mv-list>
          </div>
          <div class="sd-c-4">
            <singer-detail :desc="desc"  ref="sd"></singer-detail>
          </div>
        </div>
      </div>
      <!-- 加载更多 -->
      <div :class="$style.loading" v-show="loadingFlag">
        <loading :isShow="true"></loading>&nbsp;&nbsp;<span>正在载入更多</span>
      </div>
    </scroll>
  </section>
</template>

<script>
import {mapActions} from 'vuex'
import {getFSNum, getSingerDetail, getSinger, getAlbum, getMV} from 'api/singer'
import {mapGetters} from 'vuex'
import { createSingerSong } from 'domain/song'
import { createAlbum } from 'domain/album'
import AlbumList from 'base/album-list/album-list'
import MvList from 'base/mv-list/mv-list'
import SingerDetail from 'base/singer-detail/singer-detail'
import Scroll from 'base/scroll/scroll'
import {prefixStyle} from 'common/js/utils/dom'
import SongApi from 'api/song'
import { NUM } from 'common/js/config/page'
import Loading from 'base/loading/loading'
import THeader from 'base/t-header/t-header'
import AuthorDetail from 'components/singer-detail/author-detail'
import MusicList from 'components/singer-detail/music-list'
import NavMenu from 'base/nav-menu/nav-menu'

let songApi = new SongApi()
let transform = prefixStyle('transform')
let transform2 = prefixStyle('transform')
const filter = prefixStyle('filter')
let page = 1
export default {
  components: {
    AlbumList,
    MvList,
    SingerDetail,
    AuthorDetail,
    MusicList,
    Scroll,
    Loading,
    THeader,
    NavMenu
  },
  data() {
    return {
      navs: [
        {
          title: '单曲',
          count: 0
        },
        {
          title: '专辑',
          count: 0
        },
        {
          title: 'MV',
          count: 0
        },
        {
          title: '详情',
          count: 0
        }
      ],
      title: '',
      songList: null,
      albumList: [],
      mvList: [],
      desc: '',
      fansNum: 0,
      pullup: true,
      beforeScroll: true,
      items: [],
      hasMore: true,
      listenScroll: true,
      probeType: 3,
      mid: '',
      loadingFlag: false,
      scrollY: 0,
      headerH: 0,
      sdHeight: 0
    }
  },
  created() {
    this.mid = this.$route.params.id
  },
  computed: {
    bgStyle() {
      return `background:url(${this.singer.avatar}) no-repeat; background-size: 100% auto`
    },
    ...mapGetters([
      'singer'
    ])
  },
  mounted() {
    this.$refs.ml.show()
    this.items.push(this.$refs.ml)
    this.items.push(this.$refs.al)
    this.items.push(this.$refs.mv)
    this.items.push(this.$refs.sd)
  },
  methods: {
    selectAlbumItem(item, index) {
      this.$router.push({
        path: `/album/${item.albumMID}`
      })
    },
    back() {
      this.$router.back()
    },
    selectMenuItem(item, index, el) {
      this.items.forEach((menuItem) => {
        console.log(11)
        menuItem.hide()
      })
     this.items[index].show()
    },
    searchMore() {
      if (!this.hasMore) {
        return
      }
      this.hasMore = false
      let mid = this.mid = this.$route.params.id
      songApi.getSongs({
        page: page * 30,
        mid: mid,
        num: NUM
      }).then((res) => {
        let list = songApi.parseSongs(res)
        this.songList = this.songList.concat(list)
        this.$refs.list.refresh()
        page++
        this.hasMore = true
      }).then((err) => {
        console.log(err)
        this.hasMore = true
      })
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    selectItem(item, index) {
      this.selectSingerMusic({
        list: this.songList,
        index: index
      })
    },
    ...mapActions([
      'selectSingerMusic'
    ]),
    back() {
      this.$router.go(-1)
    },
    _initAlbumList(list) {
      let ret = []
      list.forEach((item) => {
        if (item.albumID && item.albumMID) {
          ret.push(createAlbum(item))
        }
      })
      return ret
    },
    /**
     * 初始化歌曲数据
     * @return {[type]} [description]
     */
    _initSongList(list) {
      let ret = []
      list.forEach((musicData) => {
        if (musicData.musicData.albumid) {
          ret.push(createSingerSong(musicData.musicData))
        }
      })
      return ret
    },
    _getSongs(mid) {
      getSingerDetail(mid).then((res) => {
        let reg = new RegExp(`^ MusicJsonCallbacksinger_track\\(`)
        let reg2 = new RegExp('\\)$')
        res = res.replace(reg, '').replace(reg2, '')
        res = JSON.parse(res)
        this.navs[0].count = res.data.total
        this.songList = this._initSongList(res.data.list)
      })
    },
    _getFsNum(mid) {
      getFSNum(mid).then((res) => {
        res = res.replace(/(^\s*)|(\s*$)/g, '')
        let reg = new RegExp(`^orderNum0025NhlN2yWrP41516324279689\\(`)
        let reg2 = new RegExp('\\)$')
        res = res.replace(reg, '').replace(reg2, '')
        res = JSON.parse(res)
        this.fansNum = res.num
      })
    },
    _getAlbum(mid) {
      console.log(2222)
      getAlbum(mid).then((res) => {
        let reg = new RegExp(`^ singeralbumlistJsonCallback\\(`)
        let reg2 = new RegExp('\\)$')
        res = res.replace(reg, '').replace(reg2, '')
        res = JSON.parse(res)
        this.albumList = this._initAlbumList(res.data.list)
        this.navs[1].count = res.data.total
      })
    },
    _getMV(mid) {
      getMV(mid).then((res) => {
        res = res.replace(/(^\s*)|(\s*$)/g, '')
        let reg = new RegExp(`^singermvlistJsonCallback\\(`)
        let reg2 = new RegExp('\\)$')
        res = res.replace(reg, '').replace(reg2, '')
        res = JSON.parse(res)
        this.mvList = res.data.list
        this.navs[2].count = res.data.total
      })
    },
    _getSinger(mid) {
      getSinger(mid).then((res) => {
        let parser = new DOMParser()
        let xmlDoc = parser.parseFromString(res, 'text/xml')
        let data = xmlDoc.getElementsByTagName('data')
        this.desc = data[0].innerHTML
      })
    }
  },
  created() {
    let mid = this.$route.params.id
    this._getSongs(mid)
    this._getFsNum(mid)
    this._getAlbum(mid)
    this._getMV(mid)
    this._getSinger(mid)
  },
  watch: {
    scrollY(newVal) {
      // const percent = Math.abs(newVal / this.sdHeight)
      // this.$refs.bgLayer.style[transform2] = `translate3d(0, ${newVal}px, 0)`
      // let scale = 1
      // if (newVal <= 0) {
      //   if (Math.abs(newVal) <= this.sdHeight - this.headerH) {
      //     this.$refs.sdh.style.height = this.sdHeight - Math.abs(newVal) + 'px'
      //   }
      //
      //   if (Math.abs(newVal) >= this.sdHeight - this.headerH) {
      //     this.$refs.sdh.style.height = this.headerH + 'px'
      //   }
      // } else {
      //   scale = scale + percent
      //   this.$refs.sdh.style[transform] = `scale(${scale})`
      // }

      // if (Math.abs(newVal) >= this.sdHeight) {
      //   this.$refs.sdh.style.height = this.sdHeight - Math.abs(newVal) + 'px'
      // }
      // if (newVal < 0) {
      //   if (this.sdHeight - Math.abs(newVal) >= this.headerH) {
      //     console.log(this.sdHeight)
      //     this.$refs.sdh.style.height = this.sdHeight - Math.abs(newVal) + 'px'
      //   }
      // } else {
      //   this.$refs.sdh.style.height = this.sdHeight + Math.abs(newVal) + 'px'
      //   let scale = 1 + percent
      //   this.$refs.sdbg.style[transform2] = `scale(${scale})`
      // }
    }
  }
}
</script>
<style lang="sass" scoped="" type="text/css" module>
  .bgLayer
    width: 100%
    position: absolute
    top: 525px
    height: 1000px
    background: #fff
  .loading
    width: 100%
    position: absolute
    bottom: 0
    display: flex
    font-size: 24px; /*px*/
    justify-content: center
    bottom: 20px
</style>

<style lang="sass" scoped="" type="text/css">
  @import "../../common/scss/helpers/variables.scss";
  @import "../../common/scss/helpers/mixins.scss";
  @import "../../common/scss/base/base.scss";
  @import "../../common/scss/components/buttons.scss";

  .singer-detail
    width: 100%
    position: fixed
    width: 100%
    left: 0
    top: 0
    bottom: 0
    .sd-h
      height: 525px
      position: relative
      z-index: 3
      overflow: hidden
      .sd-bg
        height: 100%
      .sd-cont
        width: 100%
        @include px2rem(height, 150px)
        position: absolute
        left: 0
        top: 320px
        display: flex
        flex-direction: column
        justify-content: space-around
        .sd-title
          color: #fff
          font-size: 38px; /*px*/
          width: 100%
          text-align: center
        .sd-fs
          display: flex
          width: 100%
          @include px2rem(height, 70px)
          justify-content: center
          align-items: center
          li:nth-child(2)
            @include px2rem(padding-left, 28px)
            @include px2rem(padding-right, 28px)
          li:first-child,li:last-child
            @include px2rem(width, 130px)
            background-color: rgba(255, 255, 255, .7)
            height: 1px; /*no*/
          li
            font-size: 32px; /*px*/
            color: #fff
        .sd-btn
          width: 100%
          display: flex
          justify-content: center
          .btn5
            @include px2rem(margin-right, 30px)
          .btn:last-child
            margin-right: 0
    .sd-wrapper
      position: absolute
      left: 0
      top: 525px
      width: 100%
      bottom: 0
      .sd-nav-wrapper
        width: 100%
        @include px2rem(height, 85px)
        box-sizing: border-box
        border-bottom: 1px solid #eaeaea; /*no*/
        position: relative
        .sdcur
          width: 25%
          @include px2rem(height, 8px)
          background: #60c17e
          position: absolute
          bottom: 0
          left: 0
          box-sizing: border-box
          overflow: hidden
        .sd-nav
          display: flex
          width: 100%
          height: 100%
          li.cur
            color: #60c17e
          li
            width: 25%
            color: #7f7f7f
            font-size: 32px; /*px*/
            display: flex
            justify-content: center
            align-items: center
</style>
