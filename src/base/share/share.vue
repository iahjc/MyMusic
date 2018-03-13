<template lang="html">
  <transition name="share-fade">
  <section class="share" v-show="shareState">
    <div class="share-cont">
      <ul>
        <li>
          <div class="share-icon">
            <i class="fa fa-weixin"></i>
          </div>
          <p>微信好友</p>
        </li>
        <li>
          <div class="share-icon">
            <i class="fa fa-fonticons"></i>
          </div>
          <p>朋友圈</p>
        </li>
        <li>
          <div class="share-icon">
            <i class="fa fa-qq"></i>
          </div>
          <p>QQ</p>
        </li>
        <li>
          <div class="share-icon">
            <i class="fa fa-weibo"></i>
          </div>
          <p>QQ空间</p>
        </li>
        <li>
          <div class="share-icon">
            <i class="fa fa-github"></i>
          </div>
          <p>新浪微博</p>
        </li>
        <li>
          <div class="share-icon">
            <i class="fa fa-twitter"></i>
          </div>
          <p>推特</p>
        </li>
      </ul>
      <btn :cname="cla" @selectItem="hide">取消</btn>
    </div>
  </section>
  </transition>
</template>

<script>
import Btn from 'base/btn/btn'
import Bg from 'base/bg/bg'
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'shareState'
    ])
  },
  data() {
    return {
      cla: 'close',
      showFlag: true
    }
  },
  components: {
    Btn,
    Bg
  },
  methods: {
    show() {
      this.showFlag = true
      this.$refs.bg.show()
    },
    hide() {
      this.$refs.bg.hide()
      this.showFlag = false
    }
  }
}
</script>

<style lang="sass" scoped="" type="text/css">
  @import "../../common/scss/components/animation.scss";
  .share
    position: fixed
    bottom: 0
    left: 0
    right: 0
    top: 0
    z-index: 500
    .share-cont
      width: 100%
      background: #e4e4e4
      position: absolute
      bottom: 0
      left: 0
      z-index: 10
      .close
        width: 100%
        display: block
        border-radius: 0
        background: none
        border: 0
        border-top: 1px solid #d5d5d5; /*no*/
        height: 108px
        color: #444
        font-size: 28px; /*px*/
        line-height: 108px
      ul
        display: flex
        width: 594px
        flex-wrap: wrap
        margin: 0 auto
        li:nth-child(4n)
          margin-right: 0
        li
          margin-top: 35px
          width: 92px
          margin-right: 75px
          p
            line-height: 60px
            text-align: center
            font-size: 20px; /*px*/
            color: #000
          .share-icon
            display: flex
            justify-content: center
            align-items: center
            width: 92px
            height: 92px
            background: #fff
            border-radius: 20px
            i
              font-size: 50px; /*px*/
              color: #444
</style>
