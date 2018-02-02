<template>
<transition name="showGd">
  <section class="create-gd" v-show="showFlag">
    <header class="gd-h">
      <ul>
        <li @click="closeCreateBg">取消</li>
        <li>新建歌单</li>
        <li @click="commitBg">完成</li>
      </ul>
    </header>

    <div class="gd-input">
      <input type="text" ref="input" v-model="title" placeholder="歌单标题" />
      <div class="gd-remove" v-show="title" @click="removeTitle">
        <i class="fa fa-remove"></i>
      </div>
    </div>
    <msg ref="msg"></msg>
  </section>
</transition>
</template>

<script>
import Msg from 'base/msg/msg'
import SongSheet from 'domain/songSheet'
import {insertSongSheet, isSongSheet, getNextSongSheetId} from 'db/songSheet'
export default {
  components: {
    Msg
  },
  data() {
    return {
      showFlag: false,
      title: ''
    }
  },
  methods: {
    removeTitle() {
      this.title = ''
    },
    show() {
      this.showFlag = true
    },
    hide() {
      this.showFlag = false
    },
    closeCreateBg() {
      this.$emit('closeCreateBg')
    },
    commitBg() {
      if (this.title !== '') {
        if (isSongSheet(this.title)) {
          this.$refs.msg.show({
            msg: '歌单已存在，请重新创建!',
            msgType: 'error',
            delay: 900
          })
          return false
        }

        // 判断歌单是否重复
        let songSheet = new SongSheet({
          id: getNextSongSheetId(),
          songSheetName: this.title,
          songsNum: 0
        })
        insertSongSheet(songSheet.getJson(songSheet))
      } else {
        this.$refs.msg.show({
          msg: '请输入歌单标题!',
          msgType: 'error',
          delay: 900
        })
        return false
      }
    }
  }
}
</script>

  <style lang="sass" scoped="" type="text/css">
    @import "../../common/scss/helpers/variables.scss";
    @import "../../common/scss/helpers/mixins.scss";
    @import "../../common/scss/base/base.scss";
    .showGd-enter,.showGd-leave-to
      transform: translateY(100%)
    .showGd-enter-active
      transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0)
    .showGd-leave-active
      transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0)

    .create-gd
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      background: #fff
      z-index: 5
      .gd-h
        @include px2rem(height, 86px)
        background: #61bf81
        color: #fff
        ul
          display: flex
          align-items: center
          @include font-dpr(15px)
          li:first-child,li:last-child
            @include px2rem(width, 100px)
            @include px2rem(height, 75px)
            display: flex
            justify-content: center
            align-items: center
          li:nth-child(2)
            flex: 1
            @include px2rem(height, 86px)
            display: flex
            align-items: center
            justify-content: center
      .gd-input
        @include px2rem(height, 80px)
        box-sizing: border-box
        @include px2rem(border-bottom-width, 2px)
        border-color: #f2f2f2
        border-style: solid
        display: flex
        justify-content: space-between
        .gd-remove
          @include px2rem(width, 80px)
          @include px2rem(height, 80px)
          box-sizing: border-box
          display: flex
          justify-content: center
          align-items: center
          i
            color: #ccc
            @include font-dpr(18px)
        input
          height: 100%
          box-sizing: border-box
          padding-left: 3%
          width: 80%
          border: 0
          @include font-dpr(14px)
          color: #747474
</style>
