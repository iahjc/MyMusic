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
        <li @click="manageSongSheets">
          <i class="fa fa-th-list"></i>
        </li>
      </ul>
    </div>

    <div class="c-l-cont">
      <div class="c-gd" @click="createNewGd" v-show="songSheets.length <= 0">
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
      <div class="c-li" v-for="item in songSheets" @click="selectItems(item)">
        <ul>
          <li>
            <div class="c-mr">
              <i class="fa fa-music"></i>
            </div>
          </li>
          <li>
            <p>
              {{item.songSheetName}}
            </p>
            <p>
              共 {{item.songsNum}} 首
            </p>
          </li>
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
  props: {
    songSheets: {
      type: Array,
      default: []
    }
  },
  methods: {
    selectItems(item) {
      this.$emit('selectItems', item)
    },
    manageSongSheets() {
      this.$emit('manageSongSheets')
    },
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
        .c-li
          width: 100%
          @include px2rem(border-bottom-width, 2px)
          border-color: #f9f9f9
          border-style: solid
          ul
            display: flex
            align-items: center
            li
              @include px2rem(height, 120px)
            li:first-child
              @include px2rem(height, 120px)
              @include px2rem(width, 120px)
              background: #ececec
              display: flex
              justify-content: center
              align-items: center
              .c-mr
                @include px2rem(width, 70px)
                @include px2rem(height, 70px)
                border-radius: 100%
                overflow: hidden
                @include px2rem(border-width, 4px)
                border-color: #d6d6d6
                border-style: solid
                display: flex
                align-items: center
                justify-content: center
                i
                  @include font-dpr(16px)
                  color: #d6d6d6
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
              flex: 1
              display: flex
              justify-content: center
              flex-direction: column
              @include font-dpr(15px)
              box-sizing: border-box
              @include px2rem(padding-left, 20px)
              p:first-child
                @include font-dpr(15px)
                @include px2rem(line-height, 45px)
                color: #444
              p:last-child
                @include font-dpr(12px)
                @include px2rem(line-height, 38px)
                color: #bdbdbd
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
