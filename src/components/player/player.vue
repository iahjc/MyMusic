<template>
<section class="player" v-show="playList.length > 0">
  <transition name="normal" @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
    <section class="screen-player" ref="screenPlayer" v-show="fullScreen">
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
      </div>
      <div class="middle" @touchstart.prevent="middleTouchStart"
                          @touchmove.prevent="middleTouchMove"
                          @touchend="middleTouchEnd">
        <div class="middle-l" ref="middleL">
          <div class="cd-wrapper" ref="cdWrapper">
            <div class="ml-bg" :class="cdCls">
              <img class="image" :src="currentSong.image"/>
            </div>
          </div>
          <div class="playing-lyric-wrapper">
            <p class="playing-lyric">{{playingLyric}}</p>
          </div>
        </div>
        <scroll class="middle-r" :data="currentLyric && currentLyric.lines" ref="lyricList">
          <div class="lyric-wrapper">
            <div v-if="currentLyric">
              <p ref="lyricLine" class="text" :class="{'current': currentLineNum === index}" v-for="(line, index) in currentLyric.lines">{{line.txt}}</p>
            </div>
          </div>
        </scroll>
      </div>

      <div class="bottom">
        <div class="dot-wrapper">
          <span class="dot" :class="{'active':currentShow==='ml-bg'}"></span>
          <span class="dot" :class="{'active':currentShow==='lyric'}"></span>
        </div>
        <div class="procress-wrapper">
          <div class="time time-l">
            {{format(currentTime)}}
          </div>
          <div class="progress-bar-wrapper">
             <progress-bar @percentChange="onProgressBarChange" :percent="percent"></progress-bar>
          </div>
          <div class="time time-r">
            {{format(currentSong.duration)}}
          </div>
        </div>
        <div class="sp-control">
          <player-control ref="playerControl" :mode="mode" @setModeStyle="changeMode" @next="next" @prev="prev" @isPlaying="togglePlay" @openPlayList="openPlayList" :playing="playing"></player-control>
        </div>
      </div>
    </section>
  </transition>
  <transition name="mini">
    <section class="mini-player" v-show="!fullScreen" @click="openFullScreen">
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
  </transition>
  <play-list :playList="playList" @closePlayList="closePlayList" ref="pList" @selectItem="selectItem" :currentIndex="currentIndex"></play-list>
  <audio ref="myAudio" :src="currentSong.url" @error="error" @ended="end" @timeupdate="updateTime" @play="ready"></audio>
  <bg ref="bg" @selectBg="closeBg"></bg>
  <layer-control :layerDatas="datas" :bg="rgba" ref="layerControl"></layer-control>
</section>
</template>

<script>
import {
  mapGetters,
  mapMutations
} from 'vuex'
import PlayerControl from 'components/player/player-control'
import PlayerAuxiliary from 'components/player/player-auxiliary'
import PlayList from 'components/player/play-list'
import Bg from 'base/bg/bg'
import {
  playMode
} from 'common/js/playmode'
import animations from 'create-keyframe-animation'
import LayerControl from 'base/layer-control/layer-control'
import Storage from 'db/storage'
import {
  musicControl
} from 'common/js/config/layer-control'
let storage = new Storage()
import {
  prefixStyle
} from 'common/js/utils/dom'
import Lyric from 'lyric-parser'
import Scroll from 'base/scroll/scroll'
import ProgressBar from 'base/progress-bar/progress-bar'
import {shuffle} from 'common/js/utils/util'

const transform = prefixStyle('transform')
const transitionDuration = prefixStyle('transitionDuration')

