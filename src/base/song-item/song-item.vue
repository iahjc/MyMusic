<template lang="html">
  <div :class="$style.songItem">
    <div :class="$style.cont" @click="selectItem">
      <h4>{{item.name}}&nbsp;&nbsp;<span :class="$style.icon">SQ</span>&nbsp;&nbsp;<span :class="$style.icon">独家</span></h4>
      <p>{{item.singer}} · {{item.album}}</p>
    </div>
    <div :class="$style.middle">
      <span :class="$style.icon">MV</span>
    </div>
    <div :class="$style.control">
      <i :class="actions.icon"></i>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    selectItem() {
      this.$emit('selectItem', this.item, this.index)
    }
  },
  props: {
    actions: {
      type: Object,
      default: {
        icon: 'fa fa-ellipsis-h'
      }
    },
    item: {
      type: Object,
      default: {}
    },
    index: {
      type: Number,
      default: -1
    }
  }
}
</script>

<style lang="sass" scoped="" type="text/css" module>
  @import "../../common/scss/components/icon.scss";
  .songItem
    display: flex
    width: 100%
    border-bottom: 1px solid #f6f6f6; /*px*/
    box-sizing: border-box
    padding-left: 2.5%
    justify-content: space-between
    .middle
      display: flex
      align-items: center
      .icon
        @include icon
    .control
      width: 70px
      justify-content: center
      display: flex
      align-items: center
      i
        font-size: 30px; /*px*/
        color: #9f9f9f
    .cont
      width: 600px
      p
        font-size: 22px; /*px*/
        color: #767676
        margin-bottom: 8px
      h4
        font-size: 28px; /*px*/
        display: flex
        align-items: center
        margin-top: 16px
        margin-bottom: 8px
        .icon
          @include icon
</style>
