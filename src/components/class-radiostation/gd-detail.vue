<template>
<section class="gd-detail">
  <t-header :title="catName" @back="back"></t-header>
  <div class="gd-t">
    <p>{{catName}}</p>
    <div class="btn4">
      <i class="fa fa-play"></i>&nbsp;&nbsp;<span>随机播放</span>
    </div>
    <div class="gd-bg">
      <img :src="setBg" />
    </div>
  </div>
  <scroll class="gd-detail-cont" ref="songSheet">
    <div>
      <gd-list :rsList="rsList" :title="catName" @selectItem="selectItem"></gd-list>
    </div>
  </scroll>
</section>
</template>

<script>
import {mapGetters} from 'vuex'
import {getClassRsList} from 'api/radiostation'
import GdList from 'components/class-radiostation/gd-list'
import Scroll from 'base/scroll/scroll'
import THeader from 'base/t-header/t-header'
import {playlistMixin} from 'common/js/mixin'
export default {
  mixins: [playlistMixin],
  computed: {
    setBg() {
      return ''
    },
    ...mapGetters([
      'catName'
    ])
  },
  components: {
    GdList,
    Scroll,
    THeader
  },
  data() {
    return {
      rsList: [],
      index: 0,
      catid: 0,
      sortId: 5,
      sin: 0,
      ein: 29
    }
  },
  methods: {
    handlePlayList(playList) {
      const bottom = playList.length > 0 ? `1.3333333rem` : ''
      this.$refs.songSheet.$el.style.bottom = bottom
      this.$refs.songSheet.refresh()
    },
    back() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    selectItem(item, index) {
      this.$router.push({
        path: `/songlist/${item.dissid}`
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
      })
    }
  },
  created() {
    this.catid = this.$route.params.id
    this._getClassRsList(this.catid, this.sortId, this.sin, this.ein, 'search')
  }
}
</script>

  <style lang="sass" scoped="" type="text/css">
    @import "../../common/scss/helpers/variables.scss";
    @import "../../common/scss/helpers/function.scss";
    @import "../../common/scss/helpers/mixins.scss";
    @import "../../common/scss/base/base.scss";
    @import "../../common/scss/components/buttons.scss"

    .gd-detail
      position: fixed
      left: 0
      top: 0
      bottom: 0
      right: 0
      z-index: 1
      .sl-h
        width: 100%
        position: absolute
        left: 0
        @include px2rem(height, 80px)
        display: flex
        top: 0
        justify-content: space-between
        align-items: center
        z-index: 10
        .sl-h-nav
          @include px2rem(width, 100px)
          display: flex
          justify-content: center
          i
            color: #fff
            font-size: 64px; /*px*/
        p
          font-size: 30px; /*px*/
          color: #fffdfe
        .sl-h-r
          @include px2rem(width, 100px)
          display: flex
          justify-content: center
          i
            font-size: 40px; /*px*/
            color: #fff
      .gd-detail-cont
        width: 95%
        margin: 0 auto
        position: absolute
        bottom: 0
        left: 2.5%
        top: 400px
        overflow: hidden
      .gd-t
        width: 100%
        @include px2rem(height, 400px)
        background: #ccc
        position: relative
        overflow: hidden
        display: flex
        justify-content: center
        align-items: center
        p
          font-size: 60px; /*px*/
          color: #fff
        .btn4
          position: absolute
          bottom: 10%
          z-index: 2
          left: 50%
          transform: translateX(-50%)
        .gd-bg
          position: absolute
          left: 0
          top: 0
          z-index: 0
          img
            width: 100%
</style>
