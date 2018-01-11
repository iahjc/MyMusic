<template>
  <section class="slider" ref="slider">
    <div class="slide-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
  </section>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'slider',
  mounted() {
    this._setWidth()
    this.initSlider()
  },
  methods: {
    _setWidth() {
      let w = this.$refs.slider.clientWidth
      let lis = this.$refs.sliderGroup.children
      lis = Array.from(lis)
      lis.forEach((item, index) => {
        item.style.width = w + 'px'
      })
      this.$refs.sliderGroup.style.width = lis.length * w + 'px'
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
    min-height: 1px
    .slide-group
      display: flex
      position: relative
</style>
