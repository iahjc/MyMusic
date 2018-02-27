<template lang="html">
  <section :class="[flCls, cname]" v-show="showFlag">
    <slot/>
    <bg ref="bg"></bg>
    <loading ref="loading"></loading>
  </section>
</template>

<script>
import Bg from 'base/bg/bg'
import Loading from 'base/loading/loading'
export default {
  data() {
    return {
      flCls: 'flCls',
      showFlag: false,
      opt: {
        isBg: true, // 是不是有背景
        isOpen: false, // 是不是直接打开
        isLoading: false, // 是不是直接loading
        showBgAnimation: function() {},
        hideBgAnimation: function() {},
        showLayerAnimation: function() {},
        hideLayerAnimation: function() {},
        loadingImg: '',
        showLoadingAnimation: function() {},
        hideLoadingAnimation: function() {}
      }
    }
  },
  props: {
    cname: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default: {}
    }
  },
  mounted() {
    this.init()
  },
  created() {
    this.opt = this._extend(this.opt, this.options)
    console.log(this.cname)
  },
  methods: {
    init() {
      if (this.opt.isOpen) {
        this.showFlag = true
      } else {
        this.showFlag = false
      }

      if (this.opt.isBg) {
        this.$refs.bg.show()
      } else {
        this.$refs.bg.hide()
      }
    },
    _extend(opt1, opt2) { // opt1是默认的 opt2 是自己传进来的
      for (let str in opt2) {
        opt1[str] = opt2[str]
      }
      return opt1
    },
    show() {
      this.showFlag = true
    },
    hide() {
      this.showFlag = false
    }
  },
  components: {
    Bg,
    Loading
  }
}
</script>

<style lang="sass" scoped="" type="text/css">
  .flCls
    width: 100%
</style>
