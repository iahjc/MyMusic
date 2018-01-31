<template>
  <section class="c-list">
    <div class="c-l-t">
      <div class="cl-m">
        <span class="cur">自建歌单</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span>收藏歌单</span>
      </div>
      <ul class="cl-r">
        <li @click="createNewGd">
          <i class="fa fa-plus"></i>
        </li>
        <li>
          <i class="fa fa-th-list"></i>
        </li>
      </ul>
    </div>

    <div class="c-l-cont">
      <div class="c-gd" @click="createNewGd">
        <ul>
          <li>
            <span></span>
          </li>
          <li>新建歌单</li>
          <li>
            <i class="fa fa-chevron-right"></i>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    createNewGd() {
      this.$emit('createNewGd')
    }
  }
}
</script>

  <style lang="sass" scoped="" type="text/css">
    @import "../../common/scss/helpers/variables.scss";
    @import "../../common/scss/helpers/mixins.scss";
    @import "../../common/scss/base/base.scss";
    .c-list
      width: 100%
      @include px2rem(margin-top, 10px)
      position: relative
      .c-l-t
        @include px2rem(height, 100px)
        position: relative
        background: #fff
        .cl-m
          height: 100%
          display: flex
          align-items: center
          justify-content: center
          color: #6b6b6b
          span
            @include font-dpr(15px)
          span.cur
            color: #000
        .cl-r
          display: flex
          position: absolute
          right: 0
          top: 0
          height: 100%
          align-items: center
          @include px2rem(right, 20px)
          li
            @include px2rem(width, 60px)
            @include px2rem(height, 60px)
            display: flex
            justify-content: center
            align-items: center
            i
              @include font-dpr(16px)
      .c-l-cont
        width: 100%
        @include px2rem(margin-top, 4px)
        background: #fff
        .c-gd
          ul
            display: flex
            align-items: center
            li
              @include px2rem(height, 120px)
            li:nth-child(3)
              @include px2rem(width, 80px)
              @include px2rem(height, 80px)
              display: flex
              justify-content: center
              align-items: center
              i
                color: #808080
                @include font-dpr(15px)
            li:nth-child(2)
              @include font-dpr(15px)
              display: flex
              align-items: center
              @include px2rem(margin-left, 20px)
              flex: 1
            li:first-child
              @include px2rem(width, 120px)
              @include px2rem(width, 120px)
              background: #f7f7f7
              display: flex
              justify-content: center
              align-items: center
              span
                display: block
                @include px2rem(width, 36px)
                @include px2rem(height, 2px)
                background: #5eba93
                &::before
                  content: ''
                  display: block
                  @include px2rem(width, 36px)
                  @include px2rem(height, 2px)
                  transform: rotate(90deg)
                  background: #5eba93
</style>
