<template lang="html">
  <section :class="$style.player" v-show="playList.length>0">
    <transition name="normal"
                @enter="enter"
                @after-enter="afterEnter"
                @leave="leave"
                @after-leave="afterLeave"
    >
      <div :class="$style.screenPlayer" v-show="fullScreen">
          <div :class="$style.background" :style="bgStyle"></div>
          <t-header :title="currentSong.name" @back="back" @selectRightMenu="selectRightMenu"></t-header>
        <div :class="$style.middle"
             @touchstart.prevent="middleTouchStart"
             @touchmove.prevent="middleTouchMove"
             @touchend="middleTouchEnd"
        >
          <div :class="$style.middleL" ref="middleL">
            <div :class="$style.cdWrapper" ref="cdWrapper">
              <div class="cd" :class="cdCls">
                <img class="image" :src="currentSong.image" />
              </div>
            </div>
            <div :class="$style.playingLyricWrapper">
              <div :class="$style.playingLyric">{{playingLyric}}</div>
            </div>
          </div>
          <scroll :class="$style.middleR" ref="lyricList" :data="currentLyric && currentLyric.lines">
            <div :class="$style.lyricWrapper">
              <div v-if="currentLyric">
                <p ref="lyricLine"
                   class="text"
                   :class="{'current': currentLineNum ===index}"
                   v-for="(line,index) in currentLyric.lines">{{line.txt}}</p>
              </div>
            </div>
          </scroll>
        </div>
        <div :class="$style.bottom">
          <div :class="$style.dotWrapper">
            <span class="dot" :class="{'active':currentShow==='cd'}"></span>
            <span class="dot" :class="{'active':currentShow==='lyric'}"></span>
          </div>
          <div :class="$style.procressWrapper">
            <div :class="[$style.time, $style.timeL]">
              {{format(currentTime)}}
            </div>
            <div :class="$style.progressBarWrapper">
               <progress-bar @percentChange="onProgressBarChange" :percent="percent" @percentChanging="onProgressBarChanging"></progress-bar>
            </div>
            <div :class="[$style.time, $style.timeR]">
              {{format(currentSong.duration)}}
            </div>
          </div>
          <div :class="$style.operators">
            <div :class="$style.playMode" @click="changeMode">
              <i :class="iconMode"></i>
            </div>
            <ul>
              <li @click="prev">
                <i class="fa fa-step-backward"></i>
              </li>
              <li>
                <i @click="togglePlay" :class="toggleCls"></i>
              </li>
              <li @click="next">
                <i class="fa fa-step-forward"></i>
              </li>
            </ul>
            <div :class="$style.playList" @click="openPlayList">
              <i class="fa fa-music"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div :class="$style.miniPlayer" v-show="!fullScreen" @click="open">
        <div :class="$style.mini">
          <div :class="[$style.miniImg, cdCls]" :style="bgStyle">
            <!-- <img :src="currentSong.image" :class="cdCls" /> -->
          </div>
          <div :class="$style.miniMiddle">
            <h2>{{currentSong.name}}</h2>
            <p>
              编曲: {{currentSong.singer}}
            </p>
          </div>
        </div>
        <div :class="$style.miniR" @click.stop="togglePlay">
            <i :class="miniIcon"></i>
        </div>
        <div :class="$style.playList" @click.stop="openPlayList">
          <i class="fa fa-music"></i>
        </div>
      </div>
    </transition>
    <msg ref="msg"></msg>
    <layer-control ref="LayerControl" :cname="$style.black" :showVoice="false" :layerDatas="datas"></layer-control>
    <play-list ref="playlist" @changeMode="changeMode" @closePlayList="closePlayList"></play-list>
    <audio ref="myAudio" @pause="paused" @error="error" @ended="end" @timeupdate="updateTime" @play="ready"></audio>
  </section>
</template>

<script>
import {
  mapGetters,
  mapMutations
} from 'vuex'
import animations from 'create-keyframe-animation'
import {
  prefixStyle
} from 'common/js/utils/dom'
import {
  shuffle
} from 'common/js/utils/util'
import {
  playMode
} from 'common/js/playmode'
import Lyric from 'lyric-parser'
import THeader from 'base/t-header/t-header'
import ProgressBar from 'base/progress-bar/progress-bar'
import Scroll from 'base/scroll/scroll'
import PlayList from 'components/player/play-list'
import LayerControl from 'base/layer-control/layer-control'
import {musicControl} from 'common/js/config/layer-control'
import Msg from 'base/msg/msg'

