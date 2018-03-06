<template>
  <transition name="playlist">
    <section :class="$style.playList" v-show="showFlag">
      <div :class="$style.content">
        <div :class="$style.header">
          <div :class="$style.playMode">
            <i class="fa fa-refresh"></i>&nbsp;&nbsp;<span>单曲循环</span>
          </div>
          <ul :class="$style.headerR">
            <li>
              <i class="fa fa-download"></i>
            </li>
            <li>
              <i class="fa fa-plus"></i>
            </li>
            <li>
              <i class="fa fa-trash-o"></i>
            </li>
          </ul>
        </div>
        <scroll :class="$style.playListWrapper" :data="playList">
          <div>
            <div v-for="(item, index) in playList" :key="index" :class="[$style.item, {active: currentIndex === index}]">
              <div :class="$style.title" @click="selectItem(item, index)">
                <span>{{item.name}}</span>&nbsp;&nbsp;-&nbsp;&nbsp;<span>{{item.singer}}</span>&nbsp;&nbsp;<img v-show="currentIndex === index" src="./wave.gif"/>
              </div>
              <ul :class="$style.itemR">
                <li>
                  <i class="fa fa-heart-o"></i>
                </li>
                <li>
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
    </section>
  </transition>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import {mapMutations} from 'vuex'

export default {
  components: {
    Scroll
  },
  data() {
    return {
      showFlag: false
    }
  },
  props: {
    playList: {
      type: Array,
      default: []
    },
    currentIndex: {
      type: Number,
      default: -1
    }
  },
  methods: {
    ...mapMutations({
      setCurrentIndex: 'SET_CURRENTINDEX'
    }),
    show() {
      this.showFlag = true
    },
    hide() {
      this.showFlag = false
    },
    closePlayList() {
      this.$emit('closePlayList')
    },
    selectItem(item, index) {
      this.setCurrentIndex(index)
    }
  },
  created() {
    console.log(this.playList)
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
      background: rgba(0, 0, 0, 0)
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
              img
                width: 20px
              span:first-child
                font-size: 26px; /*px*/
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
    div.active
        span
          color: #69b586!important
</style>
