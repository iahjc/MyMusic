<template>
  <transition name="msg">
    <section class="msg" ref="msg" v-show="showFlag">
      <i class="fa fa-check-circle-o"></i>&nbsp;&nbsp;<span>{{options.msg}}</span>
    </section>
  </transition>
</template>

<script>
import {extend} from 'common/js/utils/util'
export default {
  data() {
    return {
      showFlag: false,
      options: {
        msg: '',
        msgType: 'success',
        beforeSuccess: function() {},
        isOut: true,
        delay: 800
      },
      timer: null
    }
  },
  mounted() {
  },
  methods: {
    _setStyle(msgType) {
      if (msgType === 'error') {
        this.$refs.msg.className = 'msg error'
        this.$refs.msg.children[0].className = 'fa fa-question-circle-o'
      } else {
        this.$refs.msg.className = 'msg success'
        this.$refs.msg.children[0].className = 'fa fa-check-circle-o'
      }
    },
    _setMsg(msg) {
      this.msg = msg
    },
    show(obj) {
      let options = extend(this.options, obj)
      this._setStyle(options.msgType)
      this._setMsg(options.msg)
      this.showFlag = true
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.hide()
      }, options.delay)
    },
    hide() {
      this.showFlag = false
    }
  }
}
</script>

  <style lang="sass" scoped="" type="text/css">
    @import "../../common/scss/helpers/variables.scss";
    @import "../../common/scss/helpers/mixins.scss";
    @import "../../common/scss/base/base.scss";
    .msg-enter,.msg-leave-to
      transform: translateY(-100%)
    .msg-enter-active
      transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0)
    .msg-leave-active
      transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0)
    .msg
      position: fixed
      @include px2rem(height, 86px)
      width: 100%
      top: 0
      background: #61bf81
      display: flex
      align-items: center
      box-sizing: border-box
      padding-left: 5%
      font-size: 28px; /*px*/
      z-index: 11111
      color: #fff
    .success
    .error
      background: #ec7571
</style>
