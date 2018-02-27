<template>
  <section class="music-hall" ref="musicHall">
    <scroll ref="scroll" class="mh-cont" :data="newRecommendList">
      <div>
        <slider ref="slider">
          <div class="banner-li" v-for="item in slideList">
            <img :src="item.picUrl" />
          </div>
        </slider>

        <nav class="music-category">
          <ul>
            <li @click="toSinger">
              <i class="fa fa-user icon-color"></i>&nbsp;&nbsp;<span>歌手</span>
            </li>
            <li @click="toRank">
              <i class="fa fa-bar-chart icon-color"></i>&nbsp;&nbsp;<span>排行</span>
            </li>
            <li @click="toRadioStation">
              <i class="fa fa-codiepie icon-color"></i>&nbsp;&nbsp;<span>电台</span>
            </li>
            <li @click="toClassRadiostation">
              <i class="fa fa-bars icon-color"></i>&nbsp;&nbsp;<span>分类歌单</span>
            </li>
            <li @click="toMV">
              <i class="fa fa-video-camera icon-color">&nbsp;&nbsp;</i><span>视频MV</span>
            </li>
            <li @click="toAlbum">
              <i class="fa fa-bullseye icon-color"></i>&nbsp;&nbsp;<span>数字专辑</span>
            </li>
          </ul>
        </nav>

        <panel title="为你推荐歌单">
          <ul class="col-3-cont">
            <li v-for="item in newRecommendList" @click="toMusicList(item)">
              <div class="i-mg">
                <img v-lazy="item.imgurl" />
                <div class="i-msg">
                  <div class="i-msg-num">
                    <i class="fa fa-music"></i>&nbsp;&nbsp;<span>{{item.listennum}}</span>
                  </div>
                  <div class="i-msg-play">
                    <i class="fa fa-play-circle-o"></i>
                  </div>
                </div>
              </div>
              <p>
                {{item.dissname}}
              </p>
            </li>
          </ul>
        </panel>

        <new-albumlist :albums="newAlbumList"></new-albumlist>
      </div>
    </scroll>
    <router-view></router-view>
  </section>
</template>

<script>
import Slider from 'base/slider/slider'
import ThreeCol from 'base/three-col/three-col'
import Panel from 'base/panel/panel'
import Scroll from 'base/scroll/scroll'
import NewAlbumlist from 'components/music-hall/new-albumlist'
import {
  getSlideData,
  singerRecommend
} from 'api/musichall'
import { getIndexNewAlbum } from 'api/album'

export default {
  data() {
    return {
      slideList: null,
      newRecommendList: null,
      newAlbumList: null
    }
  },
  created() {
    // 请求banner数据并填充
    this.getSlideList()
  },
  mounted() {
    this._getNewRecommend()
    this._getIndexNewAlbum()
  },
  methods: {
    _getIndexNewAlbum() {
      getIndexNewAlbum().then((res) => {
        let reg = new RegExp(`^recom41121723644638686\\(`)
        let reg2 = new RegExp('\\)$')
        res = res.replace(reg, '').replace(reg2, '')
        res = JSON.parse(res)
        this.newAlbumList = res.new_album.data.album_list
        this.newAlbumList.length = 6
      })
    },
    toAlbum() {
      this.$router.push({
        path: `/album`
      })
    },
    toClassRadiostation() {
      this.$router.push({
        path: `/classradiostation`
      })
    },
    toRadioStation() {
      this.$router.push({
        path: `/radiostation`
      })
    },
    showNavbar() {
      if (this.navFlag) {
        this._hideNav()
      } else {
        this._showNav()
      }
    },
    toSinger() {
      this.$router.push({
        path: `/singer`
      })
    },
    toRank() {
      this.$router.push({
        path: '/rank'
      })
    },
    toMusicList(item) {
      this.$router.push({
        path: `/songlist/${item.dissid}`
      })
    },
    toMV() {
      this.$router.push({
        path: `/mv`
      })
    },
    _getNewRecommend() {
      singerRecommend().then((res) => {
        if (res.code === 0) {
          this.newRecommendList = res.data.list
          this.newRecommendList.length = 6
          console.log(this.newRecommendList)
        }
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
        console.log(err)
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
    ThreeCol,
    Scroll,
    Panel,
    NewAlbumlist
  }
}
</script>

  <style lang="sass" scoped="" type="text/css">
    @import "../../common/scss/helpers/variables.scss";
    @import "../../common/scss/helpers/function.scss";
    @import "../../common/scss/helpers/mixins.scss";
    @import "../../common/scss/base/base.scss";

    .music-hall
      width: 100%
      background: #f4f4f4
      position: fixed
      left: 0
      top: 152px
      bottom: 0
      .mh-cont
        position: absolute
        overflow: hidden
        width: 100%
        bottom: 0
        left: 0
        top: 0
      .banner-li
        img
          width: 100%
          max-height: 480px
    .music-category
      width: 100%
      margin-top: 12px
      ul
        width: 100%
        display: flex
        flex-wrap: wrap
        box-sizing: border-box
        li
          width: 33.33%
          @include px2rem(height, 82px)
          display: flex
          justify-content: center
          align-items: center
          span
            display: block
            @include px2rem(width, 100px)
          i
            font-size: 48px; /*px*/
    .col-3-cont
      display: flex
      flex-wrap:  wrap
      justify-content: space-between
      li
        width: 32%
        color: #fff2eb
        .i-mg
          width: 100%
          position: relative
          .i-msg
            position: absolute
            left: 0
            bottom: 2%
            z-index: 2
            @include px2rem(height, 56px)
            display: flex
            justify-content: space-between
            width: 100%
            align-items: center
            .i-msg-num
              font-size: 24px; /*px*/
              @include px2rem(margin-left, 20px)
            .i-msg-play
              font-size: 32px; /*px*/
              margin-right: 10px
          img
            width: 100%
        p
          color: #0d0d0d
          font-size: 24px; /*px*/
          @include px2rem(line-height, 32px)
          box-sizing: border-box
          padding-left: 3%
          padding-right: 3%
          @include px2rem(margin-top, 16px)
          @include px2rem(margin-bottom, 16px)
</style>