const transform = prefixStyle('transform')
const transitionDuration = prefixStyle('transitionDuration')

const timeExp = /\[(\d{2}):(\d{2}):(\d{2})]/g
export default {
  data() {
    return {
      title: '歌曲',
      playingLyric: '',
      currentTime: 0,
      currentLyric: null,
      songReady: false,
      currentLineNum: 0,
      currentShow: 'cd',
      touch: {},
      datas: null
    }
  },
  components: {
    THeader,
    ProgressBar,
    Scroll,
    PlayList,
    LayerControl,
    Msg
  },
  computed: {
    toggleCls() {
      return this.playing ? 'fa fa-pause' : 'fa fa-play'
    },
    miniIcon() {
      return this.playing ? 'fa fa-pause' : 'fa fa-play'
    },
    iconMode() {
      return this.mode === playMode.sequence ? 'fa fa-exchange' : this.mode === playMode.loop ? 'fa fa-circle-o-notch' : 'fa fa-random'
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
    ]),
    bgStyle() {
      return `background-image: url(${this.currentSong.image})`
    }
  },
  methods: {
    openMsg() {
      this.$refs.msg.show({
        msg: '该功能未实现，敬请期待!',
        msgType: 'error',
        delay: 900
      })
    },
    selectRightMenu() {
      this.datas = [
        {
          title: '下一首',
          icon: 'caret-square-o-right',
          action: this.next,
          showFlag: true
        },
        {
          title: '加到歌单',
          icon: 'music',
          action: this.openMsg,
          showFlag: true
        },
        {
          title: '下载',
          icon: 'download',
          action: this.openMsg,
          showFlag: true
        },
        {
          title: '单曲购买',
          icon: 'credit-card',
          action: this.openMsg,
          showFlag: false
        },
        {
          title: '分享',
          icon: 'share-alt',
          action: this.openMsg,
          showFlag: true
        },
        {
          title: '评论',
          icon: 'commenting',
          action: this.openMsg,
          showFlag: true
        },
        {
          title: '不感兴趣',
          icon: 'trash-o',
          action: this.openMsg,
          showFlag: true
        },
        {
          title: '相似歌曲',
          icon: 'clone',
          action: this.openMsg,
          showFlag: true
        },
        {
          title: '唱这首歌',
          icon: 'angellist',
          action: this.openMsg,
          showFlag: true
        },
        {
          title: '查看歌手',
          icon: 'user-o',
          action: this.openMsg,
          showFlag: true
        },
        {
          title: '查看专辑',
          icon: 'gratipay',
          action: this.openMsg,
          showFlag: true
        },
        {
          title: '歌词海报',
          icon: 'opencart',
          action: this.openMsg,
          showFlag: true
        }
      ]
      let song = this.playList[this.currentIndex]
      this.$refs.LayerControl.show({
        name: song.name,
        singer: song.singer,
        pay: {
          pay_down: 0
        }
      })
    },
    closePlayList() {
      this.$refs.playlist.hide()
    },
    middleTouchStart(e) {
      this.touch.initiated = true
      // 用来判断是否是一次移动
      this.touch.moved = false
      const touch = e.touches[0]
      this.touch.startX = touch.pageX
      this.touch.startY = touch.pageY
    },
    middleTouchMove(e) {
      if (!this.touch.initiated) {
        return
      }
      const touch = e.touches[0]
      const deltaX = touch.pageX - this.touch.startX
      const deltaY = touch.pageY - this.touch.startY
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return
      }
      if (!this.touch.moved) {
        this.touch.moved = true
      }
      const left = this.currentShow === 'cd' ? 0 : -window.innerWidth
      const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
      this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
      this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
      this.$refs.lyricList.$el.style[transitionDuration] = 0
      this.$refs.middleL.style.opacity = 1 - this.touch.percent
      this.$refs.middleL.style[transitionDuration] = 0
    },
    middleTouchEnd() {
      if (!this.touch.moved) {
        return
      }
      let offsetWidth
      let opacity
      if (this.currentShow === 'cd') {
        if (this.touch.percent > 0.1) {
          offsetWidth = -window.innerWidth
          opacity = 0
          this.currentShow = 'lyric'
        } else {
          offsetWidth = 0
          opacity = 1
        }
      } else {
        if (this.touch.percent < 0.9) {
          offsetWidth = 0
          this.currentShow = 'cd'
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
      this.touch.initiated = false
    },
    openPlayList() {
      this.$refs.playlist.show()
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
    onProgressBarChanging(percent) {
      this.currentTime = this.currentSong.duration * percent
      if (this.currentLyric) {
        this.currentLyric.seek(this.currentTime * 1000)
      }
    },
    onProgressBarChange(percent) {
      const currentTime = this.currentSong.duration * percent
      this.currentTime = this.$refs.myAudio.currentTime = currentTime
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000)
      }
      if (!this.playing) {
        this.togglePlay()
      }
    },
    getLyric() {
      this.currentSong.getLyric().then((lyric) => {
        if (this.currentSong.lyric !== lyric) {
          return
        }
        this.currentLyric = new Lyric(lyric, this.handleLyric)
        this.isPureMusic = !this.currentLyric.lines.length
        if (this.isPureMusic) {
          this.pureMusicLyric = this.currentLyric.lrc.replace(timeExp, '').trim()
          this.playingLyric = this.pureMusicLyric
        } else {
          if (this.playing && this.canLyricPlay) {
            // 这个时候有可能用户已经播放了歌曲，要切到对应位置
            this.currentLyric.seek(this.currentTime * 1000)
          }
        }
      }).catch(() => {
        this.currentLyric = null
        this.playingLyric = ''
        this.currentLineNum = 0
      })
    },
    handleLyric({
      lineNum,
      txt
    }) {
      if (!this.$refs.lyricLine) {
        return
      }
      this.currentLineNum = lineNum
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5]
        this.$refs.lyricList.scrollToElement(lineEl, 1000)
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000)
      }
      this.playingLyric = txt
    },
    changeMode() {
      const mode = (this.mode + 1) % 3
      this.setMode(mode)
      let list = null
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setPlayList(list)
    },
    resetCurrentIndex(list) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    togglePlay() {
      if (!this.songReady) {
        return
      }
      this.setPlaying(!this.playing)
      if (this.currentLyric) {
        this.currentLyric.togglePlay()
      }
    },
    loop() {
      this.$refs.myAudio.currentTime = 0
      this.$refs.myAudio.play()
      this.setPlaying(true)
      if (this.currentLyric) {
        this.currentLyric.seek(0)
      }
    },
    prev() {
      if (!this.songReady) {
        return false
      }
      if (this.playList.length === 1) {
        this.loop()
        return false
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
    },
    next() {
      if (!this.songReady) {
        return false
      }
      if (this.playList.length === 1) {
        this.loop()
        return false
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
    },
    back() {
      this.setFullScreen(false)
    },
    open() {
      this.setFullScreen(true)
    },
    ready() {
      clearTimeout(this.timer)
      // 监听 playing 这个事件可以确保慢网速或者快速切换歌曲导致的 DOM Exception
      this.songReady = true
      this.canLyricPlay = true
      // this.savePlayHistory(this.currentSong)
      // 如果歌曲的播放晚于歌词的出现，播放的时候需要同步歌词
      if (this.currentLyric && !this.isPureMusic) {
        this.currentLyric.seek(this.currentTime * 1000)
      }
    },
    error() {
      clearTimeout(this.timer)
      this.songReady = true
    },
    paused() {
      this.setPlaying(false)
      if (this.currentLyric) {
        this.currentLyric.stop()
      }
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime
    },
    end() {
      if (this.mode === playMode.loop) {
        this.loop()
      } else {
        this.next()
      }
    },
    format(interval) {
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
    }
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (!newSong.id || !newSong.url || newSong.id === oldSong.id) {
        return
      }
      this.songReady = false
      this.canLyricPlay = false
      if (this.currentLyric) {
        this.currentLyric.stop()
        // 重置为null
        this.currentLyric = null
        this.currentTime = 0
        this.playingLyric = ''
        this.currentLineNum = 0
      }
      this.$refs.myAudio.src = newSong.url
      this.$refs.myAudio.play()
      // 若歌曲 5s 未播放，则认为超时，修改状态确保可以切换歌曲。
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.songReady = true
      }, 5000)
      this.getLyric()
    },
    playing(newPlaying) {
      if (!this.songReady) {
        return
      }
      const audio = this.$refs.myAudio
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause()
      })
      if (!newPlaying) {
        // if (this.fullScreen) {
        //   this.syncWrapperTransform('imageWrapper', 'image')
        // } else {
        //   this.syncWrapperTransform('miniWrapper', 'miniImage')
        // }
      }
    }
  }
}
</script>
<style lang="sass" scoped="" type="text/css" >
  @import "../../common/scss/components/animation.scss";
  .text
    line-height: 87px
    color: #fdf9f6
    font-size: 30px; /*px*/
    &.current
      color: #5fbf80
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
      background: #64be80
  .cd
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

