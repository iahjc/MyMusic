<template>
<section class="song-list" v-show="detas">
  <header class="sl-h">
    <div class="sl-h-nav">
      <i class="fa fa-angle-left"></i>
    </div>
    <p>
      歌单
    </p>
    <div class="sl-h-r">
       <i class="fa fa-ellipsis-h"></i>
    </div>
  </header>
  <div class="sl-c">
    <div class="sl-c-bg">
      <img :src="detas.logo" />
      <div></div>
    </div>
    <div class="sl-z">
      <div class="sl-z-img">
        <img :src="detas.logo" />
      </div>
      <div class="sl-z-c">
        <h2>{{detas.dissname}}</h2>
        <div class="sl-z-a">
          <div class="sl-z-a-i">
            <img :src="detas.headurl" />
            <img :src="detas.ifpicurl" />
          </div><span>{{detas.nickname}}</span>
        </div>
        <p>
          简介: {{detas.desc}}
        </p>
      </div>
    </div>
    <ul class="sl-b">
      <li>
        <i class="fa fa-heart-o"></i>&nbsp;&nbsp;<span>{{coll.totalnum}}</span>
      </li>
      <li>
        <i class="fa fa-commenting-o"></i>&nbsp;&nbsp;<span>2</span>
      </li>
      <li>
        <i class="fa fa-share-square-o"></i>&nbsp;&nbsp;<span>分享</span>
      </li>
    </ul>
  </div>
  <music-list :songList="songList"></music-list>
</section>
</template>

<script>
import {
  getSongList,
  getCollectionNum
} from 'api/musichall'
import MusicList from 'components/music-list/music-list'

export default {
  components: {
    MusicList
  },
  data() {
    return {
      detas: {},
      coll: {},
      songList: null
    }
  },
  created() {
    this._getSongList()
    this._getCollectionNum()
  },
  methods: {
    _getCollectionNum() {
      let disstid = this.$route.params.id
      getCollectionNum(disstid).then((res) => {
        // 使用正则处理
        let reg = new RegExp(`^getFavNum${disstid}\\(`)
        let reg2 = new RegExp('\\)$')
        res = res.replace(reg, '').replace(reg2, '')
        this.coll = JSON.parse(res)
      })
    },
    _getSongList() {
      let disstid = this.$route.params.id
      getSongList(disstid).then((res) => {
        if (res.code === 0) {
          this.detas = res.cdlist[0]
          this.songList = res.cdlist[0].songlist
        }
      }).then((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="sass" scoped="" type="text/css">
  @import "../../common/scss/helpers/variables.scss";
  @import "../../common/scss/helpers/mixins.scss";
  @import "../../common/scss/helpers/function.scss";
  @import "../../common/scss/base/base.scss";

  .song-list
    width: 100%
    position: relative
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
    .sl-c
      @include px2rem(height, 520px)
      display: flex
      justify-content: center
      align-items: center
      flex-direction: column
      position: relative
      overflow: hidden
      .sl-c-bg
        width: 100%
        height: 100%
        position: absolute
        img
          width: 100%
          height: 100%
          filter: blur(90px)
        div
          width: 100%
          height: 100%
          background-color: rgba(0, 0, 0, .2)
          position: absolute
          left: 0
          top: 0
          z-index: 1
      .sl-z
        position: relative
        z-index: 10
        display: flex
        align-items: center
        overflow: hidden
        @include px2rem(height, 250px)
        .sl-z-img
          @include px2rem(width, 250px)
          @include px2rem(height, 250px)
          img
            width: 100%
            height: 100%
        .sl-z-c
          @include px2rem(width, 382px)
          @include px2rem(margin-left, 24px)
          h2
            @include font-dpr(17px)
            @include px2rem(line-height, 38px)
            @include px2rem(width, 320px)
            color: #fff3f7
          .sl-z-a
            @include px2rem(height, 52px)
            display: flex
            align-items: center
            @include px2rem(margin-top, 24px)
            @include px2rem(margin-bottom, 24px)
            .sl-z-a-i
              @include px2rem(width, 52px)
              @include px2rem(height, 52px)
              @include px2rem(margin-right, 10px)
              position: relative
              img
                width: 100%
                border-radius: 300px
              img:last-child
                @include px2rem(width, 15px)
                @include px2rem(height, 16px)
                position: absolute
                right: 0
                bottom: 0
            span
              @include font-dpr(12px)
              color: #f9f1ef
        p
          text-overflow: ellipsis
          @include px2rem(height, 32px)
          @include px2rem(line-height, 32px)
          overflow: hidden
          @include font-dpr(13px)
          color: #fff8f0
      .sl-b
        display: flex
        color: #fcfcfe
        position: absolute
        bottom: 6%
        z-index: 1000
        width: 100%
        justify-content: space-between
        @include px2rem(width, 650px)
        li
          @include px2rem(height, 36px)
          display: flex
          align-items: center
          i
            @include font-dpr(18px)
</style>
