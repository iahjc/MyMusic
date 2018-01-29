<template>
<section class="mask" ref="mask" v-show="showFlag" @click="selectBg">

</section>
</template>

<script>
export default {
  data() {
    return {
      showFlag: false
    }
  },
  props: {
    /**
     * 遮罩范围
     * @type {Object}  parent 和父类的范围一致  screen 全屏  宽高  50,50
     */
    maskType: {
      type: String,
      default: 'parent'
    },
    zIndex: {
      type: Number,
      default: 5
    },
    bgColor: {
      type: String,
      default: 'rgba(0, 0, 0, 1)'
    }
  },
  mounted() {
    console.log(111)
    this.setMask()
    this.setZIndex()
    this.setBgColor()
  },
  methods: {
    selectBg() {
      this.$emit('selectBg')
    },
    show() {
      this.showFlag = true
      this.$refs.mask.style.transition = 'all .3s ease'
      this.$refs.mask.style.opacity = '0.2'
    },
    hide() {
      this.showFlag = false
    },
    setMask() {
      if (this.maskType === 'screen') {
        let w = document.documentElement.clientWidth
        let h = document.documentElement.clientHeight
        this.$refs.mask.style.width = w + 'px'
        this.$refs.mask.style.height = h + 'px'
      } else {
        // if (this.maskType.test(/,/)) {
        //   let wh = this.maskType.split(',')
        //   this.$refs.mask.style.width = wh[0] + 'px'
        //   this.$refs.mask.style.height = wh[1] + 'px'
        // }
      }
    },
    setZIndex() {
      this.$refs.mask.style.zIndex = this.zIndex
    },
    setBgColor() {
      this.$refs.mask.style.backgroundColor = this.bgColor
    }
  }
}
</script>

<style lang="sass" scoped="" type="text/css">
  @import "../../common/scss/helpers/variables.scss";
  @import "../../common/scss/helpers/mixins.scss";
  @import "../../common/scss/base/base.scss";

  .mask
    background-color: rgba(0, 0, 0, 1)
    position: absolute
    left: 0
    top: 0
    z-index: 5
    width: 100%
    height: 100%
  </style>
