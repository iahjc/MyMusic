<template>
<transition name="catelist">
  <section class="category-list" v-show="showFlag">
    <header class="crt-header">
      <div class="r-h-nav" @click="back">
        <i class="fa  fa-chevron-left"></i>
      </div>
      <p class="r-h-title">
        全部分类
      </p>
    </header>
    <scroll class="cli-wrapper" :data="categories">
      <div>
        <div class="cli-cates">
          <div v-for="item in categories" class="cates-ul">
            <div class="cates-title">
              <span>{{item.categoryGroupName}}</span>
            </div>
            <ul class="cates-lis">
              <li v-for="cate in item.items" v-html="cate.categoryName">
              </li>
            </ul>
          </div>
        </div>
      </div>
    </scroll>
  </section>
</transition>
</template>

<script>
import Scroll from 'base/scroll/scroll'
export default {
  components: {
    Scroll
  },
  data() {
    return {
      showFlag: false
    }
  },
  props: {
    categories: {
      type: Array,
      default: []
    }
  },
  created() {
    console.log(this.categories)
  },
  methods: {
    show() {
      this.showFlag = true
    },
    back() {
      this.showFlag = false
    }
  }
}
</script>

  <style lang="sass" scoped="" type="text/css">
    @import "../../common/scss/helpers/variables.scss";
    @import "../../common/scss/helpers/function.scss";
    @import "../../common/scss/helpers/mixins.scss";
    @import "../../common/scss/base/base.scss";
    @import "../../common/scss/components/buttons.scss"

    .catelist-enter,.catelist-leave-to
      transform: translateY(100%)
    .catelist-enter-active
      transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0)
    .catelist-leave-active
      transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0)

    .category-list
      position: fixed
      z-index: 1111
      background: #f4f4f4
      left: 0
      top: 0
      right: 0
      bottom: 0
      overflow: hidden
      .crt-header
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
          font-size: 30px; /*px*/
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
            font-size: 36px; /*px*/
      .cli-wrapper
        @include px2rem(top, 86px)
        position: absolute
        height: 800px
        left: 0
        width: 100%
        overflow: hidden
        .cli-cates
        @include px2rem(top, 86px)
        position: absolute
        .cates-ul
          width: 100%
          display: flex
          @include px2rem(margin-top, 12px)
          .cates-title
            @include px2rem(width,  168px)
            background: #fff
            @include px2rem(margin-right, 2px)
            display: flex
            justify-content: center
            align-items: center
            font-size: 28px; /*px*/
            color: #656565
          .cates-lis
            flex: 1
            display: flex
            flex-wrap: wrap
            justify-content: space-between
            li
              display: flex
              justify-content: center
              align-items: center
              width: 33%
              @include px2rem(margin-bottom, 2px)
              @include px2rem(height, 82px)
              background: #fff
              font-size: 28px; /*px*/
              color: #000000
</style>
