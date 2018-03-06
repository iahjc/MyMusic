<template lang="html">
  <section :class="$style.wrapper">
    <div :class="$style.item" v-for="(item, index) in ranks" :key="index" @click="selectRankItem(item, index)">
      <div :class="$style.img">
        <img v-lazy="item.pic_v12"/>
      </div>
      <ul :class="$style.middle">
        <li v-for="(item2, index2) in item.songlist" :key="index2">
          {{index2+1}} {{item2.songname}} <span>-</span> <span>{{item2.singername}}</span>
        </li>
      </ul>
      <div :class="$style.r">
        <i class="fa fa-angle-right"></i>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    ranks: {
      type: Array,
      default: []
    }
  },
  methods: {
    selectRankItem(item, index) {
      this.$emit('selectRankItem', item, index)
    }
  }
}
</script>

<style lang="sass" scoped="" type="text/css" module>
  .wrapper
    width: 95%
    margin: 0 auto
    display: flex
    flex-direction: column
    background: #ffffff
    .item
      display: flex
      height: 242px
      margin-top: 22px
      justify-content: space-between
      .img
        width: 242px
        height: 242px
        img
          width: 100%
      .middle
        display: flex
        flex-direction: column
        justify-content: center
        color: #040404
        width: 360px
        margin-left: 12px
        flex: 1
        li
          height: 60px
          line-height: 60px
          font-size: 26px; /*px*/
          overflow: hidden
          span
            color: #6d6d6d
      .r
        width: 60px
        display: flex
        justify-content: center
        align-items: center
        font-size: 40px; /*px*/
        color: #8e8e8e
</style>
