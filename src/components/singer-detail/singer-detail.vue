<template>
  <section :class="$style.singerDetail">
    <t-header :title="title" @back="back" @selectRightMenu="selectRightMenu"></t-header>
    <scroll :class="$style.detailWrapper"
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
          <author-detail :singer="singer" :fansNum="fansNum"></author-detail>
          <nav-menu @selectMenuItem="selectMenuItem" :navs="navs"></nav-menu>
          <div :class="$style.content">
            <div class="sd-c-1">
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
    <msg ref="msg"></msg>
  </section>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import {getFSNum, getSingerDetail, getSinger, getAlbum, getMV} from 'api/singer'
import { createSingerSong, processSongsUrl } from 'domain/song'
import { createAlbum } from 'domain/album'
import AlbumList from 'base/album-list/album-list'
import MvList from 'base/mv-list/mv-list'
import SingerDetail from 'base/singer-detail/singer-detail'
import Scroll from 'base/scroll/scroll'
// import {prefixStyle} from 'common/js/utils/dom'
import SongApi from 'api/song'
import { NUM } from 'common/js/config/page'
import Loading from 'base/loading/loading'
import THeader from 'base/t-header/t-header'
import AuthorDetail from 'components/singer-detail/author-detail'
import MusicList from 'components/singer-detail/music-list'
import NavMenu from 'base/nav-menu/nav-menu'
import {playlistMixin} from 'common/js/mixin'
import Msg from 'base/msg/msg'
let songApi = new SongApi()
// let transform = prefixStyle('transform')
// let transform2 = prefixStyle('transform')
// const filter = prefixStyle('filter')
let page = 1
export default {
  mixins: [playlistMixin],
  components: {
    AlbumList,
    MvList,
    SingerDetail,
    AuthorDetail,
    MusicList,
    Scroll,
    Loading,
    THeader,
    NavMenu,
    Msg
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
      sdHeight: 0,
      layerDatas: null
    }
  },
  created() {
    this.mid = this.$route.params.id
    this._getSongs(this.mid)
    this._getFsNum(this.mid)
    this._getAlbum(this.mid)
    this._getMV(this.mid)
    this._getSinger(this.mid)
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
    handlePlayList(playList) {
      const bottom = playList.length > 0 ? `1.3333333rem` : ''

      this.$refs.list.refresh()
    },
    ...mapMutations({
      setAuxiliaryList: 'SET_AUXILIARYLIST',
      setAuxiliaryState: 'SET_AUXILIARYSTATE',
      setAuxiliaryActions: 'SET_AUXILIARYACTIONS',
      setShareState: 'SET_SHARESTATE'
    }),
    selectRightMenu() {
      let list = [
        {
          title: '加到歌单',
          icon: 'plus-square-o',
          action: this.openMsg,
          showFlag: true
        },
        {
          title: '分享歌手',
          icon: 'share',
          action: this.openShare,
          showFlag: true
        }
      ]

      let actions = [
        {
          action: this.closeAuxiliary
        }
      ]

      this.setAuxiliaryActions(actions)
      this.setAuxiliaryList(list)
      this.setAuxiliaryState(true)
    },
    openShare() {
      let list = [
        {
          title: '微信好友',
          icon: 'weixin',
          action: '',
          showFlag: true
        },
        {
          title: '朋友圈',
          icon: 'fonticons',
          action: '',
          showFlag: true
        },
        {
          title: 'QQ',
          icon: 'qq',
          action: '',
          showFlag: true
        },
        {
          title: '新浪微博',
          icon: 'weibo',
          action: '',
          showFlag: true
        },
        {
          title: 'github',
          icon: 'github',
          action: '',
          showFlag: true
        },
        {
          title: '推特',
          icon: 'twitter',
          action: '',
          showFlag: true
        }
      ]
      this.setAuxiliaryState(false)
      setTimeout(() => {
        this.setAuxiliaryList(list)
        this.setAuxiliaryState(true)
      }, 300)
    },
    closeAuxiliary() {
      this.setAuxiliaryState(false)
    },
    openMsg() {
      this.closeAuxiliary()
      this.$refs.msg.show({
        msg: '该功能未实现，敬请期待!',
        msgType: 'error',
        delay: 900
      })
    },
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
        menuItem.hide()
      })
      this.items[index].show()
    },
    searchMore() {
      if (!this.hasMore) {
        return flase
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
        processSongsUrl(this._initSongList(res.data.list)).then((songs) => {
          this.songList = songs
        })
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
  watch: {
    scrollY(newVal) {

    }
  }
}
</script>
<style lang="sass" scoped="" type="text/css" module>
  .singerDetail
    width: 100%
    position: fixed
    width: 100%
    left: 0
    top: 0
    bottom: 0
    .detailWrapper
      position: absolute
      left: 0
      top: 0
      width: 100%
      bottom: 0
      .content
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
