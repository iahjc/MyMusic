<template>
  <section class="single-list">
    <div class="sl-fast" v-if="zhida.zhida_album">
      <p class="sl-title">最佳匹配</p>
      <ul class="sm-zp">
        <li class="album" @click="toAlbum(zhida)">
          <div class="album-l">
            <img :src="zhida.zhida_album.albumPic" />
          </div>
          <div class="album-m">
            <p>
              专辑：{{zhida.zhida_album.albumName}}
            </p>
            <p>
              {{zhida.zhida_album.singerName}}
            </p>
          </div>
          <div class="slbum-r">
            <i class="fa fa-angle-right"></i>
          </div>
        </li>
        <li class="mv">

        </li>
      </ul>
    </div>
    <div class="sl-songs" v-show="songs.length > 0">
      <song-item :item="item" v-for="(item, index) in songs" :key="index" :index="index" @selectItem="selectItem"></song-item>
    </div>
    <div class="sl-loading" v-show="songs.length <= 0">
      <loading :isShow="true" :msg="msg"></loading>
    </div>
  </section>
</template>

<script>
import {searchKeyList} from 'api/search'
import {mapGetters, mapActions} from 'vuex'
import Loading from 'base/loading/loading'
import { createSong, processSongsUrl } from 'domain/song'
import SongItem from 'base/song-item/song-item'
export default {
  components: {
    Loading,
    SongItem
  },
  data() {
    return {
      zhida: {},
      songs: [],
      msg: ''
    }
  },
  mounted() {
  },
  created() {
    this.msg = `正在搜索 '${this.keywords}'`
    if (this.keywords !== '') {
      this.msg = `正在搜索 '${this.keywords}'`
      this._searchKeyList(this.keywords)
    }
  },
  computed: {
    ...mapGetters([
      'keywords'
    ])
  },
  methods: {
    selectItem(item, index) {
      this.selectSingerMusic({
        list: this.songs,
        index: index
      })
    },
    ...mapActions([
      'selectSingerMusic'
    ]),
    _initSongs(list) {
      let ret = []
      list.forEach((musicData) => {
        if (musicData.id && musicData.album.id) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    },
    toAlbum(item) {
      this.$router.push({
        path: `/album/${item.zhida_album.albumMID}`
      })
    },
    _searchKeyList(keywords) {
      searchKeyList(keywords).then((res) => {
        let reg = new RegExp(`^MusicJsonCallback5987696727295411\\(`)
        let reg2 = new RegExp('\\)$')
        res = res.replace(reg, '').replace(reg2, '')
        res = JSON.parse(res)
        this.zhida = res.data.zhida
        processSongsUrl(this._initSongs(res.data.song.list)).then((songs) => {
          this.songs = songs
        })
      })
    }
  },
  watch: {
    keywords(newKey) {
      this._searchKeyList(newKey)
    }
  }
}
</script>

  <style lang="sass" scoped="" type="text/css">

    .single-list
      .sl-fast
        width: 95%
        margin: 0 auto
        border-bottom: 1px solid #efefef; /*px*/
        padding-bottom: 20px
        p.sl-title
          height: 60px
          line-height: 60px
          font-size: 20px; /*px*/
          color: #828282
        .sm-zp
          li.album
            display: flex
            div.album-l
              width: 105px
              height: 105px
              img
                width: 100%
            div.slbum-r
              display: flex
              justify-content: center
              align-items: center
              i
                font-size: 52px; /*px*/
            div.album-m
              margin-left: 25px
              flex: 1
              display: flex
              justify-content: center
              flex-direction: column
              p:first-child
                font-size: 28px; /*px*/
                color: #444
              p:last-child
                margin-top: 16px
                font-size: 20px; /*px*/
                color: #666666
      .sl-loading
        width: 100%
        position: absolute
        top: 400px
        display: flex
        justify-content: center
      .sl-songs
        width: 100%
        .sl-songs-li
          display: flex
          border-bottom: 1px solid #f2f2f2; /*px*/
          padding-top: 20px
          padding-bottom: 20px
          box-sizing: border-box
          padding-left: 2.5%
          .sls-l
            flex: 1
            p:first-child
              font-size: 28px; /*px*/
              color: #363636
              height: 28px
              line-height: 28px
            p:nth-child(2)
              margin-top: 10px
              font-size: 20px; /*px*/
              span:first-child
                color: #666
            p:last-child
              margin-top: 10px
              font-size: 24px; /*px*/
              color: #666666
          .sls-r
            width: 80px
            display: flex
            justify-content: center
            i
              font-size: 40px; /*px*/
              color: #afafaf
          .sls-m
            width: 80px
            display: flex
            justify-content: center
            .icon2
              background: #afafaf
              color: #fff
              padding-left: 2px
              padding-right: 2px
</style>
