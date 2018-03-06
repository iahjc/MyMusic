<template lang="html">
  <section :class="$style.searchHistory">
    <h4><span>搜索历史</span><span @click="clearAll">删除历史</span></h4>
    <ul :class="$style.content" ref="content">
      <li v-for="(item, index) in historyList" :key="index">
        <span>{{item}}</span>
        <i class="fa fa-remove" @click="removeKey(item, index, $event)"></i>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    historyList: {
      type: Array,
      default: []
    }
  },
  methods: {
    clearAll() {
      this.$emit('clearAll')
    },
    removeKey(item, index, ev) {
      this.$emit('removeKey', item, index, this.removeItem, ev)
    },
    removeItem(ev) {
      let el = ev.target || ev.srcElement
      this.$refs.content.removeChild(el.parentNode)
    }
  }
}
</script>

<style lang="sass" scoped="" type="text/css" module>
  .searchHistory
    width: 100%
    .content
      width: 100%
      li
        align-items: center
        box-sizing: border-box
        display: flex
        justify-content: space-between
        height: 90px
        width: 90%
        margin: 0 auto
        font-size: 30px; /*px*/
        border-bottom: 1px solid #f0f0f0; /*no*/
        i
          font-size: 28px; /*px*/
          color: #808080
          padding: 10px
    h4
      height: 92px
      display: flex
      justify-content: space-between
      align-items: center
      font-size: 26px; /*px*/
      border-bottom: 1px solid #f8f8f8; /*no*/
      box-sizing: border-box
      padding-left: 4%
      padding-right: 4%
      span:last-child
        color: #b0e4bb
</style>
