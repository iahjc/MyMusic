<template>
  <section class="music-hall">
    <slider>
      <div class="banner-li" v-for="item in slideList">
        <img :src="item.picUrl" />
      </div>
    </slider>


  </section>
</template>

<script>
import Slider from 'base/slider/slider'
import { sliderData } from 'api/musichall'

export default {
  data() {
    return {
      slideList: null
    }
  },
  created() {
    // 请求banner数据并填充
    this.getSlideList()
  },
  mounted() {
    console.log(this.sliderData)
  },
  methods: {
    // 获取banner数据
    getSlideList() {
      if (sliderData.code === 0) {
        this.slideList = sliderData.data.slider
      }
    }
  },
  components: {
    Slider
  }
}
</script>

  <style lang="sass" scoped="" type="text/css">
    @import "../../common/scss/helpers/variables.scss";
    @import "../../common/scss/helpers/mixins.scss";
    @import "../../common/scss/base/base.scss";

    .music-hall
      width: 100%
      .banner-li
        img
          width: 100%
</style>
