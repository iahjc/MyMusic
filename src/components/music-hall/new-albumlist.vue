<template lang="html">
  <panel title="最新专辑" :class="$style.panel">
    <section :class="$style.list">
      <album-item v-for="item in albums" :item="item" :cname="$style.item" @selectItem="selectItem"></album-item>
    </section>
  </panel>
</template>

<script>
import Panel from 'base/panel/panel'
import AlbumItem from 'base/album/album-item'
export default {
  components: {
    Panel,
    AlbumItem
  },
  props: {
    albums: {
      type: Array,
      default: []
    }
  },
  methods: {
    selectItem(item) {
      this.$emit('selectItem', item)
    }
  }
}
</script>

  <style lang="sass" scoped="" type="text/css" module>
    @import "../../common/scss/layout/layout.scss";
    .panel
      @include panel
      .list
        @include list(row)
        justify-content: space-between
        .item
          width: 32.8%
  </style>
