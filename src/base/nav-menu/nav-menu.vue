<template lang="html">
  <section :class="$style.navMenu">
    <ul>
      <li v-for="(item, index) in navs" :key="index" @click="selectItem(item, index, $event)">
        {{item.title}}<span v-if="item.count">&nbsp;{{item.count}}</span>
      </li>
    </ul>
    <div :class="$style.current" ref="current">

    </div>
  </section>
</template>

<script>
import {prefixStyle} from 'common/js/utils/dom'

let transform = prefixStyle('transform')
export default {
  data() {
    return {
      w: 0
    }
  },
  props: {
    navs: {
      type: Array,
      default() {
        return [
          {
            title: '单曲',
            count: 0
          },
          {
            title: '专辑',
            count: 0
          },
          {
            title: 'MV',
            count: 0
          },
          {
            title: '详情',
            count: 0
          }
        ]
      }
    }
  },
  methods: {
    selectItem(item, index, ev) {
      let l = this.w * index
      this.$refs.current.style.transition = 'all 0.3s'
      this.$refs.current.style[transform] = `translate3d(${l}px, 0, 0)`
      this.$emit('selectMenuItem', item, index, ev)
    }
  },
  mounted() {
    this.w = window.document.body.clientWidth
    let percent = this.w / this.navs.length
    this.$refs.current.style.width = percent + 'px'
    this.w = percent
  }
}
</script>

<style lang="sass" scoped="" type="text/css" module>
  .navMenu
    height: 85px
    width: 100%
    position: relative
    .current
      height: 5px
      background: #62c17f
    ul
      display: flex
      justify-content: space-between
      height: 85px
      li
        display: flex
        justify-content: center
        align-items: center
        flex: 1
        color: #7f7f7f
        font-size: 32px; /*px*/
</style>
