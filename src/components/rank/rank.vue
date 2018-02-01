<template>
<section class="rank">
  <header class="rank-header">
    <div class="r-h-nav" @click="back">
      <i class="fa  fa-chevron-left"></i>
    </div>
    <p class="r-h-title">
      排行
    </p>
  </header>
  <scroll class="rank-main">
    <div>
      <h2>QQ音乐巅峰榜</h2>
      <div class="rh-cont">
        <div class="rh-li" v-for="item in rankList" @click="selectItem(item)">
          <div class="rh-l">
            <img :src="item.pic_v12"/>
          </div>
          <ul class="rh-m">
            <li v-for="(item2, index) in item.songlist">
              {{index+1}} {{item2.songname}} <span>-</span> <span>{{item2.singername}}</span>
            </li>
          </ul>
          <div class="rh-r">
            <i class="fa fa-angle-right"></i>
          </div>
        </div>
      </div>
      <h2>全球榜</h2>
      <div class="gl-cont">
        <div class="gl-li" v-for="item in golbalRank">
          <div class="gl-li-t">
            <div class="gl-t-bg">
              <img :src="item.pic_v12"/>
            </div>
          </div>
          <p>
            {{item.ListName}}
          </p>
        </div>
      </div>
    </div>
  </scroll>
</section>
</template>

<script>
import {mapMutations} from 'vuex'
import Scroll from 'base/scroll/scroll'
import { getRankList, getGlobalRank } from 'api/rank'

export default {
  components: {
    Scroll
  },
  data() {
    return {
      rankList: [],
      golbalRank: []
    }
  },
  created() {
    this._getRank()
  },
  methods: {
    ...mapMutations({
      'setTopList': 'SET_TOPLIST'
    }),
    selectItem(item) {
      let id = `${item.topID},,,${item.showtime}`
      this.$router.push({
        path: `/rank/${id}`
      })
      this.setTopList(item)
    },
    back() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    _getRank() {
      getGlobalRank().then((res) => {
        let reg = new RegExp(`^ jsonCallback\\(`)
        let reg2 = new RegExp('\\)$')
        res = res.replace(reg, '').replace(reg2, '')
        res = JSON.parse(res)
        this.rankList = res[0].List
        console.log(res)
        this.golbalRank = res[1].List
      })
    }
  }
}
</script>

<style lang="sass" scoped="" type="text/css">
  @import "../../common/scss/helpers/variables.scss";
  @import "../../common/scss/helpers/mixins.scss";
  @import "../../common/scss/base/base.scss";
  .rank
    width: 100%
    position: fixed
    left: 0
    top: 0
    bottom: 0
    .rank-header
      background-color: #61bf81
      @include px2rem(height, 86px)
      width: 100%
      display: flex
      justify-content: space-between
      align-items: center
      position: absolute
      top: 0
      z-index: 10
      .r-h-title
        height: 100%
        width: 100%
        @include font-dpr(15px)
        display: flex
        justify-content: center
        align-items: center
        color: #fff
      .r-h-nav
        position: absolute
        color: #fff
        @include px2rem(width, 80px)
        text-align: center
        i
          @include font-dpr(18px)
    .rank-main
      position: absolute
      @include px2rem(top, 86px)
      left: 0
      bottom: 0
      h2
        @include px2rem(height, 100px)
        @include px2rem(line-height, 100px)
        display: flex
        justify-content: center
        align-items: center
        @include font-dpr(15px)
      .rh-cont
        width: 95%
        margin: 0 auto
        display: flex
        flex-direction: column
        background: #ffffff
        .rh-li
          display: flex
          @include px2rem(height, 242px)
          @include px2rem(margin-top, 22px)
          justify-content: space-between
          .rh-l
            @include px2rem(width, 242px)
            @include px2rem(height, 242px)
            img
              width: 100%
          .rh-m
            display: flex
            flex-direction: column
            justify-content: center
            color: #040404
            @include px2rem(width, 360px)
            @include px2rem(margin-left, 12px)
            flex: 1
            li
              @include px2rem(height, 60px)
              @include px2rem(line-height, 60px)
              @include font-dpr(13px)
              overflow: hidden
              span
                color: #6d6d6d
          .rh-r
            @include px2rem(width, 60px)
            display: flex
            justify-content: center
            align-items: center
            @include font-dpr(20px)
            color: #8e8e8e
      .gl-cont
        display: flex
        flex-wrap: wrap
        justify-content: space-between
        .gl-li
          width: 32.5%
          .gl-li-t
            width: 100%
            .gl-t-bg
              width: 100%
              img
                width: 100%
          p
            width: 90%
            margin: 0 auto
            @include font-dpr(12px)
            color: #272727
            @include px2rem(line-height, 28px)
            @include px2rem(height, 90px)
            box-sizing: border-box
            @include px2rem(padding-top, 10px)
            display: flex
</style>
