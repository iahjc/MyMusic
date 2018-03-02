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
      <div class="sl-songs-li" v-for="(item, index) in songs" @click="selectItem(item, index)">
        <div class="sls-l">
          <p>
            <span>{{item.name}}</span>&nbsp;&nbsp;<span class="icon1">SQ</span>&nbsp;&nbsp;<span class="icon1" v-show="item.isOnly === 1">独家</span>
          </p>
          <p>
            <span v-html="item.singer"></span> · <span v-show="item.album">{{item.album}}</span>
          </p>
          <p v-show="item.description">
            {{item.description}}
          </p>
        </div>
        <div class="sls-m">
          <span v-show="item.isMv" class="icon2">MV</span>
        </div>
        <div class="sls-r">
          <i class="fa fa-ellipsis-h"></i>
        </div>
      </div>
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
import {createSong} from 'domain/song'
export default {
  components: {
    Loading
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
        this.songs = this._initSongs(res.data.song.list)
        console.log(this._initSongs(res.data.song.list))
        console.log(res)
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
    @import "../../common/scss/helpers/variables.scss";
    @import "../../common/scss/helpers/mixins.scss";
    @import "../../common/scss/base/base.scss";
    @import "../../common/scss/components/buttons.scss";

    .single-list
      .sl-fast
        width: 95%
        margin: 0 auto
        border-bottom: 1px solid #efefef; /*px*/
        @include px2rem(padding-bottom, 20px)
        p.sl-title
          @include px2rem(height, 60px)
          @include px2rem(line-height, 60px)
          font-size: 20px; /*px*/
          color: #828282
        .sm-zp
          li.album
            display: flex
            div.album-l
              @include px2rem(width, 105px)
              @include px2rem(height, 105px)
              img
                width: 100%
            div.slbum-r
              display: flex
              justify-content: center
              align-items: center
              i
                font-size: 52px; /*px*/
            div.album-m
              @include px2rem(margin-left, 25px)
              flex: 1
              display: flex
              justify-content: center
              flex-direction: column
              p:first-child
                font-size: 28px; /*px*/
                color: #444
              p:last-child
                @include px2rem(margin-top, 16px)
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
          @include px2rem(padding-top, 20px)
          @include px2rem(padding-bottom, 20px)
          box-sizing: border-box
          padding-left: 2.5%
          .sls-l
            flex: 1
            p:first-child
              font-size: 28px; /*px*/
              color: #363636
              @include px2rem(height, 28px)
              @include px2rem(line-height, 28px)
            p:nth-child(2)
              @include px2rem(margin-top, 10px)
              font-size: 20px; /*px*/
              span:first-child
                color: #666
            p:last-child
              @include px2rem(margin-top, 10px)
              font-size: 24px; /*px*/
              color: #666666
          .sls-r
            @include px2rem(width, 80px)
            display: flex
            justify-content: center
            i
              font-size: 40px; /*px*/
              color: #afafaf
          .sls-m
            @include px2rem(width, 80px)
            display: flex
            justify-content: center
            .icon2
              background: #afafaf
              color: #fff
              @include px2rem(padding-left, 2px)
              @include px2rem(padding-right, 2px)
</style>
