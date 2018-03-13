<template>
  <section :class="$style.singer" ref="singer">
    <s-header></s-header>
    <scroll ref="scroll" :class="$style.singerWrapper"
      @scroll="scroll"
      :listen-scroll="listenScroll"
      :probe-type="probeType"
      :data="singerList"
    >
      <div>
        <condition @searchSinger="searchSinger" ref="condition"></condition>
        <div :class="$style.where">
          <p ref="where1" v-show="showFlag">
            sdf
          </p>
        </div>
        <singer-list :singerList="singerList" @selectItem="selectItem"></singer-list>
      </div>
    </scroll>
    <prompt ref="prompt" :msg="msg" @closePrompt="closePrompt" :btnMsg="btnMsg"></prompt>
    <p ref="where" :class="$style.whereTitle" v-show="!showFlag">
      sdf
    </p>
  </section>
</template>

<script>
import {mapMutations} from 'vuex'
import {
  singerList
} from 'api/musichall'
import {createSinger} from 'domain/singer'
import SHeader from 'components/s-header/s-header'
import Condition from 'components/condition/condition'
import SingerList from 'components/singer-list/singer-list'
import Scroll from 'base/scroll/scroll'
import Prompt from 'base/prompt/prompt'
import {playlistMixin} from 'common/js/mixin'
export default {
  mixins: [playlistMixin],
  data() {
    return {
      scrollY: 0,
      singerList: [],
      msg: '由于不知道QQ音乐接口，因而功能有些错乱，请见谅!',
      btnMsg: '我知道了',
      probeType: 3,
      listenScroll: true,
      showFlag: true,
      h: 0
    }
  },
  components: {
    SHeader,
    Condition,
    SingerList,
    Scroll,
    Prompt
  },
  created() {
    let condtion = 'all_all_all'
    this.getSingerList(condtion)
  },
  mounted() {
    this.h = this.$refs.condition.$el.clientHeight
  },
  methods: {
    handlePlayList(playList) {
      const bottom = playList.length > 0 ? `1.3333333rem` : ''
      this.$refs.singer.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    closePrompt() {
    },
    searchSinger(condtion) {
      this.getSingerList(condtion)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    selectItem(singer, index) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    getSingerList(condtion) {
      singerList(condtion).then((res) => {
        if (res.length > 50) {
          let reg = new RegExp(`^ GetSingerListCallback\\(`)
          let reg2 = new RegExp('\\)$')
          res = res.replace(reg, '').replace(reg2, '')
          res = JSON.parse(res)
          this._initSingerList(res)
        } else {
          this.$refs.prompt.show()
        }
      }).then((err) => {
        console.log(err)
      })
    },
    _initSingerList(res) {
      let ret = []
      res.data.list.forEach((item) => {
        ret.push(createSinger(item))
      })
      this.singerList = ret
    }
  },
  watch: {
    scrollY(newScrollY) {
      if (Math.abs(newScrollY) >= this.h) {
        this.showFlag = false
      } else {
        this.showFlag = true
      }
    }
  }
}
</script>

<style lang="sass" scoped="" type="text/css" module>
  .singer
    width: 100%
    position: fixed
    left: 0
    top: 0
    bottom: 0
    overflow: hidden
    .singerWrapper
      width: 100%
      position: absolute
      top: 86px
      bottom: 0
      overflow: hidden
      .where
        width: 100%
        height: 54px
        background-color: #eaeaea
        border-top: 1px solid #e5e5e5; /*no*/
        border-bottom: 1px solid #e5e5e5; /*no*/
        font-size: 20px; /*px*/
        color: #565656
        line-height: 54px
        padding-left: 32px
        box-sizing: border-box
    .whereTitle
      position: fixed
      top: 86px
      width: 100%
      height: 54px
      line-height: 54px
      padding-left: 32px
      font-size: 20px; /*px*/
      left: 0
      background: rgba(255, 255, 255, .3)
      z-index: 1000
</style>
