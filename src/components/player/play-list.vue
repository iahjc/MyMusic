<template>
  <transition name="playlist-fadeIn">
    <section :class="$style.playList" v-show="showFlag">
      <div :class="$style.content" class="playlist-content">
        <div :class="$style.header">
          <div :class="$style.playMode" @click="changeMode">
            <i :class="iconMode"></i>&nbsp;&nbsp;<span>{{modeStr}}</span>
          </div>
          <ul :class="$style.headerR">
            <li @click="openMsg">
              <i class="fa fa-download"></i>
            </li>
            <li @click="openMsg">
              <i class="fa fa-plus"></i>
            </li>
            <li @click="clearAll">
              <i class="fa fa-trash-o"></i>
            </li>
          </ul>
        </div>
        <scroll ref="scroll" :class="$style.playListWrapper" :data="playList">
          <div class="songsList">
            <div v-for="(item, index) in playList" :key="index" :class="[$style.item, {active: currentIndex === index}]">
              <div :class="$style.title" @click="selectItem(item, index)">
                <p :class="$style.songTitle">{{item.name}}</p>&nbsp;&nbsp;-&nbsp;&nbsp;<span>{{item.singer}}</span>&nbsp;&nbsp;<img v-show="currentIndex === index" src="./wave.gif"/>
              </div>
              <ul :class="$style.itemR">
                <li>
                  <i class="fa fa-heart-o"></i>
                </li>
                <li @click="removeSong(item, index)">
                  <i class="fa fa-times"></i>
                </li>
              </ul>
            </div>
          </div>
        </scroll>
        <div :class="$style.closePlayList" @click="closePlayList">
          关闭
        </div>
      </div>
      <msg ref="msg"></msg>
      <confirm ref="confirm"></confirm>
    </section>
  </transition>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import {mapMutations, mapGetters, mapActions} from 'vuex'
import { playMode } from 'common/js/playmode'
import Msg from 'base/msg/msg'
import Confirm from 'base/confirm/confirm'
export default {
  computed: {
    iconMode() {
      return this.mode === playMode.sequence ? 'fa fa-exchange' : this.mode === playMode.loop ? 'fa fa-circle-o-notch' : 'fa fa-random'
    },
    ...mapGetters([
      'mode',
      'playList',
      'sequenceList',
      'currentSong',
      'currentIndex'
    ])
  },
  components: {
    Scroll,
    Msg,
    Confirm
  },
  data() {
    return {
      showFlag: false,
      modeStr: '单曲循环'
    }
  },
  methods: {
    ...mapActions([
      'deleteSong',
      'deleteSongList'
    ]),
    ...mapMutations({
      setCurrentIndex: 'SET_CURRENTINDEX',
      setPlaying: 'SET_PLAYING'
    }),
    clearAll() {
      let _this = this
      this.$refs.confirm.show({
        title: '清空当前播放队列?',
        msg: ` `,
        btns: [
          {
            title: '取消',
            click: function(confirmThis) {
              confirmThis.hide()
            }
          },
          {
            title: '清空',
            color: '#719e8a',
            click: clear
          }
        ]
      })

      function clear() {
        _this.deleteSongList()
        _this.$refs.confirm.hide()
        _this.hide()
      }
    },
    openMsg() {
      this.$refs.msg.show({
        msg: '功能未实现，敬请期待!',
        msgType: 'error',
        delay: 900
      })
    },
    removeSong(item, index) {
      if (item.deleting) {
        return false
      }
      item.deleting = true
      this.deleteSong(item)
      if (!this.playList.length) {
        this.hide()
      }
      setTimeout(() => {
        item.deleting = false
      }, 300)
    },
    scrollToCurrentSong(current) {
      const index = this.sequenceList.findIndex((song) => {
        return current.id === song.id
      })
      // console.log(this.$refs.scroll.$el)
      let lis = document.querySelector('.songsList')
      this.$refs.scroll.scrollToElement(lis.children[index], 300)
    },
    changeMode() {
      this.$emit('changeMode')
    },
    show() {
      this.showFlag = true
      setTimeout(() => {
        this.$refs.scroll.refresh()
        this.scrollToCurrentSong(this.currentSong)
      }, 20)
    },
    hide() {
      this.showFlag = false
    },
    closePlayList() {
      this.$emit('closePlayList')
    },
    selectItem(item, index) {
      if (this.mode === playMode.random) {
        index = this.playList.findIndex((song) => {
          return song.id === item.id
        })
      }
      this.setCurrentIndex(index)
      this.setPlaying(true)
    }
  },
  created() {
  },
  watch: {
    mode(newMode) {
      if (newMode === playMode.sequence) {
        this.modeStr = '顺序播放'
      } else if (newMode === playMode.loop) {
        this.modeStr = '循环播放'
      } else {
        this.modeStr = '随机播放'
      }
    }
  }
}
</script>

  <style lang="sass" scoped="" type="text/css" module>
    .playList
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 200
      background: rgba(0, 0, 0, .3)
      .content
        position: absolute
        left: 0
        bottom: 0
        width: 100%
        height: 900px
        background: rgba(0, 0, 0, .8)
        .header
          height: 100px
          box-sizing: border-box
          padding-left: 2.5%
          padding-right: 2.5%
          display: flex
          align-items: center
          justify-content: space-between
          border-bottom: 1px solid #4d3932; /*no*/
          color: #b59e98
          .playMode
            font-size: 34px; /*px*/
            span
              font-size: 28px; /*px*/
            i
              color: #917f7b
          .headerR
            display: flex
            li
              width: 60px
              height: 60px
              display: flex
              align-items: center
              justify-content: center
              margin-right: 20px
              i
                font-size: 40px; /*px*/
            li:last-child
              margin-right: 0
        .playListWrapper
          width: 95%
          height: 700px
          position: absolute
          top: 100px
          overflow: hidden
          left: 2.5%
          div.active
            div.pl-li-t
              span
                color: #69b586
              span:first-child
                color: #69b586
          .item
            height: 75px
            align-items: center
            justify-content: space-between
            display: flex
            border-bottom: 1px solid #4d3932; /*no*/
            .title
              display: flex
              height: 75px
              align-items: center
              font-size: 22px; /*px*/
              color: #80756d
              flex: 1
              span
                display: inline-block
                height: 75px
                line-height: 75px
                overflow: hidden
                max-width: 240px
                text-overflow: ellipsis
                white-space: nowrap
              img
                width: 20px
              p.songTitle
                font-size: 26px; /*px*/
                height: 75px
                text-overflow: ellipsis
                overflow: hidden
                line-height: 75px
                white-space: nowrap
                max-width: 240px
                color: #fff
            .itemR
              display: flex
              li
                width: 60px
                height: 60px
                display: flex
                justify-content: center
                align-items: center
                i
                  font-size: 34px; /*px*/
                  color: #978d8c
        .closePlayList
          width: 100%
          position: absolute
          bottom: 0
          height: 100px
          color: #fff
          display: flex
          justify-content: center
          align-items: center
          font-size: 36px; /*px*/
  </style>

  <style lang="sass" scoped="" type="text/css">
    @import "../../common/scss/components/animation.scss";
    div.active
      color: #69b586!important
      p
        color: #69b586!important
      span
        color: #69b586!important
</style>
