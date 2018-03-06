<template>
<section :class="$style.rankList" v-show="detas">
  <t-header :title="topList.ListName" @back="back"></t-header>
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
</section>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import { createSingerSong } from 'domain/song'
import {
  getRankList
} from 'api/rank'
import Scroll from 'base/scroll/scroll'
import THeader from 'base/t-header/t-header'
import SongMenu from 'base/song-menu/song-menu'
import SongItem from 'base/song-item/song-item'

export default {
  components: {
    // MusicList,
    Scroll,
    THeader,
    SongMenu,
    SongItem
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
      console.log(res)
    })
  },
  methods: {
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
          this.songList = this._initSongList(res.songlist)
          console.log(res)
        })
      }
      // _getRankList(disstid).then((res) => {
      //   let reg = new RegExp(`^playlistinfoCallback\\(`)
      //   let reg2 = new RegExp('\\)$')
      //   res = res.replace(reg, '').replace(reg2, '')
      //   res = JSON.parse(res)
      //   if (res.code === 0) {
      //     console.log(res)
      //     this.detas = res.cdlist[0]
      //     this.songList = this._initSongList(res.cdlist[0].songlist)
      //     console.log(this.songList)
      //   }
      // }).then((err) => {
      //   console.log(err)
      // })
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
