<template>
  <section class="player-mid">
    <ul class="pm-u">
      <li class="pmu-m">
        <div class="spm-img">
          <div>
            <img :src="song.image" />
          </div>
        </div>
        <p class="sp-gc">
          那现在的你们是否感觉到了悲伤
        </p>
      </li>
    </ul>
    <ul class="pm-lis">
      <li class="cur"></li>
      <li></li>
      <li></li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    song: {
      type: Object,
      default: {}
    }
  }
}
</script>

  <style lang="sass" scoped="" type="text/css">
    @import "../../common/scss/helpers/variables.scss";
    @import "../../common/scss/helpers/mixins.scss";
    @import "../../common/scss/base/base.scss";
    .player-mid
      width: 100%
      .pm-u
        width: 100%
        li.pmu-m
          display: flex
          align-items: center
          flex-direction: column
          p.sp-gc
            width: 100%
            @include font-dpr(14px)
            color: #b0a69d
            @include px2rem(line-height, 42px)
            @include px2rem(margin-top, 40px)
            text-align: center
          .spm-img
            @include px2rem(width, 676px)
            @include px2rem(height, 676px)
            border-radius: 100%
            overflow: hidden
            box-sizing: border-box
            background-color: rgba(0, 0, 0, .2)
            display: flex
            justify-content: center
            align-items: center
            div
              width: 96%
              height: 96%
              box-sizing: border-box
              overflow: hidden
              border-radius: 100%
              img
                width: 100%
      .pm-lis
        width: 100%
        display: flex
        justify-content: center
        @include px2rem(margin-top, 32px)
        li:last-child
          margin-right: 0
        li.cur
          background-color: #fff
        li
          @include px2rem(width, 12px)
          @include px2rem(height, 12px)
          @include px2rem(margin-right, 16px)
          border-radius: 100%
          box-sizing: border-box
          background-color: rgba(255, 255, 255, .5)

</style>
