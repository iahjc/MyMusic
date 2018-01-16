<template>
  <header class="s-header">
    <div class="s-h-nav">
      <i class="fa  fa-chevron-left"></i>
    </div>

    <ul class="s-h-cont">
      <li class="cur">歌手</li>
      <li>我的</li>
    </ul>

    <div class="s-h-search">
      <i class="fa fa-search"></i>
    </div>
  </header>
</template>

<script>
export default {
}
</script>

<style lang="sass" scoped="" type="text/css">
  @import "../../common/scss/helpers/variables.scss";
  @import "../../common/scss/helpers/mixins.scss";
  @import "../../common/scss/base/base.scss";

  .s-header
    background-color: #61bf81
    @include px2rem(height, 86px)
    width: 100%
    display: flex
    justify-content: space-between
    align-items: center
    .s-h-nav
      color: #fff
      @include px2rem(width, 80px)
      text-align: center
      i
        @include font-dpr(18px)
    .s-h-cont
      display: flex
      @include px2rem(width, 330px)
      @include px2rem(height, 56px)
      box-sizing: border-box
      border: 2px solid #fff
      border-radius: 6px
      li
        width: 50%
        text-align: center
        @include px2rem(line-height, 52px)
        color: #fff
        @include font-dpr(12px)
      li.cur
        background: #fff
        color: #61bf81
    .s-h-search
      @include px2rem(width, 80px)
      text-align: center
      i
        color: #fff
        @include font-dpr(18px)
</style>
