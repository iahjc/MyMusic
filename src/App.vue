<template>
  <div id="app">
    <nav-slidebar ref="navSlidebar"></nav-slidebar>
    <section class="main">
      <m-header @showNavbar="toggleNavbar" v-show="false"></m-header>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <div class="main_bg" @click="toggleNavbar" v-show="showMainBg" ref="mainBg"></div>
    </section>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import MHeader from 'components/m-header/m-header'
import NavSlidebar from 'components/nav-slidebar/nav-slidebar'

export default {
  name: 'app',
  data () {
    return {
      showMainBg: false
    }
  },
  components: {
    NavSlidebar,
    MHeader
  },
  methods: {
    ...mapMutations({
      setShowNavslideState: 'SET_SHOWNAVSLIDE_STATE'
    }),
    toggleNavbar() {
      if (this.showNavslide) {
        this.$refs.navSlidebar.hide()
        this.showMainBg = false
        this.setShowNavslideState(false)
      } else {
        this.$refs.navSlidebar.show()
        this.showMainBg = true
        this.setShowNavslideState(true)
      }
    }
  },
  computed: {
    ...mapGetters([
      'showNavslide'
    ])
  }
}
</script>

<style lang="sass" scoped="" type="text/css">
  @import "common/scss/helpers/variables.scss";
  @import "common/scss/helpers/function.scss";
  .main
    position: relative
    .main_bg
      width: 100%
      height: 100%
      position: absolute
      top: 0
      background-color: rgba(0, 0, 0, .7)

  .app-enter-active, .app-leave-active
    transition: all .3s ease
  .app-enter, .app-leave-to
    transform: translate3d(pxtorem(-640px), 0, 0)
    opacity: 0
  #app
    font-family: $global-font-family
</style>
