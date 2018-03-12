<template lang="html">
  <header :class="$style.tHeader" :style="getStyle">
    <div :class="$style.nav" @click="back">
      <i class="fa fa-angle-left"></i>
    </div>
    <h4 :class="$style.middle" v-if="title">
      {{title}}
    </h4>
    <div :class="$style.control" @click="selectRightMenu">
      <i class="fa fa-ellipsis-h" v-show="rFlag"></i>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '歌单'
    },
    bgColor: {
      type: String,
      default: 'none'
    },
    rFlag: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    getStyle() {
      return `background-color: ${this.bgColor}`
    }
  },
  methods: {
    selectRightMenu() {
      this.$emit('selectRightMenu')
    },
    back() {
      // this.$router.back()
      this.$emit('back')
    }
  }
}
</script>

<style lang="sass" scoped="" type="text/css" module>
  .tHeader
    width: 100%
    position: absolute
    left: 0
    display: flex
    height: 75px
    justify-content: space-between
    z-index: 2
    color: #fff
    .middle
      font-size: 30px; /*px*/
      line-height: 75px
      text-align: center
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      width: 450px
    .nav,.control
      display: flex
      width: 100px
      height: 100%
      justify-content: center
      align-items: center
      i
        font-size: 64px; /*px*/
    .control
      i
        font-size: 40px; /*px*/
</style>
