<template lang="html">
  <section :class="$style.songMenu">
    <div :class="$style.play" @click="playAll">
      <i class="fa fa-play-circle-o"></i>&nbsp;&nbsp;<span>全部播放</span><span v-if="count">({{count}})</span>
    </div>
    <ul :class="$style.nav">
      <li v-for="(item, index) in navs" :key="index">
        <i :class="item.icon"></i>&nbsp;&nbsp;<span>{{item.title}}</span>&nbsp;&nbsp;
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  methods: {
    playAll() {
      this.$emit('playAll')
    }
  },
  props: {
    count: {
      type: Number,
      default: 0
    },
    navs: {
      type: Array,
      default() {
        return  [
          {
            title: '下载',
            icon: 'fa fa-download',
            to: ''
          },
          {
            title: '多选',
            icon: 'fa fa-list',
            to: ''
          }
        ]
      }
    }
  }
}
</script>

<style lang="sass" scoped="" type="text/css" module>
  .songMenu
    width: 100%
    height: 100px
    border-bottom: 1px solid #f2f2f2; /*px*/
    display: flex
    justify-content: space-between
    font-size: 32px; /*px*/
    color: #191919
    i
      color: #59c27d
    .play
      display: flex
      align-items: center
      padding-left: 2.5%
      box-sizing: border-box
      i
        font-size: 42px; /*px*/
    .nav
      display: flex
      align-items: center
</style>
