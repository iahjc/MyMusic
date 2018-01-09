<template>
<section class="navSlidebar">
  nihao
</section>
</template>

<script>
export default {}
</script>

<style lang="sass" scoped="" type="text/css">
  @import "../../common/scss/base/reset.scss";
  @import "../../common/scss/helpers/variables.scss";
  @import "../../common/scss/helpers/mixins.scss";
  @import "../../common/scss/helpers/mixins.scss";

  .navSlidebar
    position: absolute
    left: 0
    top: 0
    bottom: 0
    background: $navSlidebar-bg
    @include px2rem(width, 640px, 75px)
    font-family: $global-font-family
</style>
