<template lang="html">
  <section :class="$style.global">
    <div :class="$style.item" v-for="item in golbalRank">
      <div :class="$style.top">
        <div :class="$style.img">
          <img v-lazy="item.pic_v12"/>
        </div>
      </div>
      <p>
        {{item.ListName}}
      </p>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    golbalRank: {
      type: Array,
      default: []
    }
  }
}
</script>

<style lang="sass" scoped="" type="text/css" module>
  .global
    display: flex
    flex-wrap: wrap
    justify-content: space-between
    .item
      width: 32.5%
      .top
        width: 100%
        .img
          width: 100%
          img
            width: 100%
      p
        width: 90%
        margin: 0 auto
        font-size: 24px; /*px*/
        color: #272727
        line-height: 28px
        height: 90px
        box-sizing: border-box
        padding-top: 10px
        display: flex
</style>
