<template>
  <section class="slider" ref="slider">
    <div class="slide-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <ul class="dots">
      <li v-for="(item, index) in dots" :class="{cur: currentIndex === index}"></li>
    </ul>
    <loading v-show="showFlag"></loading>
  </section>
</template>

<script>
import BScroll from 'better-scroll'
import Loading from 'base/loading/loading'
export default {
  name: 'slider',
  data() {
    return {
      showFlag: true,
      dots: null,
      currentIndex: 0,
      slides: null
    }
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  components: {
    Loading
  },
  mounted() {
  },
  methods: {
    setDots() {
      let len = this.$refs.sliderGroup.children
      this.dots = new Array(len.length)
    },
    setInit() {
      setTimeout(() => {
        this.setDots()
        this._setWidth()
        this.initSlider()
      }, 20)
    },
    _setWidth() {
      let w = this.$refs.slider.clientWidth
      let lis = this.$refs.sliderGroup.children
      lis = Array.from(lis)
      lis.forEach((item, index) => {
        item.style.width = w + 'px'
      })
      this.$refs.sliderGroup.style.width = lis.length * w + 'px'

      this.showFlag = false
    },
    initSlider() {
      this.$nextTick(() => {
        this.slides = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false, // 当快速在屏幕上滑动一段距离的时候，会根据滑动的距离和时间计算出动量，并生成滚动动画。设置为true则开启动画。
          snap: true,  // 开启slide组件
          snapThreshold: 0.3, // 表示可滚动到下一个阈值
          snapSpeed: 400
        })

        // 滚动结束的时候 改变状态
        this.slides.on('scrollEnd', () => {
          let pageIndex = this.slides.getCurrentPage().pageX
          this.currentIndex = pageIndex
        })
      })
    }
  }
}
</script>

<style lang="sass" scoped="" type="text/css">
  @import "../../common/scss/helpers/variables.scss";
  @import "../../common/scss/helpers/mixins.scss";
  @import "../../common/scss/base/base.scss";
  .slider
    width: 100%
    min-height: 120px
    position: relative
    overflow: hidden
    .slide-group
      width: 100%
      display: flex
      position: relative
    .loading
      display: flex
      justify-content: center
      align-items: center
    .dots
      width: 100%
      position: absolute
      bottom: 8%
      display: flex
      justify-content: center
      li
        box-sizing: border-box
        background-color: rgba(255, 255, 255, .3)
        @include px2rem(width, 20px)
        @include px2rem(height, 20px)
        border-radius: 100%
        @include px2rem(margin-right, 24px)
      li.cur
        background-color: #fff
      li:last-child
        margin-right: 0
</style>
