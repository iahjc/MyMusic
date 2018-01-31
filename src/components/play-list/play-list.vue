<template>
  <section class="play-list" v-show="showFlag">
    <div class="pl-t">
      <div class="pl-t-mode">
        <i class="fa fa-refresh"></i>&nbsp;&nbsp;<span>单曲循环</span>
      </div>
      <ul class="pl-c">
        <li>
          <i class="fa fa-download"></i>
        </li>
        <li>
          <i class="fa fa-plus"></i>
        </li>
        <li>
          <i class="fa fa-trash-o"></i>
        </li>
      </ul>
    </div>
    <div class="pl-cur">
      <div class="pl-li" v-for="item in playList">
        <div class="pl-li-t">
          <span>{{item.name}}</span>&nbsp;&nbsp;-&nbsp;&nbsp;<span>{{item.singer}}</span>
        </div>
        <ul class="pl-cor">
          <li>
            <i>ani</i>
          </li>
          <li>
            <i class="fa fa-heart-o"></i>
          </li>
          <li>
            <i class="fa fa-times"></i>
          </li>
        </ul>
      </div>
    </div>

    <div class="pl-close" @click="closePlayList">
      关闭
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
  props: {
    playList: {
      type: Array,
      default: []
    }
  },
  methods: {
    show() {
      this.showFlag = true
    },
    hide() {
      this.showFlag = false
    },
    closePlayList() {
      this.$emit('closePlayList')
    }
  },
  created() {
    console.log(this.playList)
  }
}
</script>

  <style lang="sass" scoped="" type="text/css">
    @import "../../common/scss/helpers/variables.scss";
    @import "../../common/scss/helpers/mixins.scss";
    @import "../../common/scss/base/base.scss";

    .play-list
      position: absolute
      @include px2rem(height, 930px)
      background: rgba(0, 0, 0, .9)
      width: 100%
      bottom: 0
      z-index: 11111
      color: #fff
      .pl-t
        @include px2rem(height, 100px)
        box-sizing: border-box
        padding-left: 5%
        padding-right: 5%
        display: flex
        align-items: center
        justify-content: space-between
        @include px2rem(border-bottom-width, 2px)
        border-color: #4d3932
        border-style: solid
        .pl-t-mode
          @include font-dpr(17px)
          i
            color: #917f7b
        .pl-c
          display: flex
          li
            @include px2rem(width, 60px)
            @include px2rem(height, 60px)
            display: flex
            align-items: center
            justify-content: center
            @include px2rem(margin-right, 20px)
            i
              @include font-dpr(20px)
          li:last-child
            margin-right: 0
      .pl-cur
        width: 95%
        @include px2rem(height, 700px)
        overflow: hidden
        .pl-li
          @include px2rem(height, 75px)
          align-items: center
          justify-content: space-between
          display: flex
          @include px2rem(border-bottom-width, 2px)
          border-color: #4d3932
          border-style: solid
          .pl-li-t
            display: flex
            @include font-dpr(11px)
            color: #80756d
            span:first-child
              @include font-dpr(15px)
              color: #fff
            span:nth-child(2)
            span:nth-child(3)
          .pl-cor
            display: flex
            li
              @include px2rem(width, 60px)
              @include px2rem(height, 60px)
              display: flex
              justify-content: center
              align-items: center
              i
                @include font-dpr(17px)
                color: #978d8c
      .pl-close
        width: 100%
        position: absolute
        bottom: 0
        @include px2rem(height, 100px)
        color: #ff
        display: flex
        justify-content: center
        align-items: center
        @include font-dpr(18px)
</style>
