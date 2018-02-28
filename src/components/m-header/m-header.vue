<template>
  <header class="header">
    <section class="mh-t">
      <div class="mh-t-navbar" @click="showNavbar">
        <i class="fa fa-navicon"></i>
      </div>
      <nav class="mh-t-nav">
        <ul>
          <router-link :to="{ path: '/main/mymusic' }"><li>我的</li></router-link>
          <router-link :to="{ path: '/main/musichall' }"><li>音乐馆</li></router-link>
          <a href="#"><li>发现</li></a>
        </ul>
      </nav>
      <div class="mh-t-cr">
        <i class="fa fa-plus"></i>
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
      width: 100%
      justify-content: space-between
      @include px2rem(height, 80px)
      align-items: center
      .mh-t-navbar
        width: 100px
        display: flex
        justify-content: center
        padding-top: 10px
        padding-bottom: 10px
        i
          font-size: 38px; /*px*/
          color: #fff
      .mh-t-nav
        ul
          display: flex
          font-size: 30px; /*px*/
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
        display: flex
        justify-content: center
        width: 100px
        i
          color: #fff
          font-size: 38px; /*px*/
  .mh-search
    width: 90%
    @include px2rem(height, 60px)
    background-color: $h-input-color
    display: flex
    align-items: center
    justify-content: center
    font-size: 30px; /*px*/
    color: #fff

</style>
