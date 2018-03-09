<template>
<section :class="$style.songSheet" v-show="songSheet">
  <t-header :title="songSheet.songSheetName" @back="back"></t-header>
  <single-top :detas="songSheet"></single-top>
  <scroll :class="$style.songSheetWrapper">
    <div>
      <song-item :item="item" v-for="(item, index) in songs" :key="index" :index="index" @selectItem="selectItems"></song-item>
    </div>
    <div :class="[$style.btn2, $style.pos]" v-show="!songs || songs.length <= 0" @click="addSongSheet">
      添加歌曲
    </div>
  </scroll>

  <addsongs ref="addSongs" :sid="sid" :songSheet="songSheet"></addsongs>
</section>
</template>

<script>
import {mapActions} from 'vuex'
import { createSong } from 'domain/song'
import { findSongSheet } from 'db/songSheet'
import Scroll from 'base/scroll/scroll'
import THeader from 'base/t-header/t-header'
import SingleTop from 'components/single-top/single-top'
import Addsongs from 'components/song-sheet/addsongs'
import SongItem from 'base/song-item/song-item'

export default {
  components: {
    Scroll,
    THeader,
    SingleTop,
    Addsongs,
    SongItem
  },
  data() {
    return {
      songs: null,
      songSheet: null,
      sid: 0
    }
  },
  created() {
    this.sid = this.$route.params.id
    this.getSongSheet(this.sid)
  },
  methods: {
    addSongSheet() {
      this.$refs.addSongs.show()
    },
    getSongSheet(id) {
      this.songSheet = findSongSheet(id)
      this.songs = this.songSheet.songs
      if (!this.songSheet) {
        this.$router.push({
          path: `/main/musichall`
        })
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
        list: this.songList,
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
      top: 520px
      width: 100%
      bottom: 0
      overflow: hidden
      .pos
        position: absolute
        left: 50%
        top: 10%
        transform: translate(-50%, -50%)
</style>
