<template>
  <ul class="player-auxiliary">
    <li>
      <i class="fa fa-heart-o"></i>
    </li>
    <li>
      <i class="fa fa-download"></i>
    </li>
    <li>
      <i class="fa fa-share-square-o"></i>
    </li>
    <li>
      <i class="fa fa-commenting-o"></i>
    </li>
  </ul>
</template>

<script>
export default {
}
</script>

  <style lang="sass" scoped="" type="text/css">
    @import "../../common/scss/helpers/variables.scss";
    @import "../../common/scss/helpers/mixins.scss";
    @import "../../common/scss/base/base.scss";

    .player-auxiliary
      display: flex
      color: #b6b6b8
      @include font-dpr(20px)
      justify-content: center
      li
        @include px2rem(width, 72px)
        @include px2rem(height, 72px)
        display: flex
        justify-content: center
        align-items: center
        @include px2rem(margin-right, 80px)
      li:last-child
        margin-right: 0

</style>
