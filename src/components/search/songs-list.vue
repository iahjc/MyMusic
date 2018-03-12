<template lang="html">
  <section :class="$style.songsList">
    <song-item :item="item" v-for="(item, index) in songs" @selectItem="selectItem" :key="index" :actions="actions"></song-item>
  </section>
</template>

<script>
import SongItem from 'base/song-item/song-item'
export default {
  methods: {
    selectItem(item, index, ev) {
      this.$emit('selectItem', item, index, ev)
    }
  },
  data() {
    return {
      actions: {
        icon: 'fa fa-plus'
      }
    }
  },
  components: {
    SongItem
  },
  props: {
    songs: {
      type: Array,
      default: []
    }
  }
}
</script>

  <style lang="sass" scoped="" type="text/css" module>
    .songsList
      width: 100%

</style>
