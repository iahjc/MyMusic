<template>
  <section class="radio-station">
    <t-header :title="title" :bgColor="bgColor" :rFlag="false"></t-header>
    <scroll class="rs-cont">
      <div>
        <ul class="c-w-lis">
          <li :class="{cur: currentIndex === index}" v-for="(item, index) in rsList" @click="selectItem(index)">{{item.name}}</li>
        </ul>
        <div class="cw-c">
          <radio-item :item="item" v-for="(item, index) in radioList" :key="index" @selectItem="playSongs" :cname="$style.cname"></radio-item>
        </div>
      </div>
    </scroll>
  </section>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import {getRadioStationList, getSongs} from 'api/radiostation'
import { createSong } from 'domain/song'
import {mapActions} from 'vuex'
import RadioItem from 'base/radio-item/radio-item'
import THeader from 'base/t-header/t-header'
export default {
  components: {
    Scroll,
    RadioItem,
    THeader
  },
  data() {
    return {
      rsList: [],
      currentIndex: 0,
      radioList: [],
      songs: [],
      title: '电台',
      bgColor: '#61bf81'
    }
  },
  created() {
    this._getRadioStationList()
  },
  methods: {
    ...mapActions([
      'selectSingerMusic'
    ]),
    initSongs(list) {
      let ret = []
      list.forEach((musicData) => {
        if (musicData.mid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    },
    playSongs(catid) {
      catid = parseInt(catid)
      getSongs(catid).then((res) => {
        let reg = new RegExp(`^getradiosonglist7732631040990154\\(`)
        let reg2 = new RegExp('\\)$')
        res = res.replace(reg, '').replace(reg2, '')
        res = JSON.parse(res)
        this.songs = res.songlist.data.track_list
        console.log(this.songs)
        if (this.songs) {
          this.songs = this.initSongs(this.songs)
          this.selectSingerMusic({
            list: this.songs,
            index: 0
          })
        }
      }).then((err) => {
        console.log(err)
      })
    },
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

  <style lang="sass" scoped="" type="text/css" module>
    .cname
      width: 240px
  </style>

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
