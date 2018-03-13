<template>
<section :class="$style.rankList" v-show="detas">
  <t-header :title="topList.ListName" @back="back" @selectRightMenu="selectRightMenu"></t-header>
  <div :class="$style.content">
    <div :class="$style.background" :style="bgStyle">
    </div>
    <div :class="$style.title">
      {{topList.update_key}} 更新
    </div>
  </div>
  <scroll :class="$style.rankWrapper" :data="songList">
    <div>
      <song-menu></song-menu>
      <song-item :item="item" v-for="(item, index) in songList" :key="index" :index="index" @selectItem="selectItems"></song-item>
    </div>
  </scroll>
  <msg ref="msg"></msg>
</section>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import { createSingerSong, processSongsUrl } from 'domain/song'
import {
  getRankList
} from 'api/rank'
import Scroll from 'base/scroll/scroll'
import THeader from 'base/t-header/t-header'
import SongMenu from 'base/song-menu/song-menu'
import SongItem from 'base/song-item/song-item'
import Msg from 'base/msg/msg'

export default {
  components: {
    // MusicList,
    Scroll,
    THeader,
    SongMenu,
    SongItem,
    Msg
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.topList.pic_v12})`
    },
    ...mapGetters([
      'topList'
    ])
  },
  data() {
    return {
      detas: {},
      coll: {},
      songList: null,
      songs: {}
    }
  },
  created() {
    this._getRankList()

    getRankList('26', '2018_8').then((res) => {
      let reg = new RegExp(`^ MusicJsonCallbacktoplist\\(`)
      let reg2 = new RegExp('\\)$')
      res = res.replace(reg, '').replace(reg2, '')
      res = JSON.parse(res)
    })
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
    ...mapMutations({
      setAuxiliaryList: 'SET_AUXILIARYLIST',
      setAuxiliaryState: 'SET_AUXILIARYSTATE',
      setAuxiliaryActions: 'SET_AUXILIARYACTIONS',
      setShareState: 'SET_SHARESTATE'
    }),
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
        musicData = musicData.data
        if (musicData.songid && musicData.albumid) {
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
    _getRankList() {
      let rid = this.$route.params.id
      let arr = rid.split(',,,')
      if (arr.length > 1) {
        getRankList(arr[0], arr[1]).then((res) => {
          let reg = new RegExp(`^ MusicJsonCallbacktoplist\\(`)
          let reg2 = new RegExp('\\)$')
          res = res.replace(reg, '').replace(reg2, '')
          res = JSON.parse(res)
          this.songs = res
          processSongsUrl(this._initSongList(res.songlist)).then((songs) => {
            this.songList = songs
          })
        })
      }
    }
  }
}
</script>

<style lang="sass" scoped="" type="text/css" module>
  .rankList
    width: 100%
    position: fixed
    bottom: 0
    overflow: hidden
    top: 0
    .content
      height: 500px
      display: flex
      justify-content: center
      align-items: center
      flex-direction: column
      position: relative
      overflow: hidden
      .background
        width: 100%
        height: 100%
        position: absolute
        background-size: cover
        background-position: center
      .title
        position: absolute
        z-index: 10
        display: flex
        align-items: center
        overflow: hidden
        bottom: 30px
        font-size: 28px; /*px*/
        color: #fff
    .rankWrapper
      position: absolute
      width: 100%
      bottom: 0
      top: 500px
      left: 0
      overflow: hidden
</style>
