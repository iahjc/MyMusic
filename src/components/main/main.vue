<template>
<section class="main" ref="main">
  <m-header @search="search" @showNavbar="showNavbar"></m-header>
  <router-view></router-view>
  <bg ref="bg" @selectBg="selectBg"></bg>
</section>
</template>

<script>
import {
  mapGetters,
  mapMutations
} from 'vuex'
import MHeader from 'components/m-header/m-header'
import Bg from 'base/bg/bg'

export default {
  components: {
    MHeader,
    Bg
  },
  computed: {
    ...mapGetters([
      'navFlag'
    ])
  },
  methods: {
    search() {
      this.$router.push({
        path: `/search`
      })
    },
    _showNav() {
      this.setNavFlag(true)
      this.$refs.main.style.transition = 'all .3s ease'
      this.$refs.main.className = 'main mainW'
      this.$refs.bg.show()
    },
    _hideNav() {
      this.setNavFlag(false)
      this.$refs.main.style.transition = 'all .3s ease'
      this.$refs.main.className = 'main'
      this.$refs.bg.hide()
    },
    selectBg() {
      if (this.navFlag) {
        this._hideNav()
      }
    },
    showNavbar() {
      if (this.navFlag) {
        this._hideNav()
      } else {
        this._showNav()
      }
    },
    ...mapMutations({
      setNavFlag: 'SET_NAVFLAG'
    })
  }
}
</script>

  <style lang="sass" scoped="" type="text/css">
    @import "../../common/scss/helpers/variables.scss";
    @import "../../common/scss/helpers/function.scss";
    @import "../../common/scss/helpers/mixins.scss";
    @import "../../common/scss/base/base.scss";

    section.mainW
      transform: translate3d(pxtorem(640px), 0, 0)
    .main
      width: 100%
      position: absolute
      left: 0
      right: 0
      bottom: 0
      top: 0
</style>
