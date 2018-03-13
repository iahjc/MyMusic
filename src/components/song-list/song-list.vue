<template lang="html">
<section class="song-list">
  <t-header @back="back" ref="header" :title="title" @selectRightMenu="selectRightMenu"></t-header>
  <scroll class="sl-wrapper"
          :data="songList"
          @scroll="scroll"
          :listen-scroll="listenScroll"
          :probe-type="probeType"
          >
    <div>
      <single-top :detas="detas" ref="singleTop"></single-top>
      <div v-show="menuFlag">
        <song-menu @playAll="playAll"></song-menu>
      </div>
      <div class="sl-list">
        <song-item :item="item" v-for="(item, index) in songList" :key="index" :index="index" @selectItem="selectItems"></song-item>
      </div>
      <div class="musicLoading" v-show="songList.length <= 0">
        <loading :isShow="true"></loading>&nbsp;&nbsp;<span>正在载入......</span>
      </div>
    </div>
  </scroll>
  <div :class="$style.songMenu" v-show="!menuFlag">
    <song-menu></song-menu>
  </div>
</section>
</template>

<script>
import {mapActions, mapMutations} from 'vuex'
import { createSong, processSongsUrl } from 'domain/song'
import {
  getSongList,
  getCollectionNum
} from 'api/musichall'
import SongMenu from 'base/song-menu/song-menu'
import SongItem from 'base/song-item/song-item'
import Scroll from 'base/scroll/scroll'
import THeader from 'base/t-header/t-header'
import SingleTop from 'components/single-top/single-top'
import Loading from 'base/loading/loading'
import {prefixStyle} from 'common/js/utils/dom'

const transform = prefixStyle('transform')

export default {
  components: {
    SongMenu,
    SongItem,
    Scroll,
    THeader,
    SingleTop,
    Loading
  },
  data() {
    return {
      detas: {},
      coll: {},
      songList: [],
      layerDatas: [],
      songCount: 0,
      h: 0,
      scrollY: 0,
      headerH: 0,
      title: '歌单',
      menuFlag: true
    }
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
    this._getSongList()
    this._getCollectionNum()
  },
  mounted() {
    this.h = this.$refs.singleTop.$el.clientHeight
    this.headerH = this.$refs.header.$el.clientHeight
  },
  methods: {
    selectRightMenu() {
      let list = [
        {
          title: '加到歌单',
          icon: 'plus-square-o',
          action: this.openMsg,
          showFlag: true
        },
        {
          title: '分享',
          icon: 'share',
          action: this.openShare,
          showFlag: true
        },
        {
          title: '举报',
          icon: 'ban text-danger',
          action: this.openMsg,
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
    ...mapMutations({
      setAuxiliaryList: 'SET_AUXILIARYLIST',
      setAuxiliaryState: 'SET_AUXILIARYSTATE',
      setAuxiliaryActions: 'SET_AUXILIARYACTIONS',
      setShareState: 'SET_SHARESTATE'
    }),
    back() {
      this.$router.back()
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    playAll() {
      this.selectSingerMusic({
        list: this.songList,
        index: 0
      })
    },
    /**
     * 初始化歌曲数据
     * @return {[type]} [description]
     */
    _initSongList(list) {
      let ret = []
      list.forEach((musicData) => {
        if (musicData.id && musicData.album.id) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    },
    ...mapActions([
      'selectSingerMusic'
    ]),
    selectItems(item, index) {
      this.selectSingerMusic({
        list: this.songList,
        index: index
      })
    },
    _getCollectionNum() {
      let disstid = this.$route.params.id
      getCollectionNum(disstid).then((res) => {
        // 使用正则处理
        let reg = new RegExp(`^getFavNum${disstid}\\(`)
        let reg2 = new RegExp('\\)$')
        res = res.replace(reg, '').replace(reg2, '')
        this.coll = JSON.parse(res)
      })
    },
    _getSongList() {
      let disstid = this.$route.params.id
      getSongList(disstid).then((res) => {
        let reg = new RegExp(`^playlistinfoCallback\\(`)
        let reg2 = new RegExp('\\)$')
        res = res.replace(reg, '').replace(reg2, '')
        res = JSON.parse(res)
        if (res.code === 0) {
          this.detas = res.cdlist[0]
          processSongsUrl(this._initSongList(res.cdlist[0].songlist)).then((songs) => {
            this.songList = songs
          })
          this.songCount = res.cdlist[0].cur_song_num
        }
      }).then((err) => {
        console.log(err)
      })
    }
  },
  watch: {
    scrollY(newVal) {
      let translateY = Math.abs(newVal)
      if (this.h - Math.abs(newVal) <= this.headerH) {
        this.$refs.header.$el.style.backgroundColor = '#61bf81'
        this.title = this.detas.dissname
        this.menuFlag = false
      } else {
        this.title = '歌单'
        this.$refs.header.$el.style.backgroundColor = 'transparent'
        this.menuFlag = true
      }

      if (newVal >= this.headerH) {
        this.$refs.header.$el.style.backgroundColor = '#61bf81'
        this.title = this.detas.dissname
      }
    }
  }
}
</script>
<style lang="sass" scoped="" type="text/css" module>
  .songMenu
    position: absolute
    left: 0
    width: 100%
    background: #fff
    height: 100px
    top: 75px
    z-index: 30
  </style>
<style lang="sass" scoped="" type="text/css">
  @import "../../common/scss/helpers/variables.scss";
  @import "../../common/scss/helpers/mixins.scss";
  @import "../../common/scss/helpers/function.scss";
  @import "../../common/scss/base/base.scss";
  .song-list
    width: 100%
    position: fixed
    bottom: 0
    overflow: hidden
    top: 0
    .sl-wrapper
      position: absolute
      top: 0
      width: 100%
      bottom: 0
      z-index: 10
      .musicLoading
        display: flex
        justify-content: center
        position: absolute
        left: 50%
        top: 700px
        transform: translate(-50%, -50%)
        z-index: 10
</style>
