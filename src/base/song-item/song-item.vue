<template lang="html">
  <div :class="$style.songItem">
    <div :class="$style.cont" @click.prevent="selectItem($event)">
      <div :class="$style.title">
        <h4>{{item.name}}</h4>&nbsp;&nbsp;
        <span :class="$style.icon">SQ</span>&nbsp;&nbsp;
        <span :class="[$style.icon, $style.screen]">独家</span>
      </div>
      <p>{{item.singer}} · {{item.album}}</p>
    </div>
    <div :class="$style.middle">
      <span :class="$style.mvicon" v-if="">MV</span>
    </div>
    <div :class="$style.control" class="rightMenu">
      <i :class="actions.icon"></i>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    selectItem(ev) {
      this.$emit('selectItem', this.item, this.index, ev)
    }
  },
  props: {
    actions: {
      type: Object,
      default() {
        return {
          icon: 'fa fa-ellipsis-h'
        }
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
      width: 100px
      justify-content: center
      display: flex
      align-items: center
      i.icon
      i
        font-size: 30px; /*px*/
        color: #9f9f9f
    .cont
      width: 600px
      p
        font-size: 22px; /*px*/
        color: #767676
        margin-bottom: 8px
        width: 450px
        height: 24px
        line-height: 24px
        text-overflow: ellipsis
        overflow: hidden
        white-space: nowrap
      .title
        display: flex
        margin-top: 16px
        margin-bottom: 8px
        .icon
          @include icon
        span.screen
          border: 1px solid #61bf81
          color: #61bf81
        h4
          font-size: 28px; /*px*/
          height: 32px
          line-height: 32px
          overflow: hidden
          white-space: nowrap
          text-overflow: ellipsis
          max-width: 400px

</style>
