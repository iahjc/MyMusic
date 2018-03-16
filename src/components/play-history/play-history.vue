<template lang="html">
  <transition name="l">
  <section :class="$style.playHistory" v-show="showFlag">
    <t-header :bgColor="bgColor" :title="title" :rIcon="rIcon" @back="hide"></t-header>
    <div :class="$style.songMenu">
      <song-menu></song-menu>
    </div>
    <scroll :class="$style.content" ref="scroll" :data="songs">
      <div>
        <song-item :item="item" v-for="(item, index) in songs" :index="index" @selectItem="selectItem" :key="index"></song-item>
      </div>
    </scroll>
  </section>
  </transition>
</template>

<script>
import THeader from 'base/t-header/t-header'
import Scroll from 'base/scroll/scroll'
import SongMenu from 'base/song-menu/song-menu'
import SongItem from 'base/song-item/song-item'
import { processSongsUrl } from 'domain/song'
import {mapGetters, mapActions} from 'vuex'
import Song from 'domain/song'
export default {
  data() {
    return {
      showFlag: false,
      bgColor: '#61bf81',
      title: '最近播放',
      rIcon: 'fa fa-cog',
      songs: []
    }
  },
  created() {
    this.setSongs()
  },
  methods: {
    show() {
      this.showFlag = true
      this.$refs.scroll.refresh()
    },
    hide() {
      this.showFlag = false
    },
    setSongs() {
      this.playHistory.forEach((item) => {
          item = new Song({
              id: item.id,
              mid: item.mid,
              singer: item.singer,
              name: item.name,
              album: item.album,
              duration: item.duration,
              image: item.image,
              des: item.des,
              isMv: item.isMv,
              isOnly: item.isOnly,
              pay: item.pay,
              count: item.count,
              lyricContent: item.lyricContent,
              lyricTitle: item.lyricTitle,
              description: item.description
          })
          this.songs.push(item)
      })

      processSongsUrl(this.songs).then((songs) => {
        this.songs = songs
        console.log(this.songs)
      })
    },
    ...mapActions([
      'selectSingerMusic'
    ]),
    selectItem(item, index) {
      this.selectSingerMusic({
        list: this.songs,
        index: index
      })
    }
  },
  computed: {
    ...mapGetters([
      'playHistory'
    ])
  },
  components: {
    THeader,
    Scroll,
    SongMenu,
    SongItem
  }
}
</script>
<style lang="sass" scoped="" type="text/css" >
  @import "../../common/scss/components/animation.scss";
</style>
<style lang="sass" scoped="" type="text/css" module>
  .playHistory
    position: fixed
    left: 0
    width: 100%
    top: 0
    bottom: 0
    background: #fff
    .songMenu
      margin-top: 75px
    .content
      position: absolute
      width: 100%
      top: 175px
      left: 0
      bottom: 0
      overflow: hidden
</style>
