<template>
<section class="music-hall">
  <slider ref="slider">
    <div class="banner-li" v-for="item in slideList">
      <img :src="item.picUrl" />
    </div>
  </slider>

  <nav class="music-category">
    <ul>
      <li>
      <router-link to="/singer"><i class="fa fa-user icon-color"></i><span>歌手</span></router-link>
      </li>
      <li>
        <i class="fa fa-bar-chart icon-color"></i><span>排行</span>
      </li>
      <li>
        <i class="fa fa-codiepie icon-color"></i><span>电台</span>
      </li>
      <li>
        <i class="fa fa-bars icon-color"></i><span>分类歌单</span>
      </li>
      <li>
        <i class="fa fa-video-camera icon-color"></i><span>视频MV</span>
      </li>
      <li>
        <i class="fa fa-bullseye icon-color"></i><span>数字专辑</span>
      </li>
    </ul>
  </nav>

  <three-col title="歌单推荐">
    <ul class="col-3-cont">
      <li v-for="item in modePlayList">
        <div class="i-mg">
          <img :src="item.picUrl"/>
          <div class="i-msg">
            <div class="i-msg-num">
              <i></i> <span>{{item.playNumber}}</span>
            </div>
            <div class="i-msg-play">
              <i></i>
            </div>
          </div>
        </div>
        <p>
          {{item.title}}
        </p>
      </li>
    </ul>
  </three-col>

  <three-col title="每日歌曲推荐">

  </three-col>

  <router-view></router-view>
</section>
</template>

<script>
import Slider from 'base/slider/slider'
import ThreeCol from 'base/three-col/three-col'
import {
  getSlideData,
  modePlayList
} from 'api/musichall'

export default {
  data() {
    return {
      slideList: null,
      modePlayList: null
    }
  },
  created() {
    // 请求banner数据并填充
    this.getSlideList()
    this.modePlayList = modePlayList
  },
  mounted() {
    console.log(11)
  },
  methods: {
    toSinger() {
      this.$router.push({
        path: '/singer'
      })
    },
    // 获取banner数据
    getSlideList() {
      getSlideData().then((res) => {
        if (res.code === 0) {
          this.slideList = res.data.slider
          this.loadImg()
        }
      }).then((err) => {

      })
    },
    // 加载出第一张图片 去执行slider的方法
    loadImg() {
      let img = new Image()
      img.src = this.slideList[0].picUrl
      img.onload = () => {
        this.$refs.slider.setInit()
      }
    }
  },
  components: {
    Slider,
    ThreeCol
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
    .music-category
      width: 100%
      ul
        width: 100%
        display: flex
        flex-wrap: wrap
        li
          @include px2rem(width, 250px)
          @include px2rem(height, 82px)
          display: flex
          justify-content: center
          align-items: center
    .col-3-cont
      display: flex
      flex-wrap:  wrap
      justify-content: space-between
      li
        width: 32%
        .i-mg
          width: 100%
          position: relative
          .i-msg
            position: absolute
            left: 0
            bottom: 0
            z-index: 2
          img
            width: 100%
</style>
