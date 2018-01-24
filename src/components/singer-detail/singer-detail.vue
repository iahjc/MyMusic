<template>
  <section class="singer-detail">
    <header class="sl-h">
      <div class="sl-h-nav" @click="back">
        <i class="fa fa-angle-left"></i>
      </div>
      <p></p>
      <div class="sl-h-r">
         <i class="fa fa-ellipsis-h"></i>
      </div>
    </header>

    <div class="sd-h">
      <div class="sd-bg">

      </div>
    </div>
  </section>
</template>

<script>
import {getFSNum, getSingerDetail} from 'api/singer'
export default {
  methods: {
    back() {
      this.$router.go(-1)
    }
  },
  created() {
    getFSNum().then((res) => {
      console.log(res)
    })

    getSingerDetail().then((res) => {
      console.log(res)
    })
  }
}
</script>

<style lang="sass" scoped="" type="text/css">
  @import "../../common/scss/helpers/variables.scss";
  @import "../../common/scss/helpers/mixins.scss";
  @import "../../common/scss/base/base.scss";

  .singer-detail
    width: 100%
    .sl-h
      width: 100%
      position: absolute
      left: 0
      @include px2rem(height, 80px)
      display: flex
      justify-content: space-between
      align-items: center
      z-index: 10
      .sl-h-nav
        @include px2rem(width, 100px)
        display: flex
        justify-content: center
        i
          color: #fff
          @include font-dpr(32px)
      p
        @include font-dpr(15px)
        color: #fffdfe
      .sl-h-r
        @include px2rem(width, 100px)
        display: flex
        justify-content: center
        i
          @include font-dpr(20px)
          color: #fff
    .sd-h
      @include px2rem(height, 760px)
      background: #ccc
      .sd-bg
        @include px2rem(height, 760px)
</style>
