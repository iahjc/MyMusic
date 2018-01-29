<template>
  <section class="singer-detail">
    <header class="sl-h">
      <div class="sl-h-nav" @click="back">
        <i class="fa fa-angle-left"></i>
      </div>
      <p></p>
      <div class="sl-h-r">
         <i class="fa fa-ellipsis-h"></i>
      </div>
    </header>

    <div class="sd-h">
      <div class="sd-bg" :style="bgStyle">
      </div>
      <div class="sd-cont">
        <div class="sd-title">
          {{singer.name}}
        </div>
        <ul class="sd-fs">
          <li>

          </li>
          <li>
            粉丝数: 22.7 万
          </li>
          <li>

          </li>
        </ul>

        <div class="sd-btn">
          <div class="btn">
            关注
          </div>
          <div class="btn">
            勋章
          </div>
        </div>
      </div>
    </div>

    <ul class="sd-nav">
      <li>
        单曲 33
      </li>
      <li>
        专辑 5
      </li>
      <li>
        MV 31
      </li>
      <li>
        详情
      </li>
    </ul>

    <div class="sd-cont">
      <div class="sd-c-1">
        <div class="sd-c-search">
        </div>
        <music-list></music-list>
      </div>
    </div>
  </section>
</template>

<script>
import {getFSNum, getSingerDetail, getSinger} from 'api/singer'
import {mapGetters} from 'vuex'
import MusicList from 'components/music-list/music-list'
export default {
  components: {
    MusicList
  },
  data() {
    return {
      songList: null
    }
  },
  computed: {
    bgStyle() {
      return `background:url(${this.singer.avatar}) no-repeat; background-size: 100% auto`
    },
    ...mapGetters([
      'singer'
    ])
  },
  mounted() {
    console.log(this.singer)
  },
  methods: {
    back() {
      this.$router.go(-1)
    }
  },
  created() {
    getFSNum().then((res) => {
    //  console.log(res)
    })
    let mid = this.$route.params.id

    getSingerDetail(mid).then((res) => {
      let reg = new RegExp(`^ MusicJsonCallbacksinger_track\\(`)
      let reg2 = new RegExp('\\)$')
      res = res.replace(reg, '').replace(reg2, '')
      res = JSON.parse(res)
      this.songList = res.data.list
    })

    getSinger(mid).then((res) => {
      let parser = new DOMParser()
      let xmlDoc = parser.parseFromString(res, 'text/xml')

      let data = xmlDoc.getElementsByTagName('data')
      console.log(data)
    })
  }
}
</script>

<style lang="sass" scoped="" type="text/css">
  @import "../../common/scss/helpers/variables.scss";
  @import "../../common/scss/helpers/mixins.scss";
  @import "../../common/scss/base/base.scss";
  @import "../../common/scss/components/buttons.scss";

  .singer-detail
    width: 100%
    .sl-h
      width: 100%
      position: absolute
      left: 0
      @include px2rem(height, 80px)
      display: flex
      justify-content: space-between
      align-items: center
      z-index: 10
      .sl-h-nav
        @include px2rem(width, 100px)
        display: flex
        justify-content: center
        i
          color: #fff
          @include font-dpr(32px)
      p
        @include font-dpr(15px)
        color: #fffdfe
      .sl-h-r
        @include px2rem(width, 100px)
        display: flex
        justify-content: center
        i
          @include font-dpr(20px)
          color: #fff
    .sd-h
      @include px2rem(height, 500px)
      position: relative
      .sd-bg
        @include px2rem(height, 500px)
      .sd-cont
        width: 100%
        @include px2rem(height, 300px)
        position: absolute
        left: 0
        bottom: 0
        display: flex
        flex-direction: column
        justify-content: space-around
        .sd-title
          color: #fff
          @include font-dpr(30px)
          width: 100%
          text-align: center
        .sd-fs
          display: flex
          width: 100%
          @include px2rem(height, 70px)
          justify-content: center
          align-items: center
          li:nth-child(2)
            @include px2rem(padding-left, 28px)
            @include px2rem(padding-right, 28px)
          li:first-child,li:last-child
            @include px2rem(width, 130px)
            background-color: rgba(255, 255, 255, .7)
            @include px2rem(height, 2px)
          li
            @include font-dpr(16px)
            color: #fff
        .sd-btn
          width: 100%
          display: flex
          justify-content: center
          .btn
            @include px2rem(margin-right, 30px)
          .btn:last-child
            margin-right: 0
    .sd-nav
      display: flex
      width: 100%
      @include px2rem(height, 118px)
      box-sizing: border-box
      border-bottom: 2px solid #eaeaea
      li
        width: 25%
        color: #7f7f7f
        @include font-dpr(18px)
        display: flex
        justify-content: center
        align-items: center
</style>
