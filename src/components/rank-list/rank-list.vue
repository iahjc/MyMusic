<template>
<section class="song-list" v-show="detas">
  <header class="sl-h">
    <div class="sl-h-nav" @click="back">
      <i class="fa fa-angle-left"></i>
    </div>
    <p>
      {{topList.ListName}}
    </p>
    <div class="sl-h-r">
       <i class="fa fa-ellipsis-h"></i>
    </div>
  </header>
  <div class="sl-c">
    <div class="sl-c-bg">
      <img :src="topList.pic_v12" />
    </div>
    <div class="sl-z">
      {{topList.update_key}} 更新
    </div>
  </div>
  <scroll class="sl-wrapper" :data="songList">
    <div>
      <music-list :songList="songList" @selectSingerMusic="selectItems"></music-list>
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
import MusicList from 'components/music-list/music-list'
import Scroll from 'base/scroll/scroll'

export default {
  components: {
    MusicList,
    Scroll
  },
  computed: {
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
          @include font-dpr(32px)
      p
        @include font-dpr(15px)
        color: #fffdfe
      .sl-h-r
        @include px2rem(width, 100px)
        display: flex
        justify-content: center
        i
          @include font-dpr(20px)
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
        div
          width: 100%
          height: 100%
          background-color: rgba(0, 0, 0, .2)
          position: absolute
          left: 0
          top: 0
          z-index: 1
      .sl-z
        position: absolute
        z-index: 10
        display: flex
        align-items: center
        overflow: hidden
        @include px2rem(bottom, 30px)
        @include font-dpr(14px)
        color: #fff
      .sl-b
        display: flex
        color: #fcfcfe
        position: absolute
        bottom: 6%
        z-index: 1000
        width: 100%
        justify-content: space-between
        @include px2rem(width, 650px)
        li
          @include px2rem(height, 36px)
          display: flex
          align-items: center
          i
            @include font-dpr(18px)
    .sl-wrapper
      position: absolute
      @include px2rem(top, 520px)
      width: 100%
      bottom: 0
      overflow: hidden
</style>
