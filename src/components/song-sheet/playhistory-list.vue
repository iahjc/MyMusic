<template lang="html">
  <transition name="l">
  <section :class="$style.playhistorylist" v-show="showFlag">
    <text-header :navs="navs" ref="textHeader"></text-header>
    <div :class="$style.songs">
      <song-item :item="item" v-for="(item, index) in playHistory" @selectItem="selectItem" :key="index" :actions="actions"></song-item>
    </div>
  </section>
  </transition>
</template>

<script>
import TextHeader from 'base/text-header/text-header'
import SongItem from 'base/song-item/song-item'
export default {
  props: {
    playHistory: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    show() {
      this.showFlag = true
    },
    hide() {
      this.showFlag = false
      this.$emit('refreshSongsheet')
    },
    selectItem(item, index, ev) {
      this.$emit('selectItem', item, index, ev)
    }
  },
  data() {
    return {
      showFlag: false,
      actions: {
        icon: 'fa fa-plus'
      },
      navs: [
        {
          title: '',
          action: null
        },
        {
          title: '最近播放',
          action: null
        },
        {
          title: '关闭',
          action: this.hide
        }
      ]
    }
  },
  components: {
    TextHeader,
    SongItem
  }
}
</script>
<style lang="sass" scoped="" type="text/css">
  @import "../../common/scss/components/animation.scss";
  </style>
<style lang="sass" scoped="" type="text/css" module>
  .playhistorylist
    width: 100%
    position: fixed
    left: 0
    top: 0
    bottom: 0
    background: #fff
    .content
      width: 100%
      position: absolute
      top: 80px
      bottom: 0
      left: 0
      overflow: hidden
</style>
