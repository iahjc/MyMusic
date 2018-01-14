<template>
  <section class="singer">
    <s-header></s-header>
    <condition></condition>
  </section>
</template>

<script>
import SHeader from 'components/s-header/s-header'
import Condition from 'components/condition/condition'
export default {
  components: {
    SHeader,
    Condition
  }
}
</script>

<style lang="sass" scoped="" type="text/css">
  @import "../../common/scss/helpers/variables.scss";
  @import "../../common/scss/helpers/mixins.scss";
  @import "../../common/scss/base/base.scss";


</style>
