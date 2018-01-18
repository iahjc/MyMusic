<template>
  <section class="player" v-show="playList.length > 0">
    <section class="screen-player" v-show="fullScreen">
      <header class="sl-h">
        <div class="sl-h-nav" @click="showMini">
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
        <img :src="currentSong.image" />
        <div></div>
      </div>

      <div class="sp-t">
        <p v-html="currentSong.name"></p>
        <div class="sp-t-yx">
          <select-ui ref="selectUi"></select-ui>
          <div class="sp-bz">
            音效
          </div>
        </div>
      </div>

      <div class="sp-m">
        <player-mid :song="currentSong"></player-mid>
      </div>
      <div class="sp-process">
        <player-process></player-process>
      </div>
      <div class="sp-control">
        <player-control></player-control>
      </div>
      <div class="sp-auxiliary">
        <player-auxiliary></player-auxiliary>
      </div>
    </section>
    <section class="mini-player" v-show="!fullScreen" @click="showFullScreen">
      <div class="mi-l">
        <div class="mi-l-img">
          <img :src="currentSong.image" />
        </div>
        <div class="mi-l-c">
          <h2>{{currentSong.name}}</h2>
          <p>
            编曲: {{currentSong.singer}}
          </p>
        </div>
      </div>
      <div class="mi-control">
        <div class="mi-c-cont">
          <i class="fa fa-pause"></i>
        </div>
      </div>
      <div class="mi-his">
        <i class="fa fa-music"></i>
      </div>
    </section>
    <audio ref="myAudio" :src="currentSong.url" @canplay="ready"></audio>
  </section>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import SelectUi from 'base/select-ui/select-ui'
import PlayerMid from 'components/player-mid/player-mid'
import PlayerProcess from 'components/player-process/player-process'
import PlayerControl from 'components/player-control/player-control'
import PlayerAuxiliary from 'components/player-auxiliary/player-auxiliary'
export default {
  data() {
    return {
      screenFlag: false,
      miniFlag: false
    }
  },
  computed: {
    ...mapGetters([
      'fullScreen',
      'playList',
      'currentSong'
    ])
  },
  methods: {
    ...mapMutations({
      setFullScreen: 'SET_FULLSCREEN'
    }),
    showMini() {
      this.setFullScreen(false)
    },
    showFullScreen() {
      this.setFullScreen(true)
    },
    ready() {
      this.$refs.myAudio.play()
    }
  },
  components: {
    SelectUi,
    PlayerMid,
    PlayerProcess,
    PlayerControl,
    PlayerAuxiliary
  }
}
</script>

<style lang="sass" scoped="" type="text/css">
  @import "../../common/scss/helpers/variables.scss";
  @import "../../common/scss/helpers/mixins.scss";
  @import "../../common/scss/base/base.scss";

  .player
    .screen-player
      width: 100%
      height: 100%
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 10000
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
        background-color: #ccc
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
        padding-top: 10%
        .sp-t-yx
          display: flex
          justify-content: center
          @include px2rem(margin-top, 30px)
          .sp-bz
            @include px2rem(margin-left, 20px)
            box-sizing: border-box
            @include px2rem(height, 34px)
            width: auto
            border: 2px solid #fffbfc
            display: inline-block
            color: #fffbfc
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
    .mini-player
      position: fixed
      bottom: 0
      left: 0
      width: 100%
      background-color: #f4f4f4
      @include px2rem(height, 100px)
      display: flex
      align-items: center
      box-sizing: border-box
      @include px2rem(padding-left, 25px)
      @include px2rem(padding-right, 25px)
      justify-content: space-between
      .mi-l
        display: flex
        align-items: center
        flex: 1
        .mi-l-c
          @include px2rem(margin-left, 18px)
          h2
            @include font-dpr(10px)
          p
            @include px2rem(margin-top, 10px)
            @include font-dpr(8px)
            color: #6b6b6b
        .mi-l-img
          @include px2rem(width, 82px)
          @include px2rem(height, 82px)
          img
            width: 100%
            overflow: hidden
            border-radius: 100%
      .mi-control
        @include px2rem(height, 56px)
        @include px2rem(width, 56px)
        @include px2rem(margin-right, 36px)
        box-sizing: border-box
        @include px2rem(border-width, 6px)
        border-style: solid
        border-color: #5dbf82
        display: flex
        justify-content: center
        align-items: center
        overflow: hidden
        border-radius: 100%
        i
          color: #5dbf82
          @include font-dpr(12px)
      .mi-his
        i
          @include font-dpr(21px)
          color: #5dbf82
</style>
