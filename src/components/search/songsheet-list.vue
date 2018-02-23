<template>
  <section class="songsheet-list">
    <div class="songsheet-li" v-for="item in songSheetsList">
      <div class="sli-l">
        <img :src="item.imgurl"/>
      </div>
      <div class="sli-m">
        <p v-html="item.dissname">
        </p>
        <p>
          {{item.song_count}} 首 <span>{{item.creator.name}}</span> <span>{{item.listennum}}万人观看</span>
        </p>
      </div>
      <div class="sli-r">
        <i></i>
      </div>
    </div>
  </section>
</template>

<script>
import {searchSongSheetsList} from 'api/search'
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
      songSheetsList: []
    }
  },
  created() {
    this._searchSongSheetsList(this.keywords)
  },
  methods: {
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
      .songsheet-li
        width: 100%
        @include px2rem(height, 130px)
        display: flex
        .sli-l
          @include px2rem(width, 130px)
          @include px2rem(height, 130px)
          img
            width: 100%
</style>
