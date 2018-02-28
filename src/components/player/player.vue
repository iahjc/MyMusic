<template>
  <section class="player" v-show="playList.length > 0">
    <transition name="normal"
                @enter="enter"
                @after-enter="afterEnter"
    >
      <section class="screen-player" v-show="fullScreen">
        <header class="sl-h top">
          <div class="sl-h-nav" @click="back">
            <i class="fa fa-angle-left"></i>
          </div>
          <p>
            {{currentSong.name}}
          </p>
          <div class="sl-h-r" @click="showMusicControl">
             <i class="fa fa-ellipsis-h"></i>
          </div>
        </header>

        <div class="sp-bg">
          <img :src="currentSong.image" />
          <div></div>
        </div>

        <div class="sp-t">
          <p v-html="currentSong.singer"></p>
          <!-- <div class="sp-t-yx">
            <select-ui ref="selectUi"></select-ui>
            <div class="sp-bz">
              音效
            </div>
          </div> -->
        </div>

        <div class="sp-m">
          <player-mid :song="currentSong" :playing="playing" ref="playerMid"></player-mid>
        </div>
        <div class="bottom">
          <div class="sp-process">
            <player-process
                  :song="currentSong"
                  @toMusicTime="toMusicTime"
                  ref="playerProcess"></player-process>
          </div>
          <div class="sp-control">
            <player-control ref="playerControl"
                  :mode="mode"
                  @setModeStyle="setModeStyle"
                  @next="next"
                  @prev="prev"
                  @isPlaying="togglePlay"
                  @openPlayList="openPlayList"
                  :playing="playing"
                  ></player-control>
          </div>
          <div class="sp-auxiliary">
            <player-auxiliary></player-auxiliary>
          </div>
        </div>
      </section>
    </transition>
    <section class="mini-player" v-show="!fullScreen" @click="showFullScreen">
      <div class="mi-l">
        <div class="mi-l-img">
          <img :src="currentSong.image" :class="cdCls" />
        </div>
        <div class="mi-l-c">
          <h2>{{currentSong.name}}</h2>
          <p>
            编曲: {{currentSong.singer}}
          </p>
        </div>
      </div>
      <div class="mi-control">
        <div class="mi-c-cont" @click.stop="togglePlay">
          <i :class="toggleIcon"></i>
        </div>
      </div>
      <div class="mi-his">
        <i class="fa fa-music"></i>
      </div>
    </section>
    <play-list :playList="playList" @closePlayList="closePlayList" ref="pList" @selectItem="selectItem" :currentIndex="currentIndex"></play-list>
    <audio ref="myAudio" :src="currentSong.url"
                         @error="error"
                         @ended="end"
                         @timeupdate="updateTime"
                         @play="ready"></audio>
    <bg ref="bg" @selectBg="closeBg"></bg>
    <layer-control :layerDatas="datas" :bg="rgba" ref="layerControl"></layer-control>
  </section>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import SelectUi from 'base/select-ui/select-ui'
import PlayerMid from 'components/player/player-mid'
import PlayerProcess from 'components/player/player-process'
import PlayerControl from 'components/player/player-control'
import PlayerAuxiliary from 'components/player/player-auxiliary'
import PlayList from 'components/player/play-list'
import Bg from 'base/bg/bg'
import {playMode} from 'common/js/playmode'
import animations from 'create-keyframe-animation'
import LayerControl from 'base/layer-control/layer-control'
import Storage from 'db/storage'
import { musicControl } from 'common/js/config/layer-control'
let storage = new Storage()
// import { prefixStyle } from 'common/js/utils/dom'
//
// const transform = prefixStyle('transform')
// const transitionDuration = prefixStyle('transitionDuration')