export default {
  data() {
    return {
      currentTime: 0,
      songReady: false,
      playListFlag: false,
      musicControlFlag: false,
      currentShow: 'ml-bg',
      datas: null,
      rgba: 'rgba(0, 0, 0, .7)',
      playingLyric: '那现在你们是否感觉到了悲伤',
      currentLyric: null,
      currentLineNum: 0,
      touch: {}
    }
  },
  computed: {
    toggleIcon() {
      return this.playing ? 'fa fa-pause' : 'fa fa-play'
    },
    cdCls() {
      return this.playing ? 'play' : 'play pause'
    },
    percent() {
      return this.currentTime / this.currentSong.duration
    },
    ...mapGetters([
      'fullScreen',
      'playList',
      'currentSong',
      'playing',
      'mode',
      'currentIndex',
      'sequenceList'
    ])
  },
  methods: {
    middleTouchStart(e) {
      this.touchinitiated = true
      this.touch.startX = e.touches[0].pageX
      this.touch.startY = e.touches[0].pageY
    },
    middleTouchMove(e) {
      if (!this.touchinitiated) {
        return
      }
      const touch = e.touches[0]
      const deltaX = touch.pageX - this.touch.startX
      const deltaY = touch.pageY - this.touch.startY
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return
      }
      const left = this.currentShow === 'ml-bg' ? 0 : -window.innerWidth
      const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
      this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
      this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
      this.$refs.lyricList.$el.style[transitionDuration] = 0
      this.$refs.middleL.style.opacity = 1 - this.touch.percent
      this.$refs.middleL.style[transitionDuration] = 0
    },
    middleTouchEnd(e) {
      let offsetWidth
      let opacity
      if (this.currentShow === 'ml-bg') {
        if (this.touch.percent > 0.1) {
          offsetWidth = -window.innerWidth
          this.currentShow = 'lyric'
          opacity = 0
        } else {
          offsetWidth = 0
          opacity = 1
        }
      } else {
        if (this.touch.percent < 0.9) {
          offsetWidth = 0
          this.currentShow = 'ml-bg'
          opacity = 1
        } else {
          offsetWidth = -window.innerWidth
          opacity = 0
        }
      }
      const time = 300
      this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
      this.$refs.lyricList.$el.style[transitionDuration] = `${time}ms`
      this.$refs.middleL.style.opacity = opacity
      this.$refs.middleL.style[transitionDuration] = `${time}ms`
    },
    selectItem(item, index) {
      storage.savePlayHistory(item)
      this.setCurrentIndex(index)
    },
    enter(el, done) {
      const {
        x,
        y,
        scale
      } = this._getPosAndScale()

      let animation = {
        0: {
          transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
        },
        60: {
          transform: `translate3d(0,0,0) scale(1.1)`
        },
        100: {
          transform: `translate3d(0,0,0) scale(1)`
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

      animations.runAnimation(this.$refs.cdWrapper, 'move', done)
    },
    afterEnter() {
      animations.unregisterAnimation('move')
      this.$refs.cdWrapper.style.animation = ''
    },
    leave(el, done) {
      this.$refs.cdWrapper.style.transition = 'all 0.4s'
      const {
        x,
        y,
        scale
      } = this._getPosAndScale()
      this.$refs.cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`
      this.$refs.cdWrapper.addEventListener('transitionend', done)
    },
    afterLeave() {
      this.$refs.cdWrapper.style.transition = ''
      this.$refs.cdWrapper.style[transform] = ''
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
      setCurrentIndex: 'SET_CURRENTINDEX',
      setPlayList: 'SET_PLAYLIST'
    }),
    closePlayList() {
      this.$refs.pList.hide()
      this.closeBg()
    },
    // 设置播放模式
    changeMode() {
      const mode = (this.mode + 1) % 3
      this.setMode(mode)
      let list = null
      if (this.mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this._resetCurrentIndex(list)
      this.setPlayList(list)
    },
    _resetCurrentIndex(list) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    prev() {
      if (!this.songReady) {
        return
      }
      if (this.playList.length === 1) {
        this.loop()
        return
      } else {
        let index = this.currentIndex - 1
        if (index === -1) {
          index = this.playList.length - 1
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlay()
        }
      }
      this.songReady = false
    },
    next() {
      if (!this.songReady) {
        return
      }
      if (this.playList.length === 1) {
        this.loop()
        return
      } else {
        let index = this.currentIndex + 1
        if (index === this.playList.length) {
          index = 0
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlay()
        }
      }
      this.songReady = false
    },
    getLyric() {
      this.currentSong.getLyric().then((lyric) => {
        if (this.currentSong.lyric !== lyric) {
          return
        }
        this.currentLyric = new Lyric(lyric, this.handleLyric)
        console.log(this.currentLyric)
      }).catch(() => {
        this.currentLyric = null
        this.playingLyric = ''
        this.currentLineNum = 0
      })
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
    onProgressBarChange(percent) {
      const currentTime = this.currentSong.duration * percent
        this.$refs.myAudio.currentTime = currentTime
        if (!this.playing) {
          this.togglePlaying()
        }
        if (this.currentLyric) {
          this.currentLyric.seek(currentTime * 1000)
        }
    },
    format(interval) {
      // 上下取整
      interval = interval | 0
      const minute = interval / 60 | 0
      const second = this._pad(interval % 60)
      return `${minute}:${second}`
    },
    _pad(num, n = 2) {
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime
    },
    openFullScreen() {
      this.setFullScreen(true)
    },
    // play 当音频/视频已开始或不再暂停时
    ready() {
      this.songReady = true
    },
    loop() {
      this.$refs.myAudio.currentTime = 0
      this.$refs.myAudio.play()

      if (this.currentLyric) {
        this.currentLyric.seek(0)
      }
    },
    handleLyric({lineNum, txt}) {
      this.currentLineNum = lineNum
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5]
        this.$refs.lyricList.scrollToElement(lineEl, 1000)
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000)
      }
      this.playingLyric = txt
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
    ProgressBar,
    PlayerControl,
    PlayerAuxiliary,
    PlayList,
    LayerControl,
    Bg,
    Scroll
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
        this.getLyric()
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
      .middle
        position: fixed
        width: 100%
        top: 120px
        bottom: 170px
        white-space: nowrap
        font-size: 0
        .middle-l
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          height: 0
          padding-top: 80%
          .cd-wrapper
            position: absolute
            left: 10%
            top: 0
            width: 80%
            height: 100%
            .ml-bg
              width: 100%
              height: 100%
              box-sizing: border-box
              border: 10px solid rgba(255, 255, 255, 0.1)
              border-radius: 50%
              &.play
                animation: rotate 20s linear infinite
              &.pause
                animation-play-state: paused
              .image
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                border-radius: 50%

          .playing-lyric-wrapper
            width: 80%
            margin: 30px auto 0 auto
            overflow: hidden
            text-align: center
            .playing-lyric
              line-height: 30px; /*px*/
              font-size: 30px; /*px*/
              color: #fff
        .middle-r
          display: inline-block
          vertical-align: top
          width: 100%
          height: 100%
          overflow: hidden
          .lyric-wrapper
            width: 80%
            margin: 0 auto
            overflow: hidden
            text-align: center
            .text
              line-height: 32px
              color: #fff
              font-size: 30px; /*px*/
              &.current
                color: #64be80
      .bottom
        position: absolute
        bottom: 0
        width: 100%
        .dot-wrapper
          text-align: center
          font-size: 0
          .dot
            display: inline-block
            vertical-align: middle
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: #fff
            &.active
              width: 20px
              border-radius: 5px
              background: #61bf81
        .procress-wrapper
          position: absolute
          bottom: 240px
          width: 100%
          display: flex
          .progress-bar-wrapper
            flex: 1
          .time
            width: 88px
            color: #fff
            display: flex
            justify-content: center
            align-items: center
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
      height: 100px
      display: flex
      align-items: center
      box-sizing: border-box
      padding-left: 2.5%
      padding-right: 2.5%
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
