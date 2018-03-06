<template>
  <section :class="$style.songsheetList">
    <div :class="$style.loading" v-show="songSheetsList.length <= 0">
      <loading :isShow="true" :msg="msg"></loading>
    </div>
    <div :class="$style.item" v-for="(item, index) in songSheetsList" @click="selectItem(item, index)">
      <div :class="$style.img">
        <img v-lazy="item.imgurl"/>
      </div>
      <div :class="$style.name">
        <p v-html="item.dissname">
        </p>
        <p>
          {{item.song_count}} 首 <span v-html="item.creator.name"></span> <span>{{item.listennum}}万人观看</span>
        </p>
      </div>
      <div :class="$style.r">
        <i class="fa fa-angle-right"></i>
      </div>
    </div>
  </section>
</template>

<script>
import {searchSongSheetsList} from 'api/search'
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
      songSheetsList: [],
      msg: ''
    }
  },
  created() {
    if (this.keywords) {
      this.msg = `正在搜索 '${this.keywords}'`
      this._searchSongSheetsList(this.keywords)
    }
  },
  methods: {
    selectItem(item, index) {
      this.$router.push({
        path: `/songlist/${item.dissid}`
      })
    },
    _searchSongSheetsList(key) {
      searchSongSheetsList(key).then((res) => {
        let reg = new RegExp(`^MusicJsonCallback8043431003938759\\(`)
        let reg2 = new RegExp('\\)$')
        res = res.replace(reg, '').replace(reg2, '')
        res = JSON.parse(res)
        this.songSheetsList = res.data.list
        console.log(res)
      })
    }
  }
}
</script>

  <style lang="sass" scoped="" type="text/css" module>
    .songsheetList
      width: 100%
      .loading
        width: 100%
        position: absolute
        top: 400px
        display: flex
        justify-content: center
      .item
        width: 100%
        height: 130px
        border-bottom: 1px solid #f5f5f5; /*no*/
        display: flex
        .r
          width: 70px
          display: flex
          justify-content: center
          align-items: center
          i
            color: #6e6e6e
            font-size: 48px; /*px*/
        .name
          width: 495px
          margin-left: 28px
          display: flex
          flex: 1
          flex-direction: column
          justify-content: center
          p:first-child
            height: 30px
            white-space: nowrap
            overflow: hidden
            text-overflow: ellipsis
            font-size: 30px; /*px*/
            color: #000000
          p:last-child
            margin-top: 16px
            font-size: 20px; /*px*/
            color: #676767
        .img
          width: 130px
          height: 130px
          img
            width: 100%
</style>
