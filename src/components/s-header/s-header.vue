<template>
  <header class="s-header">
    <div class="s-h-nav">
      <i class="fa fa-angle-left"></i>
    </div>

    <ul class="s-h-cont">
      <li>歌手</li>
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
    .s-h-cont
      display: flex
</style>
