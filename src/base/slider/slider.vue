<template>
  <section class="slider" ref="slider">
    <div class="slide-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>

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
      showFlag: true
    }
  },
  components: {
    Loading
  },
  mounted() {
  },
  methods: {
    setInit() {
      setTimeout(() => {
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
        new BScroll(this.$refs.slider,{
          scrollX: true,
          scrollY: false
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
    .slide-group
      width: 100%
      display: flex
      position: relative
    .loading
      display: flex
      justify-content: center
      align-items: center

</style>
