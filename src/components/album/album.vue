<template>
  <section class="album">
    <header class="album-header">
      <div class="r-h-nav" @click="back">
        <i class="fa  fa-chevron-left"></i>
      </div>
      <p class="r-h-title">
        数字专辑
      </p>
    </header>
    <scroll class="album-cont">
      <div>
        <h2>地区</h2>
        <ul class="album-cat">
          <li v-for="item in area">
            {{item.name}}
          </li>
        </ul>
        <div class="btn3">
          查看全部分类 >
        </div>
        <album-list :albumList="albumList" @selectItem="selectItem"></album-list>
      </div>
    </scroll>
  </section>
</template>

<script>
import {mapMutations} from 'vuex'
// import {getMvType} from 'api/mv'
import {getAlbumType} from 'api/album'
import AlbumList from 'components/album-list/album-list'
import Scroll from 'base/scroll/scroll'

export default {
  components: {
    AlbumList,
    Scroll
  },
  data() {
    return {
      categories: [],
      albumList: [],
      area: []
    }
  },
  created() {
    this._getAlbumType()
  },
  methods: {
    _getAlbumType() {
      getAlbumType().then((res) => {
        let reg = new RegExp(`^getUCGI17417625182878815\\(`)
        let reg2 = new RegExp('\\)$')
        res = res.replace(reg, '').replace(reg2, '')
        res = JSON.parse(res)
        this.area = res.albumlib.data.tags.area
        this.albumList = res.albumlib.data.list
        console.log(this.area)
        console.log(this.albumList)
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
    .album
      position: fixed
      left: 0
      top: 0
      bottom: 0
      right: 0
      .album-header
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
      .album-cont
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
        .album-cat
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
