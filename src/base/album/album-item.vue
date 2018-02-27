<template lang="html">
  <div :class="[itemClass, cname]">
    <div class="item_bg">
      <img v-lazy="setImg(item.album.mid)" />
      <i class="fa fa-play-circle-o"></i>
    </div>
    <p>
      {{item.album.name}}
    </p>
    <p>
      <span v-for="li in item.author">{{li.name}}&nbsp;&nbsp;</span>
    </p>
  </div>
</template>

<script>
export default {
  computed: {
  },
  methods: {
    setImg(str) {
      return `https://y.gtimg.cn/music/photo_new/T002R300x300M000${str}.jpg?max_age=2592000`
    }
  },
  data() {
    return {
      itemClass: "item"
    }
  },
  props: {
    item: {
      type: Object,
      default: {}
    },
    cname: {
      type: String,
      default: ''
    }
  },
  created() {
    console.log(this.item)
  }
}
</script>

<style lang="sass" scoped="" type="text/css">
  .item
    width: auto
    .item_bg
      width: 100%
      margin-bottom: 10px
      position: relative
      img
        width: 100%
      i
        position: absolute
        right: 10px
        bottom: 10px
        font-size: 32px; /*px*/
        color: #fff
        opacity: .7
    p
      font-size: 22px; /*px*/
      color: #202020
      width: 95%
      margin: 0 auto
      line-height: 30px
    p:last-child
      color: #6d6d6d
      padding-bottom: 32px
</style>
