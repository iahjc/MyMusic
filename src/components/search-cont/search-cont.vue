<template>
  <section class="search-cont">
    <ul class="sd-nav">
      <li>单曲</li>
      <li>MV</li>
      <li>专辑</li>
      <li>歌单</li>
      <li>歌词</li>
    </ul>

    <div class="sc-cont">
      <div class="sc-c1">
        <div class="sc-li" v-for="item in songs">
          {{item.name}}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    songs: {
      type: Array,
      default: []
    }
  }
}
</script>

  <style lang="sass" scoped="" type="text/css">
    @import "../../common/scss/helpers/variables.scss";
    @import "../../common/scss/helpers/mixins.scss";
    @import "../../common/scss/base/base.scss";
    @import "../../common/scss/components/buttons.scss";
    .search-cont
      .sd-nav
        display: flex
        width: 100%
        @include px2rem(height, 85px)
        box-sizing: border-box
        border-style: solid
        @include px2rem(border-bottom-width, 2px)
        border-color: #eaeaea
        li
          width: 20%
          box-sizing: border-box
          color: #7f7f7f
          @include font-dpr(15px)
          display: flex
          justify-content: center
          align-items: center
</style>
