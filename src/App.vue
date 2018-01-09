<template>
  <div id="app">
    <m-header></m-header>
    <nav-slidebar v-show="false"></nav-slidebar>
    <router-view/>
  </div>
</template>
<script>
import MHeader from 'components/m-header/m-header'
import NavSlidebar from 'components/nav-slidebar/nav-slidebar'

export default {
  name: 'app',
  components: {
    NavSlidebar,
    MHeader
  }
}
</script>

<style lang="sass" scoped="" type="text/css">
  @import "common/scss/helpers/variables.scss";

  #app
    font-family: $global-font-family
</style>
