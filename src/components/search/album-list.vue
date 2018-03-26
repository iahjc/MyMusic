<template>
  <section class="album-list">
    <div class="al-li" v-for="(item, index) in albumList" :key="index" @click="selectItem(item, index)">
      <ul>
        <li>
          <img v-lazy="item.albumPic" />
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
    <div class="album-loading" v-show="albumList <= 0">
      <loading :isShow="true" :msg="msg"></loading>
    </div>
  </section>
</template>

<script>
import {searchAlbumList} from 'api/search'
import {mapGetters} from 'vuex'
import Loading from 'base/loading/loading'
export default {
  components: {
    Loading
  },
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
    if (this.keywords) {
      this.msg = `正在搜索 '${this.keywords}'`
      this._searchAlbumList(this.keywords)
    }
  },
  methods: {
    selectItem(item, index) {
      this.$router.push({
        path: `/album/${item.albumMID}`
      })
    },
    _searchAlbumList(key) {
      searchAlbumList(key).then((res) => {
        let reg = new RegExp(`^MusicJsonCallback5987696727295411\\(`)
        let reg2 = new RegExp('\\)$')
        res = res.replace(reg, '').replace(reg2, '')
        res = JSON.parse(res)
        this.albumList = res.data.album.list
      })
    }
  }
}
</script>

  <style lang="sass" scoped="" type="text/css">

    .album-list
      width: 100%
      position: relative
      .album-loading
        width: 100%
        position: absolute
        top: 400px
        display: flex
        justify-content: center
      .al-li
        width: 100%
        height: 125px
        border-bottom: 1px solid #f0f0f0; /*px*/
        ul
          width: 100%
          height: 100%
          display: flex
          li:first-child
            width: 125px
            height: 125px
            img
              width: 100%
          li:nth-child(2)
            margin-left: 28px
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            p:first-child
              font-size: 28px; /*px*/
            p:last-child
              margin-top: 18px
              font-size: 20px; /*px*/
              color: #7f7f7f
          li:nth-child(3)
            width: 70px
            display: flex
            justify-content: center
            align-items: center
            i
              font-size: 48px; /*px*/
              color: #565656
</style>
