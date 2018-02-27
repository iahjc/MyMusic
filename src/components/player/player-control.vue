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
            <i class="fa fa-pause"></i>
      </li>
      <li @click="next">
            <i class="fa fa-step-forward"></i>
      </li>
    </ul>
    <div class="pc-r" @click="openPlayList">
      <i class="fa fa-music"></i>
    </div>
  </section>
</template>

<script>
import {playMode} from 'common/js/playmode'
export default {
  props: {
    playing: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
  },
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
    },
    openPlayList() {
      this.$emit('openPlayList')
    }
  },
  watch: {
    playing(bool) {
      if (bool) {
        this.play()
      } else {
        this.stop()
      }
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
          font-size: 38px; /*px*/
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
            font-size: 38px; /*px*/
        li:nth-child(2)
          @include px2rem(width, 118px)
          @include px2rem(height, 118px)
          i
            font-size: 42px; /*px*/
</style>
