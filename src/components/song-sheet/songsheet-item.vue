<template lang="html">
  <div :class="$style.item">
    <div :class="$style.img" v-if="!item.icon">
      <div :class="$style.icon">
        <i class="fa fa-music"></i>
      </div>
    </div>
    <div :class="[$style.img, $style.photo]" v-if="item.icon">
        <i :class="item.icon"></i>
    </div>
    <div :class="$style.title">
      <p>
        {{item.songSheetName}}
      </p>
      <p>
        共 {{item.songsNum}} 首
      </p>
    </div>
    <div :class="$style.r">
      <i class="fa fa-chevron-right"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style lang="sass" scoped="" type="text/css" module>
  .item
    width: 100%
    border-bottom: 1px solid #f9f9f9; /*no*/
    display: flex
    align-items: center
    height: 120px
    div.photo
      background: #fff
      i
        color: #61bf81
        font-size: 60px; /*px*/
    .img
      width: 120px
      height: 120px
      background: #ececec
      display: flex
      justify-content: center
      align-items: center
      .icon
        width: 70px
        height: 70px
        border-radius: 100%
        overflow: hidden
        border: 4px solid #d6d6d6
        display: flex
        align-items: center
        justify-content: center
        i
          font-size: 32px; /*px*/
          color: #d6d6d6
    .title
      flex: 1
      display: flex
      justify-content: center
      flex-direction: column
      font-size: 30px; /*px*/
      box-sizing: border-box
      padding-left: 20px
      p:first-child
        font-size: 30px; /*px*/
        line-height: 45px
        color: #444
      p:last-child
        font-size: 24px; /*px*/

        line-height: 38px
        color: #bdbdbd
    .r
      width: 80px
      height: 80px
      display: flex
      justify-content: center
      align-items: center
      i
        color: #808080
        font-size: 30px; /*px*/
</style>
