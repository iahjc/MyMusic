<template>
<section class="gd-detail">
  <header class="sl-h">
    <div class="sl-h-nav" @click="back">
      <i class="fa fa-angle-left"></i>
    </div>
    <p></p>
    <div class="sl-h-r">
      <i class="fa fa-share-alt"></i>
    </div>
  </header>
  <div class="gd-t">
    <p>{{catName}}</p>
    <div class="btn4">
      <i class="fa fa-play"></i>&nbsp;&nbsp;<span>随机播放</span>
    </div>
    <div class="gd-bg">
      <img :src="setBg" />
    </div>
  </div>
  <div class="gd-detail-cont">
    <gd-list :rsList="rsList" :title="catName" @selectItem="selectItem"></gd-list>
  </div>
</section>
</template>

<script>
import {mapGetters} from 'vuex'
import {getClassRsList} from 'api/radiostation'
import GdList from 'components/gd-list/gd-list'
export default {
  computed: {
    setBg() {
      return ''
    },
    ...mapGetters([
      'catName'
    ])
  },
  components: {
    GdList
  },
  data() {
    return {
      rsList: {},
      index: 0
    }
  },
  methods: {
    back() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    selectItem(item, index) {
    }
  },
  created() {
    let catid = this.$route.params.id
    getClassRsList(catid).then((res) => {
      let reg = new RegExp(`^getPlaylist\\(`)
      let reg2 = new RegExp('\\)$')
      res = res.replace(reg, '').replace(reg2, '')
      res = JSON.parse(res)
      console.log(res)
      this.rsList = res.data
    })
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
            @include font-dpr(32px)
        p
          @include font-dpr(15px)
          color: #fffdfe
        .sl-h-r
          @include px2rem(width, 100px)
          display: flex
          justify-content: center
          i
            @include font-dpr(20px)
            color: #fff
      .gd-detail-cont
        width: 95%
        margin: 0 auto
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
          @include font-dpr(30px)
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
