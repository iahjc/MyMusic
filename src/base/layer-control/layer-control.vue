<template lang="html">
  <transition name="b">
    <section :class="[$style.layerControl]" v-show="showFlag">
      <div :class="$style.lcHeader" v-if="datas">
        <h4>{{datas.name}} <span>原唱：{{datas.singer}}</span></h4>
        <div :class="$style.fm" v-show="datas.pay.pay_down !== 0">
          <span :class="$style.icon1">付费</span> <span :class="$style.wa">此歌曲开通付费音乐包即可畅享</span> <btn>开通</btn>
        </div>
      </div>
      <div :class="$style.lcCont">
        <ul>
          <li v-for="(item, index) in layerDatas" v-if="item.showFlag" @click="selectItem(item, index)">
            <div :class="$style.lcIcon">
              <i :class="setIcon(item.icon)"></i>
            </div>
            <p>
              {{item.title}}
            </p>
          </li>
        </ul>
      </div>
      <div :class="$style.mcVoice" v-show="showVoice">
        <ul class="mc-v">
          <li>
            <i class="fa fa-volume-down"></i>
          </li>
          <li>
            <progress-bar @percentChange="onProgressBarChange" :percent="percent" @percentChanging="onProgressBarChanging"></progress-bar>
          </li>
          <li>
            <i class="fa fa-volume-off"></i>
          </li>
        </ul>
      </div>
      <div :class="$style.cannel" @click="hide">
        取消
      </div>
    </section>
  </transition>
</template>

<script>
import Btn from 'base/btn/btn'
import {
  prefixStyle
} from 'common/js/utils/dom'
import ProgressBar from 'base/progress-bar/progress-bar'
const transform = prefixStyle('transform')
export default {
  props: {
    layerDatas: {
      type: Array,
      default() {
        return []
      }
    },
    showVoice: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      touch: {},
      options: {
        isOpen: true,
        isBg: true
      },
      showFlag: false,
      showLcFlag: false,
      cname: 'content',
      datas: null,
      percent: 0
    }
  },
  mounted() {
  },
  methods: {
    selectItem(item, index) {
      if (typeof (item.action) === 'function') {
        item.action.call(this, item)
      }
    },
    onProgressBarChange() {

    },
    onProgressBarChanging() {

    },
    setIcon(str) {
      return `fa fa-${str}`
    },
    show(obj) {
      if (obj) {
        this.datas = obj
      } else {
        this.datas = null
      }
      this.showFlag = true
    },
    hide() {
      this.showFlag = false
    }
  },
  components: {
    Btn,
    ProgressBar
  }
}
</script>

<style lang="sass" scoped="" type="text/css">
  @import "../../common/scss/components/animation.scss";
  .content
    position: absolute
    left: 0
    right: 0
    bottom: 0
    top: 0
    z-index: 10
    .button
      width: 78px
      height: 42px
      box-sizing: border-box
      border: 2px solid #5cb184; /*no*/
      background: none
      border-radius: 6px
      color: #5cb184
      display: inline-flex
      justify-content: center
      align-items: center
      font-size: 20px; /*px*/
</style>


<style lang="sass" scoped="" type="text/css" module>
  @import "../../common/scss/components/buttons.scss";

  .layerControl
    width: 100%
    position: fixed
    bottom: 0
    background: #e4e4e4
    z-index: 50000
    .lcHeader
      border-bottom: 1px solid #cdcdcd; /*no*/
      padding: 24px 0
      h4
        font-size: 24px; /*px*/
        line-height: 42px; /*px*/
        padding: 0 2.5%
        span
          color: #5a5a5a
      .fm
        display: flex
        height: 42px
        justify-content: space-between
        align-items: center
        box-sizing: border-box
        padding: 0 2.5%
        span.wa
          font-size: 26px; /*px*/
          color: #747474
          flex: 1
          padding-left: 10px
    .mcVoice
      width: 100%
      height: 125px
      color: #fff
      border-top: 1px solid #cdcdcd; /*no*/
      border-bottom: 1px solid #cdcdcd; /*no*/
      display: flex
      justify-content: center
      align-items: center
      ul
        display: flex
        justify-content: center
        align-items: center
        li:nth-child(2)
          width: 480px
        li:nth-child(3)
          i
            transform: rotate(180deg)
        li
          width: 100px
          height: 100px
          display: flex
          justify-content: center
          align-items: center
          color: #444
          .voiceCont
            width: 100%
            height: 8px
            background: #444
            opacity: .4
            position: relative
            .progress
              height: 100%
              width: 0
              background: #000
            .progressbtn
              width: 26px
              height: 26px
              background: #fff
              border-radius: 100%
              border: 3px solid #61bf81; /*no*/
              box-sizing: border-box
              position: absolute
              left: 0
              top: -10px

          i
            font-size: 38px; /*px*/
    .cannel
      width: 100%
      height: 108px
      display: flex
      justify-content: center
      align-items: center
      font-size: 32px; /*px*/
      border-top: 1px solid #cdcdcd; /*no*/
    .lcCont
      ul
        width: 95%
        display: flex
        margin: 0 auto
        flex-wrap: wrap
        padding-bottom: 32px
        li:nth-child(6n)
          margin-right: 0
        li
          margin-right: 28px
          margin-top: 32px
          .lcIcon
            width: 94px
            height: 94px
            background: #fff
            border-radius: 24px
            display: flex
            justify-content: center
            align-items: center
            i
              font-size: 48px; /*px*/
              color: #424242
          p
            margin: 20px 0
            font-size: 24px; /*px*/
            color: #0a0a0a
            text-align: center
</style>
