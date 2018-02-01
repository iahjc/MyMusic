<template>
  <header class="header">
    <section class="mh-t">
      <div class="mh-t-navbar" @click="showNavbar">
      </div>
      <nav class="mh-t-nav">
        <ul>
          <router-link :to="{ path: '/main/mymusic' }"><li>我的</li></router-link>
          <router-link :to="{ path: '/main/musichall' }"><li>音乐馆</li></router-link>
          <a href="#"><li>发现</li></a>
        </ul>
      </nav>
      <div class="mh-t-cr">

      </div>
    </section>

    <div class="mh-search"  @click="search">
      <i class="fa fa-search"></i>&nbsp;&nbsp;<span>搜索</span>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    // 打开/关闭左侧导航
    showNavbar() {
      this.$emit('showNavbar')
    },
    search() {
      this.$emit('search')
    }
  }
}
</script>

<style lang="sass" scoped="" type="text/css">
  @import "../../common/scss/helpers/variables.scss";
  @import "../../common/scss/helpers/mixins.scss";
  @import "../../common/scss/base/base.scss";

  .header
    width: 100%
    @include px2rem(height, 152px)
    background-color: $header-bg
    display: flex
    flex-direction: column
    align-items: center
    position: absolute
    left: 0
    top: 0
    .mh-t
      display: flex
      width: 90%
      justify-content: space-between
      @include px2rem(height, 80px)
      align-items: center
      .mh-t-navbar
        @include px2rem(width, 34px)
        @include px2rem(height, 4px)
        background-color: $h-nav-bg
        position: relative
        &::after,&::before
          content: ' '
          background-color: $h-nav-bg
          @include px2rem(width, 34px)
          @include px2rem(height, 4px)
          position: absolute
          @include px2rem(bottom, -10px)
        &::after
          @include px2rem(top, -10px)
      .mh-t-nav
        ul
          display: flex
          @include font-dpr(15px)
          color: $h-cr-color
          @include px2rem(height, 50px)
          align-items: center
          a
            display: inline-block
            @include px2rem(margin-right, 47px)
            color: #f8ffff
            @include px2rem(height, 50px)
            display: flex
            align-items: center
          a.router-link-exact-active,a.router-link-active
            li
              color: #fff
          a:last-child
            margin-right: 0
      .mh-t-cr
        @include px2rem(width, 34px)
        @include px2rem(height, 4px)
        background-color: $h-nav-bg
        position: relative
        &::before
          content: ' '
          @include px2rem(width, 34px)
          @include px2rem(height, 4px)
          background-color: $h-nav-bg
          position: absolute
          transform: rotate(90deg)
  .mh-search
    width: 90%
    @include px2rem(height, 60px)
    background-color: $h-input-color
    display: flex
    align-items: center
    justify-content: center
    @include font-dpr(15px)
    color: #fff

</style>
