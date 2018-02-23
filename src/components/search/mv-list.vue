<template>
  <section class="mv-list" v-show="showFlag">
    <div class="mv-li" v-for="item in mvList">
      <ul>
        <li>
          <img :src="item.mv_pic_url" />
        </li>
        <li>
          <p v-html="item.mv_name">
          </p>
          <p>
            <span v-for="(singer, index) in item.singer_list">{{singer.name}}<em v-show="item.singer_list.length !== (index + 1)">/</em></span>&nbsp;&nbsp;<span>{{item.duration}}</span>
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import {searchMvList} from 'api/search'
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
      mvList: []
    }
  },
  created() {
    this._searchMvList(this.keywords)
  },
  methods: {
    _searchMvList(key) {
      searchMvList(key).then((res) => {
        let reg = new RegExp(`^MusicJsonCallback5987696727295411\\(`)
        let reg2 = new RegExp('\\)$')
        res = res.replace(reg, '').replace(reg2, '')
        res = JSON.parse(res)
        this.mvList = res.data.mv.list
        console.log(this.mvList)
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
    .mv-list
      width: 100%
      .mv-li
        @include px2rem(height, 128px)
        @include px2rem(border-bottom-width, 2px)
        border-style: solid
        border-color: #efefef
        box-sizing: border-box
        ul
          display: flex
          li
            @include px2rem(height, 128px)
          li:first-child
            @include px2rem(width, 220px)
            img
              width: 100%
          li:last-child
            font-size: 24px; /*px*/
            display: flex
            flex-direction: column
            justify-content: center
            box-sizing: border-box
            @include px2rem(max-width, 480px)
            @include px2rem(margin-left, 28px)
            p:last-child
              font-size: 20px; /*px*/
              color: #4c4c4c
              @include px2rem(margin-top, 24px)
</style>
