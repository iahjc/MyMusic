<template lang="html">
  <transition name="l">
  <section :class="$style.addSongs" v-show="showFlag">
    <text-header :navs="navs"></text-header>
    <scroll ref="scroll" :class="$style.wrapper" :data="songSheets">
      <div>
        <div :class="$style.search" @click="search">
          <i class="fa fa-search"></i>&nbsp;&nbsp;<span>搜索歌曲，歌手，专辑</span>
        </div>
        <div :class="$style.list">
          <h4>最近播放</h4>
          <div :class="$style.content" @click="openMsg">
            <songsheet-item :item="item" v-for="(item, index) in historyList" :key="index"></songsheet-item>
          </div>
        </div>
        <div :class="$style.list">
          <h4>我的歌单</h4>
          <div :class="$style.content">
            <songsheet-item :item="item" v-for="(item, index) in songSheets" :key="index"></songsheet-item>
          </div>
        </div>
      </div>
    </scroll>
    <songs-search ref="songsSearch" @selectItem="selectItem"></songs-search>
    <msg ref="msg"></msg>
  </section>
  </transition>
</template>

<script>
import TextHeader from 'base/text-header/text-header'
import SongsheetItem from 'components/song-sheet/songsheet-item'
import { getSongSheet, addSongs } from 'db/songSheet'
import SongsSearch from 'components/search/songs-search'
import Msg from 'base/msg/msg'
import Scroll from 'base/scroll/scroll'
export default {
  props: {
    sid: {
      type: String,
      default: ''
    },
    songSheetName: {
      type: String,
      default: ''
    }
  },
  components: {
    TextHeader,
    SongsheetItem,
    SongsSearch,
    Msg,
    Scroll
  },
  created() {
    this._getSongSheet()
  },
  methods: {
    openMsg() {
      this.$refs.msg.show({
        msg: '该功能还未实现，敬请期待!',
        msgType: 'error',
        delay: 900
      })
    },
    selectItem(item, index, ev) {
      if (addSongs(this.sid, item)) {
        this.$refs.msg.show({
          msg: '已经添加到歌单' + this.songSheetName,
          msgType: 'success',
          delay: 900
        })
        let li = event.currentTarget.parentNode.querySelector('.rightMenu')
        if (li) {
          li.innerHTML = '<em>已添加</em>'
        }
      }
    },
    search() {
      this.$refs.songsSearch.show()
    },
    show() {
      this.showFlag = true
    },
    hide() {
      this.showFlag = false
    },
    _getSongSheet() {
      this.songSheets = getSongSheet()
    }
  },
  data() {
    return {
      showFlag: false,
      songSheets: [],
      historyList: [
        {
          songSheetName: '最近播放',
          songsNum: 3,
          icon: 'fa fa-clock-o'
        }
      ],
      navs: [
        {
          title: '',
          action: null
        },
        {
          title: '添加歌曲到歌单',
          action: null
        },
        {
          title: '关闭',
          action: this.hide
        }
      ]
    }
  }
}
</script>
<style lang="sass" scoped="" type="text/css">
  @import "../../common/scss/components/animation.scss";
  </style>

<style lang="sass" scoped="" type="text/css" module>
  .addSongs
    position: fixed
    z-index: 1000
    left: 0
    width: 100%
    top: 0
    bottom: 0
    background: #f4f4f4
    .wrapper
      width: 100%
      position: absolute
      left: 0
      top: 86px
      bottom: 0
      overflow: hidden
      .search
        width: 715px
        height: 60px
        background: #fff
        display: flex
        justify-content: center
        align-items: center
        color: #656565
        margin: 16px auto
        border-radius: 4px
        span
          font-size: 30px; /*px*/
        i
          font-size: 30px; /*px*/
          color: #bdbdbd
      .list
        h4
          height: 60px
          font-size: 20px; /*px*/
          line-height: 60px
          color: #797979
          box-sizing: border-box
          padding-left: 2.5%
        .content
          width: 100%
          background: #fff
</style>
