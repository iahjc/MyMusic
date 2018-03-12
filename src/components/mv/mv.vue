<template>
  <section class="mv-gd">
    <header class="mv-header">
      <div class="r-h-nav" @click="back">
        <i class="fa  fa-chevron-left"></i>
      </div>
      <p class="r-h-title">
        视频MV
      </p>
    </header>
    <scroll class="mv-cont">
      <div>
        <h2>地区</h2>
        <ul class="mv-cat">
          <li v-for="item in categories">
            {{item.title}}
          </li>
        </ul>
        <div class="btn3">
          查看全部分类 >
        </div>
        <mv-list :mvList="mvList" @selectItem="selectItem"></mv-list>
      </div>
    </scroll>
  </section>
</template>

<script>
import {mapMutations} from 'vuex'
import {getMvType} from 'api/mv'
import MvList from 'components/mv-list/mv-list'
import Scroll from 'base/scroll/scroll'

export default {
  components: {
    MvList,
    Scroll
  },
  data() {
    return {
      categories: [],
      mvList: []
    }
  },
  created() {
    this._getMvType()
  },
  methods: {
    _getMvType() {
      getMvType().then((res) => {
        let reg = new RegExp(`^getMvlist\\(`)
        let reg2 = new RegExp('\\)$')
        res = res.replace(reg, '').replace(reg2, '')
        res = JSON.parse(res)
        this.categories = res.data.taglist.area
        this.mvList = res.data.mvlist
      })
    },
    ...mapMutations({
      'setCatName': 'SET_CATNAME'
    }),
    selectItem(item, index) {
      this.$router.push({
        path: `/songlist/${item.dissid}`
      })
    },
    back() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
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
    .mv-gd
      position: fixed
      left: 0
      top: 0
      bottom: 0
      right: 0
      .mv-header
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
      .mv-cont
        width: 95%
        left: 2.5%
        position: absolute
        @include px2rem(top, 86px)
        bottom: 0
        overflow: hidden
        h2
          @include px2rem(height, 100px)
          font-size: 32px; /*px*/
          display: flex
          align-items: center
        .mv-cat
          width: 100%
          display: flex
          flex-wrap: wrap
          justify-content: space-between
          li
            width: 32%
            display: flex
            align-items: center
            justify-content: center
            @include px2rem(height, 72px)
            @include px2rem(margin-bottom, 12px)
            background: #f7f7f7
</style>
