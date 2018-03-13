<template>
<section class="song-list" v-show="album">
  <t-header :title="title" @back="back" @selectRightMenu="selectRightMenu"></t-header>
  <single-top :detas="album"></single-top>
  <scroll class="sl-wrapper" :data="songList" ref="scroll">
    <div>
      <song-menu @playAll="playAll"></song-menu>
      <div class="sl-list">
        <song-item :item="item" v-for="(item, index) in songList" :key="index" :index="index" @selectItem="selectItems"></song-item>
      </div>
    </div>
  </scroll>
  <msg ref="msg"></msg>
</section>
</template>

<script>
import {mapActions, mapMutations} from 'vuex'
import { createSingerSong, processSongsUrl } from 'domain/song'
import {
  getSongList,
  getCollectionNum
} from 'api/musichall'
import Scroll from 'base/scroll/scroll'
import { getAlbumInfo } from 'api/album'
import THeader from 'base/t-header/t-header'
import SingleTop from 'components/single-top/single-top'
import SongMenu from 'base/song-menu/song-menu'
import SongItem from 'base/song-item/song-item'
import Msg from 'base/msg/msg'
import {playlistMixin} from 'common/js/mixin'

export default {
  mixins: [playlistMixin],
  components: {
    Scroll,
    SongMenu,
    SongItem,
    SingleTop,
    THeader,
    Msg
  },
  data() {
    return {
      album: {},
      coll: {},
      songList: null,
      songCount: 0,
      title: '专辑'
    }
  },
  created() {
    this.getAlbumInfo()
    this._getCollectionNum()
  },
  methods: {
    handlePlayList(playList) {
      const bottom = playList.length > 0 ? `1.3333333rem` : ''
      this.$refs.scroll.$el.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
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
          icon: 'share-alt',
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
    ...mapMutations({
      setAuxiliaryList: 'SET_AUXILIARYLIST',
      setAuxiliaryState: 'SET_AUXILIARYSTATE',
      setAuxiliaryActions: 'SET_AUXILIARYACTIONS',
      setShareState: 'SET_SHARESTATE'
    }),
    back() {
      this.$router.back()
    },
    getAlbumInfo() {
      getAlbumInfo(this.$route.params.id).then((res) => {
        let reg = new RegExp(`^ albuminfoCallback\\(`)
        let reg2 = new RegExp('\\)$')
        res = res.replace(reg, '').replace(reg2, '')
        res = JSON.parse(res)
        this.album = res.data
        processSongsUrl(this._initSongList(res.data.list)).then((songs) => {
          this.songList = songs
        })
        this.songCount = res.data.cur_song_num
      }).then((err) => {
        console.log(err)
      })
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
        if (musicData.albummid && musicData.songmid) {
          ret.push(createSingerSong(musicData))
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
          this.songList = this._initSongList(res.cdlist[0].songlist)
          this.songCount = res.cdlist[0].cur_song_num
        }
      }).then((err) => {
        console.log(err)
      })
    }
  }
}
</script>

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
    .sl-h
      width: 100%
      position: absolute
      left: 0
      @include px2rem(height, 80px)
      display: flex
      justify-content: space-between
      align-items: center
      z-index: 10
      .sl-h-nav
        @include px2rem(width, 100px)
        display: flex
        justify-content: center
        i
          color: #fff
          font-size: 64px; /*px*/
      p
        font-size: 35px; /*px*/
        color: #fffdfe
      .sl-h-r
        @include px2rem(width, 100px)
        display: flex
        justify-content: center
        i
          font-size: 40px; /*px*/
          color: #fff
    .sl-c
      @include px2rem(height, 520px)
      display: flex
      justify-content: center
      align-items: center
      flex-direction: column
      position: relative
      overflow: hidden
      .sl-c-bg
        width: 100%
        height: 100%
        position: absolute
        img
          width: 100%
          height: 100%
          filter: blur(90px)
        div
          width: 100%
          height: 100%
          background-color: rgba(0, 0, 0, .2)
          position: absolute
          left: 0
          top: 0
          z-index: 1
      .sl-z
        position: relative
        z-index: 10
        display: flex
        align-items: center
        overflow: hidden
        @include px2rem(height, 250px)
        .sl-z-img
          @include px2rem(width, 250px)
          @include px2rem(height, 250px)
          img
            width: 100%
            height: 100%
        .sl-z-c
          @include px2rem(width, 382px)
          @include px2rem(margin-left, 24px)
          h2
            font-size: 34px; /*px*/
            @include px2rem(line-height, 38px)
            @include px2rem(width, 320px)
            color: #fff3f7
          .sl-z-a
            @include px2rem(height, 52px)
            display: flex
            align-items: center
            @include px2rem(margin-top, 24px)
            @include px2rem(margin-bottom, 24px)
            .sl-z-a-i
              @include px2rem(width, 52px)
              @include px2rem(height, 52px)
              @include px2rem(margin-right, 10px)
              position: relative
              img
                width: 100%
                border-radius: 300px
              img:last-child
                @include px2rem(width, 15px)
                @include px2rem(height, 16px)
                position: absolute
                right: 0
                bottom: 0
            span
              font-size: 24px; /*px*/
              color: #f9f1ef
        p
          text-overflow: ellipsis
          @include px2rem(height, 32px)
          @include px2rem(line-height, 32px)
          overflow: hidden
          font-size: 26px; /*px*/
          color: #fff8f0
      .sl-b
        display: flex
        color: #fcfcfe
        position: absolute
        bottom: 6%
        z-index: 5
        width: 100%
        justify-content: space-between
        @include px2rem(width, 650px)
        li
          @include px2rem(height, 36px)
          display: flex
          align-items: center
          i
            font-size: 36px; /*px*/
    .sl-wrapper
      position: absolute
      @include px2rem(top, 520px)
      width: 100%
      bottom: 0
      overflow: hidden
</style>
