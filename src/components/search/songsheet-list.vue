<template>
  <section class="songsheet-list">
    <div class="s-loading" v-show="songSheetsList.length <= 0">
      <loading :isShow="true" :msg="msg"></loading>
    </div>
    <div class="songsheet-li" v-for="(item, index) in songSheetsList" @click="selectItem(item, index)">
      <div class="sli-l">
        <img v-lazy="item.imgurl"/>
      </div>
      <div class="sli-m">
        <p v-html="item.dissname">
        </p>
        <p>
          {{item.song_count}} 首 <span v-html="item.creator.name"></span> <span>{{item.listennum}}万人观看</span>
        </p>
      </div>
      <div class="sli-r">
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

  <style lang="sass" scoped="" type="text/css">
    @import "../../common/scss/helpers/variables.scss";
    @import "../../common/scss/helpers/mixins.scss";
    @import "../../common/scss/base/base.scss";
    @import "../../common/scss/components/buttons.scss";
    .songsheet-list
      width: 100%
      .s-loading
        width: 100%
        position: absolute
        top: 400px
        display: flex
        justify-content: center
      .songsheet-li
        width: 100%
        @include px2rem(height, 130px)
        border-bottom: 1px solid #f5f5f5; /*px*/
        display: flex
        .sli-r
          width: 70px
          display: flex
          justify-content: center
          align-items: center
          i
            color: #6e6e6e
            font-size: 48px; /*px*/
        .sli-m
          width: 495px
          margin-left: 28px
          display: flex
          flex: 1
          flex-direction: column
          justify-content: center
          p:first-child
            font-size: 30px; /*px*/
            color: #000000
          p:last-child
            margin-top: 16px
            font-size: 20px; /*px*/
            color: #676767
        .sli-l
          @include px2rem(width, 130px)
          @include px2rem(height, 130px)
          img
            width: 100%
</style>
