<template>
  <section class="play-list">
    <div class="pl-t">
      <div class="pl-t-mode">
        <i class="fa fa-refresh"></i>&nbsp;&nbsp;<span>单曲循环</span>
      </div>
      <ul class="pl-c">
        <li>
          <i class="fa fa-download"></i>
        </li>
        <li>
          <i class="fa fa-plus"></i>
        </li>
        <li>
          <i class="fa fa-trash-o"></i>
        </li>
      </ul>
    </div>
    <div class="pl-cur">
      <div class="pl-li">
        <div class="pl-li-t">
          <span>辈分歌</span> <span>SQ</span> - 郭德纲
        </div>
        <ul>
          <li>

          </li>
          <li>

          </li>
          <li>

          </li>
        </ul>
      </div>
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

    .play-list
      position: absolute
      top: 0
      background: rgba(0, 0, 0, .8)
      width: 100%
      bottom: 0
      z-index: 11111
      color: #fff
      .pl-t
        @include px2rem(height, 100px)
        box-sizing: border-box
        padding-left: 5%
        padding-right: 5%
        display: flex
        align-items: center
        justify-content: space-between
        @include px2rem(border-width, 2px)
        border-color: #4d3932
        border-style: solid
        .pl-t-mode
          @include font-dpr(17px)
          i
            color: #917f7b
        .pl-c
          display: flex
          li
            @include px2rem(width, 60px)
            @include px2rem(height, 60px)
            display: flex
            align-items: center
            justify-content: center
            @include px2rem(margin-right, 20px)
            i
              @include font-dpr(20px)
          li:last-child
            margin-right: 0
</style>
