<template>
  <header class="s-header">
    <div class="s-h-nav" @click="back">
      <i class="fa  fa-chevron-left"></i>
    </div>

    <ul class="s-h-cont">
      <li class="cur">歌手</li>
      <li @click="my">我的</li>
    </ul>

    <div class="s-h-search" @click="search">
      <i class="fa fa-search"></i>
    </div>
    <msg ref="msg"></msg>
  </header>
</template>

<script>
import Msg from 'base/msg/msg'
export default {
  components: {
    Msg
  },
  methods: {
    back() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    search() {
      this.$router.push({
        path: `/search`
      })
    },
    my() {
      this.$refs.msg.show({
        msg: '功能未实现，敬请期待!',
        msgType: 'error',
        delay: 900
      })
    }
  }
}
</script>

<style lang="sass" scoped="" type="text/css">

  .s-header
    background-color: #61bf81
    height: 86px
    width: 100%
    display: flex
    justify-content: space-between
    align-items: center
    .s-h-nav
      color: #fff
      width: 80px
      text-align: center
      i
        font-size: 36px; /*px*/
    .s-h-cont
      display: flex
      width: 330px
      height: 56px
      box-sizing: border-box
      border: 2px solid #fff
      border-radius: 6px
      li
        width: 50%
        text-align: center
        line-height: 52px
        color: #fff
        font-size: 24px; /*px*/
      li.cur
        background: #fff
        color: #61bf81
    .s-h-search
      width: 80px
      text-align: center
      i
        color: #fff
        font-size: 36px; /*px*/
</style>
