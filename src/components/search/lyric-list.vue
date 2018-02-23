<template>
  <section class="lyric-list">
    <div class="lyric-songs">
      <div class="lyric-songs-li" v-for="item in lyricList">
        <div class="sls-l">
          <p>
            <span>{{item.songname}}</span>
          </p>
          <p>
            <span v-for="(singer, index) in item.singer">{{singer.name}}<em v-if="item.singer.length !== (index + 1)">/</em></span>
            &nbsp;&nbsp;-&nbsp;&nbsp;<span>{{item.albumname}}</span>
          </p>
          <p>
            {{item.desc}}
          </p>

          <div class="lyric-cont">
            <div v-html="glLyric(item.lyric)" class="lc-t"></div>

          </div>
        </div>
        <div class="sls-m">
          <span v-show="item.vid" class="icon2">MV</span>
        </div>
        <div class="sls-r">
          <i class="fa fa-ellipsis-h"></i>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {searchLyricList} from 'api/search'
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'keywords'
    ])
  },
  data() {
    return {
      showFlag: true,
      lyricList: []
    }
  },
  created() {
    this._searchLyricList(this.keywords)
  },
  methods: {
    glLyric(str) {
      let ly = str.replace(/\\n/g, '<br />')
      return ly
    },
    _searchLyricList(key) {
      searchLyricList(key).then((res) => {
        let reg = new RegExp(`^MusicJsonCallback09877858041956467\\(`)
        let reg2 = new RegExp('\\)$')
        res = res.replace(reg, '').replace(reg2, '')
        res = JSON.parse(res)
        this.lyricList = res.data.lyric.list
        console.log(res)
      })
    }
  }
}
</script>

  <style lang="sass" scoped="" type="text/css">
    @import "../../common/scss/helpers/variables.scss";
    @import "../../common/scss/helpers/mixins.scss";
    @import "../../common/scss/base/base.scss";
    @import "../../common/scss/components/buttons.scss";
    .lyric-list
      .lyric-songs
        width: 100%
        .lyric-songs-li
          display: flex
          @include px2rem(border-bottom-width, 2px)
          border-style: solid
          border-color: #f2f2f2
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
            .lyric-cont
              @include px2rem(margin-top, 32px)
              .lc-t
                @include px2rem(line-height, 38px)
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
