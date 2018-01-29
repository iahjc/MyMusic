<template>
  <section class="prompt" v-show="showFlag">
    <div class="prompt-cont">
      <div class="pr-msg">
        <p>
          {{msg}}
        </p>
      </div>
      <div class="prompt-btn" @click="close">
        {{btnMsg}}
      </div>
    </div>
    <bg ref="bg"></bg>
  </section>
</template>

<script>
import Bg from 'base/bg/bg'
export default {
  data() {
    return {
      showFlag: false
    }
  },
  props: {
    msg: {
      type: String,
      default: '已关闭仅Wi-Fi联网, 2G/3G/4G网络请关注流量消耗'
    },
    btnMsg: {
      type: String,
      default: '我知道了'
    }
  },
  components: {
    Bg
  },
  mounted() {
    this.$refs.bg.show()
  },
  methods: {
    show() {
      this.showFlag = true
    },
    hide() {
      this.showFlag = false
    },
    close() {
      this.hide()
      this.$emit('closePrompt')
    }
  }
}
</script>

<style lang="sass" scoped="" type="text/css">
  @import "../../common/scss/helpers/variables.scss";
  @import "../../common/scss/helpers/mixins.scss";
  @import "../../common/scss/base/base.scss";

  .prompt
    left: 0
    top: 0
    bottom: 0
    right: 0
    position: fixed
    overflow: hidden
    display: flex
    justify-content: center
    align-items: center
    .prompt-cont
      position: relative
      z-index: 11111
      @include px2rem(width, 540px)
      @include px2rem(height, 260px)
      background: #fff
      border-radius: 10px
      .pr-msg
        @include px2rem(height, 176px)
        width: 100%
        display: flex
        justify-content: center
        align-items: center
        p
          @include font-dpr(15px)
          @include px2rem(width, 440px)
          @include px2rem(line-height, 42px)
          text-align: center
      .prompt-btn
        @include px2rem(height, 82px)
        width: 100%
        @include font-dpr(17px)
        display: flex
        justify-content: center
        align-items: center
        color: #61a87a
        border-top: 1px solid #e1e1e1
        position: absolute
        bottom: 0
</style>
