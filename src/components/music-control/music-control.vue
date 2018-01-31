<template>
  <section class="music-control" v-show="showFlag">
    <div class="mc-t">
      <span>辈分歌</span>&nbsp;&nbsp; <<祖宗十九代>>电影宣传曲
    </div>
    <div class="mc-cont">
      <ul>
        <li>
          <div class="mc-icon">
            <i class="fa fa-times"></i>
          </div>
          <p>
            加到歌曲
          </p>
        </li>

        <li>
          <div class="mc-icon">
            <i class="fa fa-download"></i>
          </div>
          <p>
            下载
          </p>
        </li>

        <li>
          <div class="mc-icon">
            <i class="fa fa-share"></i>
          </div>
          <p>
            分享
          </p>
        </li>

        <li>
          <div class="mc-icon">
            <i class="fa fa-commenting"></i>
          </div>
          <p>
            评论
          </p>
        </li>

        <li>
          <div class="mc-icon">
            <i class="fa fa-life-bouy"></i>
          </div>
          <p>
            相似歌曲
          </p>
        </li>
        <li>
          <div class="mc-icon">
            <i class="fa fa-user-o"></i>
          </div>
          <p>
            查看歌手
          </p>
        </li>
        <li>
          <div class="mc-icon">
            <i class="fa fa-gratipay"></i>
          </div>
          <p>
            查看专辑
          </p>
        </li>
        <li>
          <div class="mc-icon">
            <i class="fa fa-opencart"></i>
          </div>
          <p>
            歌词海报
          </p>
        </li>
        <li>

        </li>
        <li>

        </li>
      </ul>
    </div>
    <div class="mc-voice">
      <ul class="mc-v">
        <li>
          <i class="fa fa-volume-down"></i>
        </li>
        <li>
          <div class="mc-vc">
            <div>

            </div>
          </div>
        </li>
        <li>
          <i class="fa fa-volume-off"></i>
        </li>
      </ul>
    </div>
    <div class="mc-close" @click="mcClose">
      取消
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      showFlag: false
    }
  },
  methods: {
    mcClose() {
      this.$emit('mcClose')
    },
    show() {
      this.showFlag = true
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
    @import "../../common/scss/helpers/function.scss";
    @import "../../common/scss/base/base.scss";

    .music-control
      position: absolute
      bottom: 0
      left: 0
      width: 100%
      background: rgba(0, 0, 0, 0.9)
      z-index: 111
      .mc-t
        @include px2rem(height, 85px)
        color: #897c76
        display: flex
        align-items: center
        box-sizing: border-box
        @include px2rem(border-bottom-width, 2px)
        border-style: solid
        border-color: rbga(255, 255, 255, .7)
        @include font-dpr(12px)
        box-sizing: border-box
        padding-left: 5%
        padding-right: 3%
        span
          @include font-dpr(13px)
          color: #fff
      .mc-cont
        width: 100%
        display: flex
        justify-content: center
        @include px2rem(margin-top, 30px)
        @include px2rem(padding-bottom, 20px)
        @include px2rem(border-bottom-width, 2px)
        border-style: solid
        border-color: rgba(255, 255, 255, .7)
        ul
          width: 95%
          display: flex
          flex-wrap: wrap
          justify-content: space-between
          @include px2rem(margin-right, -35px)
          li
            @include px2rem(width, 92px)
            color: #c1bdbc
            @include px2rem(margin-right, 35px)
            .mc-icon
              @include px2rem(width, 92px)
              @include px2rem(height, 92px)
              background: rgba(255, 255, 255, .3)
              @include px2rem(border-radius, 15px)
              display: flex
              justify-content: center
              align-items: center
              i
                @include font-dpr(25px)
            p
              @include px2rem(height, 70px)
              @include font-dpr(10px)
              color: #fff
              opacity: .7
              display: flex
              justify-content: center
              align-items: center
      .mc-voice
        width: 100%
        @include px2rem(height, 125px)
        color: #fff
        @include px2rem(border-bottom-width, 2px)
        border-style: solid
        border-color: rgba(255, 255, 255, .7)
        display: flex
        justify-content: center
        align-items: center
        ul
          display: flex
          justify-content: center
          align-items: center
          li:nth-child(2)
            @include px2rem(width, 480px)
            .mc-vc
              width: 100%
              @include px2rem(height, 8px)
              background: rgba(255, 255, 255, .6)
          li
            @include px2rem(width, 100px)
            @include px2rem(height, 100px)
            display: flex
            justify-content: center
            align-items: center
            i
              @include font-dpr(16px)
      .mc-close
        width: 100%
        @include px2rem(height, 110px)
        color: #fff
        @include font-dpr(15px)
        display: flex
        justify-content: center
        align-items: center
</style>
