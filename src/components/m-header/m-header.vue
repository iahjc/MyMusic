<template>
  <header class="header">
    <section class="mh-t">
      <div class="mh-t-navbar">

      </div>
      <nav class="mh-t-nav">
        <ul>
          <li>
            我的
          </li>
          <li>
            音乐馆
          </li>
          <li>
            发现
          </li>
        </ul>
      </nav>
      <div class="mh-t-cr">

      </div>
    </section>

    <div class="mh-search">
      <input type="text" name="search"/>
    </div>
  </header>
</template>

<script>
export default {}
</script>

<style lang="sass" scoped="" type="text/css">
  @import "../../common/scss/helpers/variables.scss";
  @import "../../common/scss/helpers/mixins.scss";
  @import "../../common/scss/base/base.scss";

  .header
    width: 100%
    @include px2rem(height, 220px)
    background-color: $header-bg
    display: flex
    flex-direction: column
    align-items: center
    .mh-t
      display: flex
      width: 90%
      justify-content: space-between
      @include px2rem(height, 115px)
      align-items: center
      .mh-t-navbar
        @include px2rem(width, 50px)
        @include px2rem(height, 6px)
        background-color: $h-nav-bg
        position: relative
        &::after,&::before
          content: ' '
          background-color: $h-nav-bg
          @include px2rem(width, 50px)
          @include px2rem(height, 6px)
          position: absolute
          @include px2rem(bottom, -15px)
        &::after
          @include px2rem(top, -15px)
      .mh-t-nav
        ul
          display: flex
          @include font-dpr(18px)
          color: $h-cr-color
          li
            @include px2rem(margin-right, 28px)
          li:last-child
            margin-right: 0
      .mh-t-cr
        @include px2rem(width, 50px)
        @include px2rem(height, 6px)
        background-color: $h-nav-bg
        position: relative
        &::before
          content: ' '
          @include px2rem(width, 50px)
          @include px2rem(height, 6px)
          background-color: $h-nav-bg
          position: absolute
          transform: rotate(90deg)
  .mh-search
    width: 90%
    @include px2rem(height, 82px)
    input
      width: 100%
      height: 100%
      background-color: $h-input-color
</style>
