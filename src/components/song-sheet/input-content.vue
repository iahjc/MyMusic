<template lang="html">
  <div :class="$style.input">
    <input type="text" ref="input" v-model="title" placeholder="歌单标题" />
    <div :class="$style.remove" v-show="title" @click="removeTitle">
      <i class="fa fa-remove"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: ''
    }
  },
  methods: {
    removeTitle() {
      this.title = ''
    },
    getTitle() {
      return this.title
    }
  }
}
</script>

<style lang="sass" scoped="" type="text/css" module>
  .input
    height: 80px
    box-sizing: border-box
    border-bottom: 1px solid #f2f2f2; /*no*/
    display: flex
    justify-content: space-between
    .remove
      width: 80px
      height: 80px
      box-sizing: border-box
      display: flex
      justify-content: center
      align-items: center
      i
        color: #ccc
        font-size: 36px; /*px*/
    input
      height: 100%
      box-sizing: border-box
      padding-left: 3%
      width: 80%
      border: 0
      font-size: 28px; /*px*/
      color: #747474
</style>
