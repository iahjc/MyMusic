<template lang="html">
  <section :class="[$style.radioItem, cname]" @click="selectItem">
    <div :class="$style.img">
      <img v-lazy="item.radioImg" />
    </div>
    <p>
      {{item.radioName}}
    </p>
    <p>
      播放量：{{Math.round((item.listenNum / 10000) * 100) / 100}} 万
    </p>
  </section>
</template>

<script>
export default {
  props: {
    cname: {
      type: String,
      default: ''
    },
    item: {
      type: Object,
      default: {}
    }
  },
  methods: {
    selectItem() {
      this.$emit('selectItem', this.item.radioId)
    }
  }
}
</script>

<style lang="sass" scoped="" type="text/css" module>
  .radioItem
    padding-bottom: 30px
    .img
      width: 100%
      img
        width: 100%
    p:nth-child(2)
      width: 90%
      margin: 0 auto
      font-size: 28px; /*px*/
      line-height: 60px
    p:nth-child(3)
      width: 90%
      margin: 0 auto
      font-size: 24px; /*px*/
      color: #999
</style>
