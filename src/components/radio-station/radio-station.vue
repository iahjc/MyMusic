<template>
  <section class="radio-station">
    <t-header :title="title" :bgColor="bgColor" @back="back" :rFlag="false"></t-header>
    <scroll class="rs-cont" ref="radioStation">
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
import { createSong, processSongsUrl } from 'domain/song'
import {mapActions} from 'vuex'
import RadioItem from 'base/radio-item/radio-item'
import THeader from 'base/t-header/t-header'
import {playlistMixin} from 'common/js/mixin'
export default {
  mixins: [playlistMixin],
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
    handlePlayList(playList) {
      const bottom = playList.length > 0 ? `1.3333333rem` : ''
      this.$refs.radioStation.$el.style.bottom = bottom
      this.$refs.radioStation.refresh()
    },
    ...mapActions([
      'selectSingerMusic'
    ]),
    back() {
      this.$router.back()
    },
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
        if (this.songs) {
          processSongsUrl(this.initSongs(this.songs)).then((songs) => {
            this.songs = songs
            this.selectSingerMusic({
              list: this.songs,
              index: 0
            })
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
        console.log(res)
        this.rsList = res.data.data.groupList
        this.radioList = this.rsList[this.currentIndex].radioList
      })
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

    .radio-station
      position: fixed
      width: 100%
      left: 0
      right: 0
      bottom: 0
      top: 0
      .rs-cont
        position: absolute
        top: 86px
        width: 100%
        bottom: 0
        .c-w-lis
          display: flex
          border-bottom: 2px solid #ededed
          flex-wrap: wrap
          li
            height: 70px
            width: 110px
            text-align: center
            line-height: 70px
          li.cur
            color: #81a395
        .cw-c
          display: flex
          flex-wrap: wrap
          justify-content: space-between
          .cw-c-li
            width: 240px
            padding-bottom: 30px
            .cwc-img
              height: 240px
              width: 240px
              img
                width: 100%
            p:nth-child(2)
              width: 90%
              margin: 0 auto
              font-size: 28px; /*px*/
              line-height: 60px
            p:nth-child(3)
              width: 90%
              margin: 0 auto
              font-size: 24px; /*px*/
              color: #999
</style>
