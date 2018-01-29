<template>
  <section class="c-list">
    <div class="c-l-t">
      <div class="cl-m">
        <span class="cur">自建歌单</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span>收藏歌单</span>
      </div>
      <ul class="cl-r">
        <li>
          <i class="fa fa-plus"></i>
        </li>
        <li>
          <i class="fa fa-th-list"></i>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
}
</script>

  <style lang="sass" scoped="" type="text/css">
    @import "../../common/scss/helpers/variables.scss";
    @import "../../common/scss/helpers/mixins.scss";
    @import "../../common/scss/base/base.scss";
    .c-list
      width: 100%
      background: #fff
      @include px2rem(margin-top, 10px)
      position: relative
      .c-l-t
        @include px2rem(height, 100px)
        .cl-m
          height: 100%
          display: flex
          align-items: center
          justify-content: center
          color: #6b6b6b
          span
            @include font-dpr(15px)
          span.cur
            color: #000
        .cl-r
          display: flex
          position: absolute
          right: 0
          top: 0
          height: 100%
          align-items: center
          @include px2rem(right, 20px)
          li
            @include px2rem(width, 60px)
            @include px2rem(height, 60px)
            display: flex
            justify-content: center
            align-items: center
            i
              @include font-dpr(16px)
</style>
