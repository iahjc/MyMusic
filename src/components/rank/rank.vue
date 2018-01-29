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
  <h2>QQ音乐巅峰榜</h2>
  <div class="rh-cont">
    <div class="rh-li" v-for="item in rankList">
      <div class="rh-l">
        <img :src="item.picUrl"/>
      </div>
      <ul class="rh-m">
        <li v-for="(item2, index) in item.songList">
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
</section>
</template>

<script>
import { getRank, getGlobalRank } from 'api/rank'

export default {
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
    back() {
      console.log(111)
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    _getRank() {
      getRank().then((res) => {
        if (res.code === 0) {
          this.rankList = res.data.topList
        }
      })
      getGlobalRank().then((res) => {
        let reg = new RegExp(`^ jsonCallback\\(`)
        let reg2 = new RegExp('\\)$')
        res = res.replace(reg, '').replace(reg2, '')
        res = JSON.parse(res)
        this.golbalRank = res[1].List
        console.log(this.golbalRank)
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
    .rank-header
      background-color: #61bf81
      @include px2rem(height, 86px)
      width: 100%
      display: flex
      justify-content: space-between
      align-items: center
      position: absolute
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
    .rh-cont
      display: flex
      flex-direction: column
      background: #ffffff
      .rh-li
        display: flex
        @include px2rem(height, 258px)
        @include px2rem(margin-top, 22px)
        justify-content: space-between
        .rh-l
          @include px2rem(width, 258px)
          @include px2rem(height, 258px)
          img
            width: 100%
        .rh-m
          display: flex
          flex-direction: column
          justify-content: center
          color: #040404
          @include px2rem(max-width, 410px)
          @include px2rem(margin-left, 12px)
          flex: 1
          li
            @include px2rem(height, 60px)
            @include px2rem(line-height, 60px)
            @include font-dpr(12px)
            overflow: hidden
            span
              color: #6d6d6d
        .rh-r
          display: flex
          justify-content: center
          align-items: center
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
          @include font-dpr(13px)
          color: #272727
</style>
