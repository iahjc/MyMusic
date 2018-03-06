<template>
<section :class="$style.rank">
  <t-header :title="title" :bgColor="bgColor" :rFlag="false"></t-header>
  <scroll :class="$style.rankMain">
    <div>
      <h2>QQ音乐巅峰榜</h2>
      <rank-item :ranks="rankList" @selectRankItem="selectItem"></rank-item>
      <h2>全球榜</h2>
      <rank-global :golbalRank="golbalRank"></rank-global>
    </div>
  </scroll>
</section>
</template>

<script>
import {mapMutations} from 'vuex'
import Scroll from 'base/scroll/scroll'
import { getGlobalRank } from 'api/rank'
import THeader from 'base/t-header/t-header'
import RankItem from 'components/rank/rank-item'
import RankGlobal from 'components/rank/rank-global'

export default {
  components: {
    Scroll,
    THeader,
    RankItem,
    RankGlobal
  },
  data() {
    return {
      rankList: [],
      golbalRank: [],
      title: '排行',
      bgColor: '#61bf81'
    }
  },
  created() {
    this._getRank()
  },
  methods: {
    ...mapMutations({
      'setTopList': 'SET_TOPLIST'
    }),
    selectItem(item) {
      let id = `${item.topID},,,${item.update_key}`
      this.$router.push({
        path: `/rank/${id}`
      })
      this.setTopList(item)
    },
    back() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    _getRank() {
      getGlobalRank().then((res) => {
        let reg = new RegExp(`^ jsonCallback\\(`)
        let reg2 = new RegExp('\\)$')
        res = res.replace(reg, '').replace(reg2, '')
        res = JSON.parse(res)
        this.rankList = res[0].List
        console.log(res)
        this.golbalRank = res[1].List
      })
    }
  }
}
</script>

<style lang="sass" scoped="" type="text/css" module>
  @import "../../common/scss/helpers/variables.scss";
  @import "../../common/scss/helpers/mixins.scss";
  @import "../../common/scss/base/base.scss";
  .rank
    width: 100%
    position: fixed
    left: 0
    top: 0
    bottom: 0
    .rankMain
      position: absolute
      top: 86px
      left: 0
      bottom: 0
      h2
        height: 100px
        line-height: 100px
        display: flex
        justify-content: center
        align-items: center
        font-size: 30px; /*px*/
</style>
