<template lang="html">
  <section :class="$style.musicList" v-show="showFlag">
    <song-menu></song-menu>
    <song-item :item="item" v-for="(item, index) in songList" :key="index" :index="index" @selectItem="selectItems"></song-item>
  </section>
</template>

<script>
import SongMenu from 'base/song-menu/song-menu'
import SongItem from 'base/song-item/song-item'
export default {
  components: {
    SongMenu,
    SongItem
  },
  data() {
    return {
      showFlag: false
    }
  },
  props: {
    songList: {
      type: Array,
      default: []
    }
  },
  methods: {
    show() {
      this.showFlag = true
    },
    hide() {
      this.showFlag = false
    },
    selectItems(item, index) {
      this.$emit('selectItem', item, index)
    }
  }
}
</script>

<style lang="sass" scoped="" type="text/css" module>
  .musicList
    width: 100%
</style>
