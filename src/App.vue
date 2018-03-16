<template>
<div id="app">
  <section :class="$style.main">
    <nav-slidebar ref="navSlidebar"></nav-slidebar>
    <router-view></router-view>
  </section>
  <play></play>
  <share></share>
  <auxiliary></auxiliary>
  <message></message>
</div>
</template>
<script>
import {mapGetters} from 'vuex'
import NavSlidebar from 'components/nav-slidebar/nav-slidebar'
// import Player from 'components/player/player'
// import Main from 'components/main/main'
import Play from 'components/player/play'
import Share from 'base/share/share'
import Auxiliary from 'base/layout/auxiliary'
import Message from 'base/message/message'
export default {
  name: 'app',
  computed: {
    ...mapGetters([
      'navFlag'
    ])
  },
  components: {
    NavSlidebar,
    Play,
    Share,
    Auxiliary,
    Message
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
<style lang="sass" scoped="" type="text/css" module>
  .main
    position: absolute
    left: 0
    bottom: 0
    right: 0
    top: 0
    overflow: hidden
  </style>
<style lang="sass" scoped="" type="text/css">
  @import "common/scss/helpers/variables.scss";
  @import "common/scss/helpers/function.scss";

  #app
    font-family: $global-font-family

</style>
