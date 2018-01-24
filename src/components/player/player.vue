<template>
  <section class="player" v-show="playList.length > 0">
    <section class="screen-player" v-show="fullScreen">
      <header class="sl-h">
        <div class="sl-h-nav" @click="showMini">
          <i class="fa fa-angle-left"></i>
        </div>
        <p>
          {{currentSong.name}}
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
        <p v-html="currentSong.singer"></p>
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
        <player-process :song="currentSong" @toMusicTime="toMusicTime" ref="playerProcess"></player-process>
      </div>
      <div class="sp-control">
        <player-control ref="playerControl" @setModeStyle="setModeStyle" @next="next" @prev="prev" @isPlaying="isPlaying"></player-control>
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
    <audio ref="myAudio" :src="currentSong.url" @error="error" @ended="end" @timeupdate="updateTime" @play="ready"></audio>
  </section>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import SelectUi from 'base/select-ui/select-ui'
import PlayerMid from 'components/player-mid/player-mid'
import PlayerProcess from 'components/player-process/player-process'
import PlayerControl from 'components/player-control/player-control'
import PlayerAuxiliary from 'components/player-auxiliary/player-auxiliary'
import {playMode} from 'common/js/playmode'
export default {
  data() {
    return {
      screenFlag: false,
      miniFlag: false,
      currentTime: 0,
      songReady: false
    }
  },
  computed: {
    ...mapGetters([
      'fullScreen',
      'playList',
      'currentSong',
      'playing',
      'mode',
      'currentIndex'
    ])
  },
  methods: {
    ...mapMutations({
      setFullScreen: 'SET_FULLSCREEN',
      setPlaying: 'SET_PLAYING',
      setMode: 'SET_MODE',
      setCurrentIndex: 'SET_CURRENTINDEX'
    }),
    // 设置播放模式
    setModeStyle() {
      if (this.mode === playMode.sequence) {
        this.$refs.playerControl.setModeStyle(playMode.loop)
        this.setMode(playMode.loop)
      } else if (this.mode === playMode.loop) {
        this.$refs.playerControl.setModeStyle(playMode.random)
        this.setMode(playMode.random)
      } else {
        this.$refs.playerControl.setModeStyle(playMode.sequence)
        this.setMode(playMode.sequence)
      }
    },
    prev() {
      if (this.currentIndex <= -1) {
        this.setCurrentIndex(0)
        console.log(this.currentIndex)
      } else {
        let index = this.currentIndex - 1
        this.setCurrentIndex(index)
      }
    },
    next() {
      if ((this.currentIndex - 1) >= this.playList.length) {
        this.setCurrentIndex(0)
      } else {
        let index = this.currentIndex + 1
        this.setCurrentIndex(index)
      }
    },
    toMusicTime(percent) {
      this.$refs.playerProcess.setProcess(percent)
      let duration = percent * this.currentSong.duration / 100
      this.$refs.playerProcess.setPlayTime(duration)
      this.$refs.myAudio.currentTime = duration
      this.$refs.playerControl.play()
      this.$refs.myAudio.play()
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime
      this.$refs.playerProcess.setTime(this.currentTime)
    },
    isPlaying() {
      if (this.playing) {
        this.setPlaying(false)
        this.$refs.myAudio.pause()
        this.$refs.playerControl.stop()
      } else {
        this.setPlaying(true)
        this.$refs.myAudio.play()
        this.$refs.playerControl.play()
      }
    },
    showMini() {
      this.setFullScreen(false)
    },
    showFullScreen() {
      this.setFullScreen(true)
    },
    // play 当音频/视频已开始或不再暂停时
    ready() {
      this.songReady = true
    },
    loop() {
      this.toMusicTime(0)
    },
    end() {
      // 歌曲播放结束
      if (this.mode === playMode.loop) {
        this.loop()
      } else {
        this.next()
      }
    },
    error() {
    }
  },
  components: {
    SelectUi,
    PlayerMid,
    PlayerProcess,
    PlayerControl,
    PlayerAuxiliary
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (!newSong.id) {
        return
      }

      if (newSong.id === oldSong.id) {
        return
      }
      this.$refs.myAudio.addEventListener('canplay', function() {
        this.play()
      })
    },
    playing(newPlaying) {
      const audio = this.$refs.myAudio
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause()
      })
    }
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
            transform: rotate(-90deg)
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
