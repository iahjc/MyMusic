<template>
  <section class="player-process">
    <div class="pl-time-cur">
      03:52
    </div>
    <div class="pl-process">
      <div class="pl-p-c">

      </div>
    </div>
    <div class="pl-time-end">
      04:00
    </div>
  </section>
</template>

<script>
export default {
}
</script>

  <style lang="sass" scoped="" type="text/css">
    @import "../../common/scss/helpers/variables.scss";
    @import "../../common/scss/helpers/mixins.scss";
    @import "../../common/scss/helpers/function.scss";
    @import "../../common/scss/base/base.scss";
    .player-process
      @include px2rem(height, 30px)
      display: flex
      align-items: center
      .pl-process
        @include px2rem(width, 600px)
        @include px2rem(height, 8px)
        background-color: rgba(255, 255, 255, 0.1)
        .pl-p-c
          width: 30%
          height: 100%
          background-color: #61bf80
      .pl-time-cur,.pl-time-end
        @include px2rem(width, 75px)
        color: #b28e8e
        text-align: center
        @include font-dpr(9px)
</style>
