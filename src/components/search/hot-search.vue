<template lang="html">
  <section :class="$style.hotSearch">
    <p>
      热门搜索
    </p>
    <ul>
      <li v-for="(item, index) in keys" :key="index" @click="selectKeyword(item.k)">
        {{item.k}}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    keys: {
      type: Array,
      default: []
    }
  },
  methods: {
    selectKeyword(keywords) {
      this.$emit('selectKeyword', keywords)
    }
  }
}
</script>

<style lang="sass" scoped="" type="text/css" module>
  .hotSearch
    width: 92%
    margin: 36px auto 0 auto
    p
      font-size: 24px; /*px*/
      color: #6a6a6a
    ul
      display: flex
      flex-wrap: wrap
      li
        font-size: 24px; /*px*/
        height: 54px
        padding: 0 20px
        border: 1px solid #d6d6d6; /*no*/
        margin: 20px 10px 0 0
        border-radius: 300px
        display: flex
        align-items: center
        box-sizing: border-box
        color: #000
</style>
