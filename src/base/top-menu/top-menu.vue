<template lang="html">
  <section :class="$style.menu">
    <h4>{{title}}</h4>
    <ul>
      <li :class="{active: currentIndex === index}" v-for="(item, index) in navs" :key="index" @click="selectItem(item, index, $event)">{{item.title}}</li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    title: {
      type: String,
      default: '全部歌单'
    },
    navs: {
      type: Array,
      default() {
        return [
          {
            title: '推荐',
            sortid: 5
          },
          {
            title: '最新',
            sortid: 2
          }
        ]
      }
    }
  },
  methods: {
    selectItem(item, index, ev) {
      this.currentIndex = index
      this.$emit('selectMenuItem', item, index, ev)
    }
  }
}
</script>
<style lang="sass" scoped="" type="text/css">
  .active
    color: rgb(95, 186, 127)
</style>

<style lang="sass" scoped="" type="text/css" module>
  .menu
    display: flex
    justify-content: space-between
    height: 92px
    align-items: center
    h4
      display: inline-block
      line-height: 92px
      height: 92px
      font-size: 32px; /*px*/
    ul
      display: flex
      height: 92px
      li
        font-size: 26px; /*px*/
        line-height: 92px
        padding: 0 20px
        position: relative
</style>
