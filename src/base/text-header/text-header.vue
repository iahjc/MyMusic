<template lang="html">
  <header :class="$style.header">
    <ul>
      <li v-for="(item, index) in navs" :key="index" @click="selectItem(item, index)">
        {{item.title}}
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  props: {
    navs: {
      type: Array,
      default() {
        return [
          {
            title: '取消',
            action: null
          },
          {
            title: '新建歌单',
            action: null
          },
          {
            title: '完成',
            action: null
          }
        ]
      }
    }
  },
  methods: {
    selectItem(item, index) {
      if (typeof (item.action) === 'function') {
        item.action()
      }
    }
  }
}
</script>

  <style lang="sass" scoped="" type="text/css" module>
    .header
      height: 80px
      background: #61bf81
      color: #fff
      ul
        display: flex
        align-items: center
        font-size: 30px; /*px*/
        li:first-child,li:last-child
          width: 100px
          height: 80px
          display: flex
          justify-content: center
          align-items: center
        li:nth-child(2)
          flex: 1
          height: 80px
          display: flex
          align-items: center
          justify-content: center
</style>
