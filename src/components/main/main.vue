<template>
  <section class="main">
    <m-header></m-header>
    <router-view></router-view>
  </section>
</template>

<script>
import MHeader from 'components/m-header/m-header'
export default {
  components: {
     MHeader
   }
}
</script>

  <style lang="sass" scoped="" type="text/css">
    @import "../../common/scss/helpers/variables.scss";
    @import "../../common/scss/helpers/mixins.scss";
    @import "../../common/scss/base/base.scss";
</style>
