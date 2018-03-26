<template>
<section class="gd-detail">
  <t-header :title="catName" @back="back" @selectRightMenu="selectRightMenu"></t-header>
  <div class="gd-t">
    <p>{{catName}}</p>
    <div class="btn4">
      <i class="fa fa-play"></i>&nbsp;&nbsp;<span>随机播放</span>
    </div>
    <div class="gd-bg" :style="setBg">
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
import {mapGetters, mapMutations} from 'vuex'
import {getClassRsList} from 'api/radiostation'
import GdList from 'components/class-radiostation/gd-list'
import Scroll from 'base/scroll/scroll'
import THeader from 'base/t-header/t-header'
import {playlistMixin} from 'common/js/mixin'
export default {
  mixins: [playlistMixin],
  computed: {
    setBg() {
      return `background-image: url(${this.imgURL})`
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
      ein: 29,
      imgURL: ''
    }
  },
  methods: {
    handlePlayList(playList) {
      const bottom = playList.length > 0 ? `1.3333333rem` : ''
      this.$refs.songSheet.$el.style.bottom = bottom
      this.$refs.songSheet.refresh()
    },
    ...mapMutations({
      setAuxiliaryList: 'SET_AUXILIARYLIST',
      setAuxiliaryState: 'SET_AUXILIARYSTATE',
      setAuxiliaryActions: 'SET_AUXILIARYACTIONS',
      setShareState: 'SET_SHARESTATE'
    }),
    selectRightMenu() {
      let list = [
        {
          title: '分享',
          icon: 'share-alt',
          action: this.openShare,
          showFlag: true
        }
      ]
      let actions = [
        {
          action: this.closeAuxiliary
        }
      ]
      this.setAuxiliaryActions(actions)
      this.setAuxiliaryList(list)
      this.setAuxiliaryState(true)
    },
    openShare() {
      let list = [
        {
          title: '微信好友',
          icon: 'weixin',
          action: '',
          showFlag: true
        },
        {
          title: '朋友圈',
          icon: 'fonticons',
          action: '',
          showFlag: true
        },
        {
          title: 'QQ',
          icon: 'qq',
          action: '',
          showFlag: true
        },
        {
          title: '新浪微博',
          icon: 'weibo',
          action: '',
          showFlag: true
        },
        {
          title: 'github',
          icon: 'github',
          action: '',
          showFlag: true
        },
        {
          title: '推特',
          icon: 'twitter',
          action: '',
          showFlag: true
        }
      ]
      this.setAuxiliaryState(false)
      setTimeout(() => {
        this.setAuxiliaryList(list)
        this.setAuxiliaryState(true)
      }, 300)
    },
    closeAuxiliary() {
      this.setAuxiliaryState(false)
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
        this.imgURL = this.rsList[8].imgurl
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
        height: 80px
        display: flex
        top: 0
        justify-content: space-between
        align-items: center
        z-index: 10
        .sl-h-nav
          width: 100px
          display: flex
          justify-content: center
          i
            color: #fff
            font-size: 64px; /*px*/
        p
          font-size: 30px; /*px*/
          color: #fffdfe
        .sl-h-r
          width: 100px
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
        height: 400px
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
          width: 100%
          bottom: 0
          background-size: cover
</style>
