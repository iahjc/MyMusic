<template>
  <section class="crt-gd">
    <header class="crt-header">
      <div class="r-h-nav" @click="back">
        <i class="fa  fa-chevron-left"></i>
      </div>
      <p class="r-h-title">
        分类歌单
      </p>
    </header>
    <scroll class="crt-cont">
      <div>
        <h2>{{theme.categoryGroupName}}</h2>
        <ul class="crt-cat">
          <li v-for="item in theme.items" @click="toGdDetail(item)">
            {{item.categoryName}}
          </li>
        </ul>
        <div class="btn3" @click="showCateList">
          查看全部分类 >
        </div>
        <gd-list :rsList="rsList" @selectItem="selectItem"></gd-list>
      </div>
    </scroll>
    <category-list :categories="categories" ref="catelist"></category-list>
  </section>
</template>

<script>
import {mapMutations} from 'vuex'
import {getClassRs, getClassRsList} from 'api/radiostation'
import GdList from 'components/class-radiostation/gd-list'
import Scroll from 'base/scroll/scroll'
import CategoryList from 'components/category-list/category-list'
export default {
  components: {
    GdList,
    Scroll,
    CategoryList
  },
  data() {
    return {
      categories: [],
      theme: {},
      rsList: {}
    }
  },
  created() {
    this._getClassRs()
    this._getClassRsList()
  },
  methods: {
    showCateList() {
      this.$refs.catelist.show()
    },
    ...mapMutations({
      'setCatName': 'SET_CATNAME'
    }),
    toGdDetail(item) {
      this.$router.push({
        path: `/gddetail/${item.categoryId}`
      })
      this.setCatName(item.categoryName)
    },
    selectItem(item, index) {
      this.$router.push({
        path: `/songlist/${item.dissid}`
      })
    },
    back() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    _getClassRs() {
      getClassRs().then((res) => {
        let reg = new RegExp(`^getPlaylistTags\\(`)
        let reg2 = new RegExp('\\)$')
        res = res.replace(reg, '').replace(reg2, '')
        res = JSON.parse(res)
        this.categories = res.data.categories
        this.theme = this.categories[3]
        console.log(this.categories)
        console.log(res)
      })
    },
    _getClassRsList() {
      let catid = 165
      getClassRsList(catid).then((res) => {
        let reg = new RegExp(`^getPlaylist\\(`)
        let reg2 = new RegExp('\\)$')
        res = res.replace(reg, '').replace(reg2, '')
        res = JSON.parse(res)
        this.rsList = res.data
        console.log(this.rsList)
      })
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
    .crt-gd
      position: fixed
      left: 0
      top: 0
      bottom: 0
      right: 0
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
      .crt-cont
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
        .crt-cat
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
