<template>
<div id="app">
  <section class="main">
    <nav-slidebar ref="navSlidebar"></nav-slidebar>
    <router-view></router-view>
  </section>
  <player></player>
</div>
</template>
<script>
import {mapGetters} from 'vuex'
import NavSlidebar from 'components/nav-slidebar/nav-slidebar'
import Player from 'components/player/player'
// import Main from 'components/main/main'
export default {
  name: 'app',
  computed: {
    ...mapGetters([
      'navFlag'
    ])
  },
  components: {
    NavSlidebar,
    Player
  },
  watch: {
    navFlag(newFlag) {
      if (newFlag) {
        this.$refs.navSlidebar.show()
      } else {
        this.$refs.navSlidebar.hide()
      }
    }
  }
}
</script>

<style lang="sass" scoped="" type="text/css">
  @import "common/scss/helpers/variables.scss";
  @import "common/scss/helpers/function.scss";

  .app-enter-active, .app-leave-active
    transition: all .3s ease
  .app-enter, .app-leave-to
    transform: translate3d(pxtorem(-640px), 0, 0)
    opacity: 0
  #app
    font-family: $global-font-family
    .main
      position: absolute
      left: 0
      bottom: 0
      right: 0
      top: 0
      overflow: hidden
</style>
