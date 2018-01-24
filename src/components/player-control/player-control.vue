<template>
  <section class="player-control">
    <div class="pc-cr" @click="playMode" ref="pcCr">
      <i class="fa fa-refresh"></i>
    </div>
    <ul class="pc-main">
      <li @click="prev">
            <i class="fa fa-step-backward"></i>
      </li>
      <li ref="isPlay" @click="isPlaying">
            <i class="fa fa-play"></i>
      </li>
      <li @click="next">
            <i class="fa fa-step-forward"></i>
      </li>
    </ul>
    <div class="pc-r">
      <i class="fa fa-file-text-o"></i>
    </div>
  </section>
</template>

<script>
import {playMode} from 'common/js/playmode'
export default {
  methods: {
    setModeStyle(mode) {
      if (mode === playMode.sequence) {
        this.$refs.pcCr.children[0].className = 'fa fa-refresh'
      } else if (mode === playMode.loop) {
        this.$refs.pcCr.children[0].className = 'fa fa-power-off'
      } else {
        this.$refs.pcCr.children[0].className = 'fa fa-random'
      }
    },
    playMode() {
      this.$emit('setModeStyle')
    },
    play() {
      this.$refs.isPlay.children[0].className = 'fa fa-pause'
    },
    stop() {
      this.$refs.isPlay.children[0].className = 'fa fa-play'
    },
    isPlaying() {
      this.$emit('isPlaying')
    },
    prev() {
      this.$emit('prev')
    },
    next() {
      this.$emit('next')
    }
  }
}
</script>

  <style lang="sass" scoped="" type="text/css">
    @import "../../common/scss/helpers/variables.scss";
    @import "../../common/scss/helpers/mixins.scss";
    @import "../../common/scss/helpers/function.scss";
    @import "../../common/scss/base/base.scss";

    .player-control
      width: 100%
      @include px2rem(height, 120px)
      display: flex
      align-items: center
      justify-content: space-between
      .pc-cr,.pc-r
        @include px2rem(width, 115px)
        display: flex
        justify-content: center
        i
          @include font-dpr(19px)
          color: #d3cfcc
      .pc-main
        display: flex
        color: #5fc289
        align-items: center
        li:last-child
          margin-right: 0
        li
          @include px2rem(height, 76px)
          @include px2rem(width, 76px)
          box-sizing: border-box
          @include px2rem(border-width, 6px)
          border-color: #5fc289
          border-style: solid
          border-radius: 100%
          display: flex
          justify-content: center
          align-items: center
          @include px2rem(margin-right, 72px)
          i
            @include font-dpr(19px)
        li:nth-child(2)
          @include px2rem(width, 118px)
          @include px2rem(height, 118px)
          i
            @include font-dpr(21px)
</style>
