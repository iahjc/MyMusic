<template>
  <section class="music-list">
    <div class="ml-t">
      <div class="ml-t-l">
        <i class="fa fa-play-circle-o"></i>&nbsp;&nbsp;<span>全部播放</span>
      </div>
      <ul>
        <li>
          <i class="fa fa-download"></i>&nbsp;&nbsp;<span>下载</span>&nbsp;&nbsp;
        </li>
        <li>
          <i class="fa fa-list"></i>&nbsp;&nbsp;<span>多选</span>
        </li>
      </ul>
    </div>

    <div class="ml-list">
      <div class="ml-li" v-for="(item, index) in songList" @click="selectItem(item, index)">
        <div class="ml-l">
          <div class="ml-l-title">
            <p>{{item.name}}</p>&nbsp;&nbsp;<span class="icon1">SQ</span>&nbsp;&nbsp;<span class="icon1" v-show="item.isOnly === 1">独家</span>
          </div>
          <p class="ml-des">{{item.des}}</p>
        </div>
        <div class="ml-m">
          <span class="icon2" v-show="item.isMv">MV</span>
        </div>
        <div class="ml-r">
          <i class="fa fa-ellipsis-h"></i>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    songList: {
      type: Array,
      default: null
    }
  },
  created() {
    console.log(this.songList)
  },
  methods: {
    selectItem(item, index) {
      this.$emit('selectSingerMusic', item, index)
    }
  }
}
</script>

<style lang="sass" scoped="" type="text/css">
  @import "../../common/scss/helpers/variables.scss";
  @import "../../common/scss/helpers/mixins.scss";
  @import "../../common/scss/base/base.scss";
  @import "../../common/scss/components/buttons.scss";

  .music-list
    width: 100%
    .ml-t
      @include px2rem(width, 700px)
      @include px2rem(height, 98px)
      display: flex
      justify-content: space-between
      align-items: center
      margin: 0 auto
      .ml-t-l
        display: flex
        align-items: center
      i
        color: #62bd82
        @include font-dpr(20px)
      span
        @include font-dpr(16px)
      ul
        display: flex
        li
          display: flex
          align-items: center
    .ml-list
      width: 100%
      .ml-li
        padding-left: 3%
        padding-right: 4%
        @include px2rem(height, 100px)
        border: 1px solid #f2f2f2
        display: flex
        align-items: center
        box-sizing: border-box
        justify-content: space-between
        .ml-l
          .ml-l-title
            display: flex
            @include font-dpr(14px)
            @include px2rem(line-height, 45px)
            align-items: center
            p
              display: inline-block
              @include px2rem(max-width,450px)
              @include px2rem(height, 45px)
              overflow: hidden
            span.icon1
              border-color: #d5b489
              color: #d5b489
            span:nth-child(3)
              color: #6ac292
              border-color: #6ac292
          p.ml-des
            @include font-dpr(10px)
            color: #595959
            @include px2rem(width, 600px)
            @include px2rem(height, 24px)
            overflow: hidden
        .ml-r
          i
            @include font-dpr(4px)
            color: #9f9f9f
</style>
