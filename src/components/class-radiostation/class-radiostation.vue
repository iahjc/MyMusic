<template>
  <section class="crt-gd">
    <t-header :title="title" :bgColor="bgColor" :rFlag="false" @back="back"></t-header>
    <scroll class="crt-cont"
            ref="scroll"
            :data="rsList"
            :pullup="pullup"
            :beforeScroll="beforeScroll"
            @scrollToEnd="searchMore"
            @beforeScroll="listScroll"
    >
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
        <gd-list :rsList="rsList" @selectMenuItem="selectMenuItem" @selectItem="selectItem"></gd-list>
        <div :class="$style.loading" v-show="hasMore">
          <loading :isShow="true" :msg="msg"></loading>
        </div>
      </div>
    </scroll>
    <category-list :categories="categories" ref="catelist" @selectCate="toGdDetail"></category-list>
  </section>
</template>

<script>
import {mapMutations} from 'vuex'
import {getClassRs, getClassRsList} from 'api/radiostation'
import GdList from 'components/class-radiostation/gd-list'
import Scroll from 'base/scroll/scroll'
import CategoryList from 'components/category-list/category-list'
import THeader from 'base/t-header/t-header'
import Loading from 'base/loading/loading'

const perpage = 30
export default {
  components: {
    GdList,
    Scroll,
    CategoryList,
    THeader,
    Loading
  },
  data() {
    return {
      categories: [],
      theme: {},
      rsList: [],
      title: '分类歌单',
      bgColor: '#5fba7f',
      msg: '正在载入....',
      pullup: true,
      beforeScroll: true,
      hasMore: false,
      sin: 0,
      ein: 29,
      sortId: 5,
      categoryId: 10000000
    }
  },
  created() {
    this._getClassRs()
    this.hasMore = true
    this._getClassRsList(this.categoryId, this.sortId, this.sin, this.ein, 'search')
  },
  methods: {
    refresh() {
      this.$refs.scroll.refresh()
    },
    selectMenuItem(item, index, ev) {
      if (this.sortId !== item.sortid) {
        this.sortId = item.sortid
      }
    },
    showCateList() {
      this.$refs.catelist.show()
    },
    searchMore() {
      this.hasMore = false

      this._getClassRsList(this.categoryId, this.sortId, this.ein, this.ein + 30, 'searchMore')

    },
    listScroll() {
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
    _getClassRsList(catid, sortId, sin, ein, type) {
      getClassRsList(catid, sortId, sin, ein).then((res) => {
        let reg = new RegExp(`^getPlaylist\\(`)
        let reg2 = new RegExp('\\)$')
        res = res.replace(reg, '').replace(reg2, '')
        res = JSON.parse(res)
        if (type === 'search') {
          this.rsList = res.data.list
        } else if (type === 'searchMore') {
          this.rsList = this.rsList.concat(res.data.list)
        }
        this.sin = res.data.sin
        this.ein = res.data.ein
        this.hasMore = false
        console.log(this.rsList)
      })
    }
  },
  watch: {
    sortId(newSortId) {
      this.rsList = []
      this._getClassRsList(this.categoryId, newSortId, 0, 29, 'search')
    }
  }
}
</script>
<style lang="sass" scoped="" type="text/css" module>
  .loading
    width: 100%
    display: flex
    justify-content: center
  </style>

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
      .crt-cont
        width: 95%
        left: 2.5%
        position: absolute
        top: 86px
        bottom: 0
        overflow: hidden
        h2
          height: 100px
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
            height: 72px
            margin-bottom: 12px
            background: #f7f7f7
</style>
