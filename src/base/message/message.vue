<template lang="html">
  <transition name="message">
  <section :class="[$style.message, messageOptions.type]" v-show="messageState" @click.stop>
      <i :class="messageOptions.icon"></i>&nbsp;&nbsp;<span>{{messageOptions.msg}}</span>
  </section>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'messageState',
      'messageOptions'
    ])
  },
}
</script>

<style lang="sass" scoped="" type="text/css">
  @import "../../common/scss/components/animation.scss";
  .success
  .error
    background: #ec7571!important
</style>

<style lang="sass" scoped="" type="text/css" module>
  .message
    position: fixed
    height: 75px
    width: 100%
    top: 0
    background: #61bf81
    display: flex
    align-items: center
    box-sizing: border-box
    padding-left: 5%
    font-size: 28px; /*px*/
    z-index: 11111
    color: #fff
</style>
