<template>
  <section class="radio-station">
    <header class="rs-header">
      <div class="r-h-nav" @click="back">
        <i class="fa  fa-chevron-left"></i>
      </div>
      <p class="r-h-title">
        电台
      </p>
    </header>
    <scroll class="rs-cont">
      <div>
        <ul class="c-w-lis">
        <li :class="{cur: currentIndex === index}" v-for="(item, index) in rsList" @click="selectItem(index)">{{item.name}}</li>
      </ul>
        <div class="cw-c">
        <div class="cw-c-li" v-for="item in radioList">
          <div class="cwc-img">
            <img :src="item.radioImg" />
          </div>
          <p>
            {{item.radioName}}
          </p>
          <p>
            播放量：{{item.listenNum}} 万
          </p>
        </div>
      </div>
      </div>
    </scroll>
  </section>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import {getRadioStationList} from 'api/radiostation'
export default {
  components: {
    Scroll
  },
  data() {
    return {
      rsList: [],
      currentIndex: 0,
      radioList:[]
    }
  },
  created() {
    this._getRadioStationList()
  },
  methods: {
    selectItem(index) {
      this.currentIndex = index
    },
    _getRadioStationList() {
      getRadioStationList().then((res) => {
        let reg = new RegExp(`^MusicJsonCallback052271854983912514\\(`)
        let reg2 = new RegExp('\\)$')
        res = res.replace(reg, '').replace(reg2, '')
        res = JSON.parse(res)
        this.rsList = res.data.data.groupList
        this.radioList = this.rsList[this.currentIndex].radioList
        console.log(this.rsList)
      })
    },
    back() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  },
  watch: {
    currentIndex(newIndex) {
      this.radioList = this.rsList[newIndex].radioList
    }
  }
}
</script>

  <style lang="sass" scoped="" type="text/css">
    @import "../../common/scss/helpers/variables.scss";
    @import "../../common/scss/helpers/mixins.scss";
    @import "../../common/scss/base/base.scss";

    .radio-station
      position: fixed
      width: 100%
      left: 0
      right: 0
      bottom: 0
      top: 0
      .rs-header
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
      .rs-cont
        position: absolute
        @include px2rem(top, 86px)
        width: 100%
        bottom: 0
        .c-w-lis
          display: flex
          border-bottom: 2px solid #ededed
          flex-wrap: wrap
          li
            @include px2rem(height, 70px)
            @include px2rem(width, 110px)
            text-align: center
            @include px2rem(line-height, 70px)
          li.cur
            color: #81a395
        .cw-c
          display: flex
          flex-wrap: wrap
          justify-content: space-between
          .cw-c-li
            @include px2rem(width, 240px)
            @include px2rem(padding-bottom, 30px)
            .cwc-img
              @include px2rem(height, 240px)
              @include px2rem(width, 240px)
              img
                width: 100%
            p:nth-child(2)
              width: 90%
              margin: 0 auto
              font-size: 28px; /*px*/
              @include px2rem(line-height, 60px)
            p:nth-child(3)
              width: 90%
              margin: 0 auto
              font-size: 24px; /*px*/
              color: #999
</style>