export default {
  data() {
    return {
      screenFlag: false,
      miniFlag: false,
      currentTime: 0,
      songReady: false,
      playListFlag: false,
      musicControlFlag: false,
      datas: null,
      rgba: 'rgba(0, 0, 0, .7)'
    }
  },
  computed: {
    toggleIcon() {
      return this.playing ? 'fa fa-pause' : 'fa fa-play'
    },
    cdCls() {
      return this.playing ? 'play' : 'play pause'
    },
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
    selectItem(item, index) {
      storage.savePlayHistory(item)
      this.setCurrentIndex(index)
    },
    enter(el, done) {
      const {x, y, scale} = this._getPosAndScale()

      let animation = {
        0: {
          transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
        },
        60: {
          transform: `translate3d(0, 0, 0) scale(1.1)`
        },
        100: {
          transform: `translate3d(0, 0, 0) scale(1)`
        }
      }

      animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 400,
          easing: 'linear'
        }
      })

      animations.runAnimation(this.$refs.playerMid.getEl(), 'move', done)
    },
    afterEnter() {
      animations.unregisterAnimation('move')
      this.$refs.playerMid.getEl().style.animation = ''
    },
    leave(el, done) {
      // this.$refs.playerMid.getEl().style.transition = 'all 0.4s'
      // const {x, y, scale} = this._getPosAndScale()
      // this.$refs.playerMid.getEl().style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`
      // this.$refs.playerMid.getEl().addEventListener('transitionend', done)
    },
    afterLeave() {
      // this.$refs.playerMid.getEl().style.transition = ''
      // this.$refs.playerMid.getEl().style[transform] = ''
    },
    _getPosAndScale() {
      const targetWidth = 40
      const paddingLeft = 40
      const paddingBottom = 30
      const paddingTop = 80
      const width = window.innerWidth * 0.8
      const scale = targetWidth / width
      const x = -(window.innerWidth / 2 - paddingLeft)
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
      return {
        x,
        y,
        scale
      }
    },
    ...mapMutations({
      setFullScreen: 'SET_FULLSCREEN',
      setPlaying: 'SET_PLAYING',
      setMode: 'SET_MODE',
      setCurrentIndex: 'SET_CURRENTINDEX'
    }),
    closePlayList() {
      this.$refs.pList.hide()
      this.closeBg()
    },
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
    togglePlay() {
      if (this.playing) {
        this.setPlaying(false)
      } else {
        this.setPlaying(true)
      }
    },
    back() {
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
      this.songReady = true
    },
    openPlayList() {
      if (!this.playListFlag) {
        this.$refs.pList.show()
        this.$refs.bg.show()
        this.playListFlag = true
      }
    },
    closeBg() {
      if (this.playListFlag) {
        this.$refs.pList.hide()
        this.$refs.bg.hide()
        this.playListFlag = false
      }
      if (this.musicControlFlag) {
        this.$refs.musicControl.hide()
        this.$refs.bg.hide()
        this.musicControlFlag = false
      }
    },
    showMusicControl() {
      this.datas = musicControl
      let song = this.playList[this.currentIndex]
      this.$refs.layerControl.show({
        name: song.name,
        singer: song.singer,
        pay: {
          pay_down: 0
        }
      })
    }
  },
  components: {
    SelectUi,
    PlayerMid,
    PlayerProcess,
    PlayerControl,
    PlayerAuxiliary,
    PlayList,
    LayerControl,
    Bg
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (!newSong.id) {
        return
      }

      if (newSong.id === oldSong.id) {
        return
      }

      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$refs.myAudio.play()
      }, 1000)
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
  @import "../../common/scss/components/animation.scss";

  .player
    .screen-player
      width: 100%
      height: 100%
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 2
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
            font-size: 64px; /*px*/
            transform: rotate(-90deg)
        p
          font-size: 30px; /*px*/
          color: #fffdfe
        .sl-h-r
          @include px2rem(width, 100px)
          display: flex
          justify-content: center
          i
            font-size: 40px; /*px*/
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
            font-size: 20px; /*px*/
            display: inline-flex
            align-items: center
            @include px2rem(padding-left, 10px)
            @include px2rem(padding-right, 10px)
        p
          width: 100%
          font-size: 30px; /*px*/
          color: #f3ebe9
          text-align: center
      .sp-m
        position: absolute
        top: 50%
        left: 50%
        transform: translate(-50%, -58%)
      .bottom
        position: absolute
        bottom: 0
        width: 100%
        .sp-process
          position: absolute
          bottom: 240px
        .sp-control
          position: absolute
          bottom: 100px
          width: 100%
        .sp-auxiliary
          position: absolute
          bottom: 15px
          width: 100%
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
            font-size: 20px; /*px*/
          p
            @include px2rem(margin-top, 10px)
            font-size: 16px; /*px*/
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
          font-size: 24px; /*px*/
      .mi-his
        i
          font-size: 42px; /*px*/
          color: #5dbf82
</style>
