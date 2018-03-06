<template>
<transition name="catelist">
  <section class="category-list" v-show="showFlag">
    <t-header :title="title" :bgColor="bgColor" @back="back" :rFlag="false"></t-header>
    <div class="cli-cates">
      <div v-for="item in categories" class="cates-ul">
        <div class="cates-title">
          <span>{{item.categoryGroupName}}</span>
        </div>
        <ul class="cates-lis">
          <li v-for="cate in item.items" v-html="cate.categoryName" @click="selectItem(cate)">
          </li>
        </ul>
      </div>
    </div>
  </section>
</transition>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import THeader from 'base/t-header/t-header'
export default {
  components: {
    Scroll,
    THeader
  },
  data() {
    return {
      showFlag: false,
      title: '全部分类',
      bgColor: '#64be81'
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
    selectItem(cate) {
      this.$emit('selectCate', cate)
    },
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
      transform: translateX(100%)
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
        height: 86px
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
          width: 80px
          text-align: center
          i
            font-size: 36px; /*px*/
      .cli-cates
        width: 100%
        position: absolute
        top: 86px
        bottom: 0
        overflow-y: scroll
        .cates-ul
          width: 100%
          display: flex
          margin-top: 12px
          .cates-title
            width: 168px
            background: #fff
            margin-right: 2px
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
              margin-bottom: 2px
              height: 82px
              background: #fff
              font-size: 28px; /*px*/
              color: #000000
</style>
