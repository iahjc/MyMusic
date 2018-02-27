<template>
  <section class="col-3">
    <h3 class="col-3-t">{{title}} <i class="fa fa-chevron-right icon-color"></i></h3>
    <slot>
    </slot>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '歌单推荐'
    }
  }
}
</script>

<style lang="sass" scoped="" type="text/css">
  @import "../../common/scss/helpers/variables.scss";
  @import "../../common/scss/helpers/mixins.scss";
  @import "../../common/scss/base/base.scss";
  @import "../../common/scss/layout/layout.scss";
</style>
