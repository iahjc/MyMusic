<template>
<section :class="$style.songSheet" v-show="songSheet">
  <t-header :title="songSheet.songSheetName" @back="back" @selectRightMenu="selectRightMenu"></t-header>
  <single-top :detas="songSheet"></single-top>
  <scroll :class="$style.songSheetWrapper" ref="scroll">
    <div>
      <song-menu></song-menu>
      <song-item :item="item" v-for="(item, index) in songs" :key="index" :index="index" @selectItem="selectItems"></song-item>
    </div>
    <div :class="[$style.btn2, $style.pos]" v-show="!songs || songs.length <= 0" @click="addSongSheet">
      添加歌曲
    </div>
  </scroll>

  <addsongs ref="addSongs" :sid="sid" :songSheetName="songSheetName" @refreshSongsheet="refreshSongsheet"></addsongs>
  <msg ref="msg"></msg>
</section>
</template>

<script>
import {mapActions, mapMutations} from 'vuex'
import { createSong, processSongsUrl } from 'domain/song'
import Song from 'domain/song'
import { findSongSheet } from 'db/songSheet'
import Scroll from 'base/scroll/scroll'
import THeader from 'base/t-header/t-header'
import SingleTop from 'components/single-top/single-top'
import Addsongs from 'components/song-sheet/addsongs'
import SongItem from 'base/song-item/song-item'
import SongMenu from 'base/song-menu/song-menu'
import Msg from 'base/msg/msg'
import {playlistMixin} from 'common/js/mixin'
export default {
  mixins: [playlistMixin],
  components: {
    Scroll,
    THeader,
    SingleTop,
    Addsongs,
    SongItem,
    SongMenu,
    Msg
  },
  data() {
    return {
      songs: null,
      songSheet: null,
      sid: 0,
      layerDatas: []
    }
  },
  created() {
    this.sid = this.$route.params.id
    this.getSongSheet(this.sid)
  },
  methods: {
    handlePlayList(playList) {
      const bottom = playList.length > 0 ? `1.3333333rem` : ''
      this.$refs.scroll.$el.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    ...mapMutations({
      setAuxiliaryList: 'SET_AUXILIARYLIST',
      setAuxiliaryState: 'SET_AUXILIARYSTATE',
      setAuxiliaryActions: 'SET_AUXILIARYACTIONS',
      setShareState: 'SET_SHARESTATE'
    }),
    refreshSongsheet() {
      // 判断有没有添加
      let songsheet = findSongSheet(this.sid)
      if (songsheet.songs.length > 0 && songsheet.songs.length > this.songSheet.songs.length) {
        this.getSongSheet(this.sid)
      }
    },
    addSongs() {
      this.closeAuxiliary()
      this.addSongSheet()
    },
    selectRightMenu() {
      let list = [
        {
          title: '添加歌曲',
          icon: 'plus-square-o',
          action: this.addSongs,
          showFlag: true
        },
        {
          title: '编辑详情',
          icon: 'pencil',
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
          title: '投稿',
          icon: 'rocket',
          action: this.openMsg,
          showFlag: true
        },
        {
          title: '恢复歌单',
          icon: 'list-ul',
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
    addSongSheet() {
      this.$refs.addSongs.show()
    },
    getSongSheet(id) {
      this.songSheet = findSongSheet(id)
      if (!this.songSheet) {
        this.$router.push({
          path: `/main/musichall`
        })
      }
      this.songSheetName = this.songSheet.songSheetName
      if (this.songSheet.songs.length > 0) {
        let songss = []
        this.songSheet.songs.forEach((item) => {
          item = new Song({
              id: item.id,
              mid: item.mid,
              singer: item.singer,
              name: item.name,
              album: item.album,
              duration: item.duration,
              image: item.image,
              url: item.url,
              des: item.des,
              isMv: item.isMv,
              isOnly: item.isOnly,
              pay: item.pay,
              count: item.count,
              lyricContent: item.lyricContent,
              lyricTitle: item.lyricTitle,
              description: item.description
          })
          songss.push(item)
        })
        processSongsUrl(songss).then((songs) => {
          this.songs = songs
        })
      } else {
        this.songs = []
      }
    },
    back() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
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
        list: this.songs,
        index: index
      })
    }
  }
}
</script>

<style lang="sass" scoped="" type="text/css" module>
  @import "../../common/scss/components/buttons.scss";
  .songSheet
    width: 100%
    position: fixed
    bottom: 0
    overflow: hidden
    top: 0
    .songSheetWrapper
      position: absolute
      top: 500px
      width: 100%
      bottom: 0
      overflow: hidden
      .pos
        position: absolute
        left: 50%
        top: 20%
        transform: translate(-50%, -50%)
</style>