</style>

<style lang="sass" scoped="" type="text/css" module>
  .player
    .screenPlayer
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 100
      background: #222
      .background
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
        background-repeat: no-repeat
        background-size: 100% 100%
      .middle
        position: fixed
        width: 100%
        top: 120px
        bottom: 300px
        white-space: nowrap
        font-size: 0
        z-index: 2
        .middleL
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          height: 0
          padding-top: 80%
          .cdWrapper
            position: absolute
            left: 10%
            top: 0
            width: 80%
            height: 100%
          .playingLyricWrapper
            width: 80%
            margin: 30px auto 0 auto
            overflow: hidden
            text-align: center
            .playingLyric
              height: 20px
              line-height: 20px
              font-size: 24px; /*px*/
              color: #fff
        .middleR
          display: inline-block
          vertical-align: top
          width: 100%
          height: 100%
          overflow: hidden
          .lyricWrapper
            width: 80%
            margin: 0 auto
            overflow: hidden
            text-align: center
            .text
              line-height: 32px
              color: #fff
              font-size: 24px; /*px*/
              &.current
                color: red
      .bottom
        position: absolute
        bottom: 50px
        width: 100%
        z-index: 10
        .dotWrapper
          text-align: center
          font-size: 0
        .procressWrapper
          display: flex
          align-items: center
          width: 100%
          margin: 0px auto
          padding: 10px 0
          .time
            color: #fff
            font-size: 24px; /*px*/
            line-height: 30px
            width: 90px
            display: flex
            justify-content: center
            &.timeL
              text-align: left
            &.timeR
              text-align: right
          .progressBarWrapper
             flex: 1
        .operators
          display: flex
          color: #fff
          justify-content: space-between
          .playMode,.playList
            width: 115px
            display: flex
            justify-content: center
            align-items: center
            i
              font-size: 38px; /*px*/
          ul
            display: flex
            align-items: center
            color: #5fc289
            flex: 1
            justify-content: center
            li:nth-child(2)
              width: 118px
              height: 118px
              i
                font-size: 42px; /*px*/
            li:last-child
              margin-right: 0
            li
              width: 76px
              height: 76px
              box-sizing: border-box
              border: 6px solid #5fc289; /*px*/
              border-radius: 100%
              display: flex
              justify-content: center
              align-items: center
              margin-right: 72px
              i
                font-size: 38px; /*px*/
    .miniPlayer
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0
      z-index: 110
      width: 100%
      background-color: #f4f4f4
      height: 100px
      .mini
        display: flex
        align-items: center
        flex: 1
        margin-left: 2.5%
        .miniMiddle
          margin-left: 18px
          h2
            font-size: 20px; /*px*/
          p
            margin-top: 10px
            font-size: 16px; /*px*/
            color: #6b6b6b
        .miniImg
          width: 82px
          height: 82px
          overflow: hidden
          border-radius: 100%
      .miniR
        height: 56px
        width: 56px
        margin-right: 36px
        box-sizing: border-box
        border: 6px solid #5dbf82
        display: flex
        justify-content: center
        align-items: center
        overflow: hidden
        border-radius: 100%
        i
          color: #5dbf82
          font-size: 24px; /*px*/
      .playList
        margin-right: 2.5%
        i
          font-size: 42px; /*px*/
          color: #5dbf82
</style>
