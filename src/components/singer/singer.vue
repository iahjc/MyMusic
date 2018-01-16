<template>
  <section class="singer">
    <s-header></s-header>
    <condition></condition>
    <singer-list></singer-list>
  </section>
</template>

<script>
import SHeader from 'components/s-header/s-header'
import Condition from 'components/condition/condition'
import SingerList from 'components/singer-list/singer-list'
export default {
  components: {
    SHeader,
    Condition,
    SingerList
  }
}
</script>

<style lang="sass" scoped="" type="text/css">
  @import "../../common/scss/helpers/variables.scss";
  @import "../../common/scss/helpers/mixins.scss";
  @import "../../common/scss/base/base.scss";


</style>
