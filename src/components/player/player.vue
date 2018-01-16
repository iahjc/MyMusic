<template>
  <section class="player">
    <section class="screen-player">
      <header class="sl-h">
        <div class="sl-h-nav">
          <i class="fa fa-angle-left"></i>
        </div>
        <p>
          歌单
        </p>
        <div class="sl-h-r">
           <i class="fa fa-ellipsis-h"></i>
        </div>
      </header>

      <div class="sp-bg">
        <img src="http://p.qpic.cn/music_cover/V34Wl85ZuJRskg3Ds3R8y5u3SVib7ibpLN46hjAmDCykVdpmbicejo6vQ/600?n=1" />
        <div></div>
      </div>

      <div class="sp-t">
        <p>- 呼可儿 (呼明莉) /天佑 -</p>
        <div class="sp-t-yx">
          <select-ui ref="selectUi"></select-ui>
          <div class="sp-bz">
            音效
          </div>
        </div>
      </div>

      <div class="sp-m">
        <player-mid></player-mid>
      </div>
      <div class="sp-process">
        <player-process></player-process>
      </div>
    </section>
    <section class="mini-player" v-show="false">

    </section>
  </section>
</template>

<script>
import SelectUi from 'base/select-ui/select-ui'
import PlayerMid from 'components/player-mid/player-mid'
import PlayerProcess from 'components/player-process/player-process'
export default {
  components: {
    SelectUi,
    PlayerMid,
    PlayerProcess
  }
}
</script>

<style lang="sass" scoped="" type="text/css">
  @import "../../common/scss/helpers/variables.scss";
  @import "../../common/scss/helpers/mixins.scss";
  @import "../../common/scss/base/base.scss";

  .player
    width: 100%
    height: 100%
    position: absolute
    left: 0
    top: 0
    background-color: rgba(0, 0, 0, .5)
    z-index: 10000
    .screen-player
      width: 100%
      height: 100%
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
      .sp-bg
        width: 100%
        height: 100%
        position: absolute
        z-index: -1
        div
          width: 100%
          height: 100%
          background-color: rgba(0, 0, 0, .5)
        img
          position: absolute
          left: 0
          top: 0
          z-index: -1
          width: 100%
          height: 100%
          filter: blur(80px)
      .sp-t
        width: 100%
        padding-top: 130px
        .sp-t-yx
          display: flex
          justify-content: center
          @include px2rem(margin-top, 30px)
          .sp-bz
            @include px2rem(margin-left, 20px)
            box-sizing: border-box
            @include px2rem(height, 34px)
            width: auto
            border: 2px solid #786e6c
            display: inline-block
            color: #6e6361
            border-radius: 10px
            @include font-dpr(10px)
            display: inline-flex
            align-items: center
            @include px2rem(padding-left, 10px)
            @include px2rem(padding-right, 10px)
        p
          width: 100%
          @include font-dpr(15px)
          color: #f3ebe9
          text-align: center
      .sp-m
        width: 100%
        @include px2rem(margin-top, 32px)
      .sp-process
        @include px2rem(margin-top, 30px)
</style>
