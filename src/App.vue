<template>
<div id="app">
  <nav-slidebar ref="navSlidebar"></nav-slidebar>
  <router-view></router-view>
  <player></player>
</div>
</template>
<script>
import NavSlidebar from 'components/nav-slidebar/nav-slidebar'
import Player from 'components/player/player'
// import Main from 'components/main/main'
export default {
  name: 'app',
  components: {
    NavSlidebar,
    Player
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
</style>
