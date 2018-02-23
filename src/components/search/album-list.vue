<template>
  <section class="album-list">
    <div class="al-li" v-for="item in albumList">
      <ul>
        <li>
          <img :src="item.albumPic" />
        </li>
        <li>
          <p>
            {{item.albumName}}
          </p>
          <p>
            {{item.singerName}}&nbsp;&nbsp;{{item.publicTime}}
          </p>
        </li>
        <li>
          <i class="fa fa-angle-right"></i>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import {searchAlbumList} from 'api/search'
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'keywords'
    ])
  },
  props: {
  },
  data() {
    return {
      showFlag: false,
      albumList: []
    }
  },
  created() {
    this._searchAlbumList(this.keywords)
  },
  methods: {
    _searchAlbumList(key) {
      searchAlbumList(key).then((res) => {
        let reg = new RegExp(`^MusicJsonCallback5987696727295411\\(`)
        let reg2 = new RegExp('\\)$')
        res = res.replace(reg, '').replace(reg2, '')
        res = JSON.parse(res)
        this.albumList = res.data.album.list
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

    .album-list
      width: 100%
      .al-li
        width: 100%
        @include px2rem(height, 125px)
        @include px2rem(border-width, 2px)
        border-style: solid
        border-color: #f0f0f0
        ul
          width: 100%
          height: 100%
          display: flex
          li:first-child
            @include px2rem(width, 125px)
            @include px2rem(height, 125px)
            img
              width: 100%
          li:nth-child(2)
            @include px2rem(margin-left, 28px)
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            p:first-child
              font-size: 28px; /*px*/
            p:last-child
              @include px2rem(margin-top, 18px)
              font-size: 20px; /*px*/
              color: #7f7f7f
          li:nth-child(3)
            @include px2rem(width, 70px)
            display: flex
            justify-content: center
            align-items: center
            i
              font-size: 48px; /*px*/
              color: #565656
</style>
