<template lang="html">
<section class="song-list">
  <t-header @back="back"></t-header>
  <single-top :detas="detas"></single-top>
  <scroll class="sl-wrapper" :data="songList">
    <div>
      <song-menu @playAll="playAll"></song-menu>
      <div class="sl-list">
        <song-item :item="item" v-for="(item, index) in songList" :key="index" :index="index" @selectItem="selectItems"></song-item>
      </div>
      <div class="musicLoading" v-show="songList.length <= 0">
        <loading :isShow="true"></loading>&nbsp;&nbsp;<span>正在载入......</span>
      </div>
    </div>
  </scroll>
  <!-- <layer-control ref="layerControl" :layerDatas="layerDatas"></layer-control> -->
</section>
</template>

<script>
import {mapActions} from 'vuex'
import { createSong } from 'domain/song'
import {
  getSongList,
  getCollectionNum
} from 'api/musichall'
import SongMenu from 'base/song-menu/song-menu'
import SongItem from 'base/song-item/song-item'
import Scroll from 'base/scroll/scroll'
import THeader from 'base/t-header/t-header'
import SingleTop from 'components/single-top/single-top'
import Loading from 'base/loading/loading'

export default {
  components: {
    SongMenu,
    SongItem,
    Scroll,
    THeader,
    SingleTop,
    Loading
  },
  data() {
    return {
      detas: {},
      coll: {},
      songList: [],
      layerDatas: [],
      songCount: 0
    }
  },
  created() {
    this._getSongList()
    this._getCollectionNum()
  },
  methods: {
    back() {
      this.$router.back()
    },
    playAll() {
      this.selectSingerMusic({
        list: this.songList,
        index: 0
      })
    },
    showControl() {
      // this.layerDatas = rnav
    },
    selectIconItem(item, index) {
      this.layerDatas = musicControl
      // 如果需要付费就要重新添加一个项
      if (item.pay.pay_down !== 0) {
        musicControl[3].showFlag = true
      } else {
        musicControl[3].showFlag = false
      }
    },
    showShare() {
      this.layerDatas = share
    },
    back() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    /**
     * 初始化歌曲数据
     * @return {[type]} [description]
     */
    _initSongList(list) {
      let ret = []
      list.forEach((musicData) => {
        if (musicData.id && musicData.album.id) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    },
    ...mapActions([
      'selectSingerMusic'
    ]),
    selectItems(item, index) {
      this.selectSingerMusic({
        list: this.songList,
        index: index
      })
    },
    _getCollectionNum() {
      let disstid = this.$route.params.id
      getCollectionNum(disstid).then((res) => {
        // 使用正则处理
        let reg = new RegExp(`^getFavNum${disstid}\\(`)
        let reg2 = new RegExp('\\)$')
        res = res.replace(reg, '').replace(reg2, '')
        this.coll = JSON.parse(res)
      })
    },
    _getSongList() {
      let disstid = this.$route.params.id
      getSongList(disstid).then((res) => {
        let reg = new RegExp(`^playlistinfoCallback\\(`)
        let reg2 = new RegExp('\\)$')
        res = res.replace(reg, '').replace(reg2, '')
        res = JSON.parse(res)
        if (res.code === 0) {
          console.log(res)
          this.detas = res.cdlist[0]
          this.songList = this._initSongList(res.cdlist[0].songlist)
          this.songCount = res.cdlist[0].cur_song_num
        }
      }).then((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="sass" scoped="" type="text/css">
  @import "../../common/scss/helpers/variables.scss";
  @import "../../common/scss/helpers/mixins.scss";
  @import "../../common/scss/helpers/function.scss";
  @import "../../common/scss/base/base.scss";

  .song-list
    width: 100%
    position: fixed
    bottom: 0
    overflow: hidden
    top: 0
    .sl-wrapper
      position: absolute
      @include px2rem(top, 495px)
      width: 100%
      bottom: 0
      overflow: hidden
      .musicLoading
        display: flex
        justify-content: center
        position: absolute
        left: 50%
        top: 240px
        transform: translate(-50%, -50%)
        z-index: 10
</style>
