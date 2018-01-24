<template>
<section class="singer">
  <s-header></s-header>
  <scroll ref="scroll">
    <div>
      <condition></condition>
      <singer-list :singerList="singerList" @selectItem="selectItem"></singer-list>
    </div>
  </scroll>
</section>
</template>

<script>
import {
  singerList
} from 'api/musichall'
import {createSinger} from 'domain/singer'
import SHeader from 'components/s-header/s-header'
import Condition from 'components/condition/condition'
import SingerList from 'components/singer-list/singer-list'
import Scroll from 'base/scroll/scroll'
export default {
  data() {
    return {
      singerList: []
    }
  },
  components: {
    SHeader,
    Condition,
    SingerList,
    Scroll
  },
  created() {
    this.getSingerList()
  },
  methods: {
    selectItem(singer, index) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
    },
    getSingerList() {
      singerList().then((res) => {
        let reg = new RegExp(`^ GetSingerListCallback\\(`)
        let reg2 = new RegExp('\\)$')
        res = res.replace(reg, '').replace(reg2, '')
        res = JSON.parse(res)
        this._initSingerList(res)
      })
    },
    _initSingerList(res) {
      let ret = []
      res.data.list.forEach((item) => {
        ret.push(createSinger(item))
      })
      this.singerList = ret
    }
  }
}
</script>

<style lang="sass" scoped="" type="text/css">
  @import "../../common/scss/helpers/variables.scss";
  @import "../../common/scss/helpers/mixins.scss";
  @import "../../common/scss/base/base.scss";


</style>
