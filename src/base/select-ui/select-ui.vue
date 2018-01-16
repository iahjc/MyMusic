<template>
  <div class="select-ui">
    <span>{{title}}</span>&nbsp;&nbsp;<i class="fa fa-angle-down"></i>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '标准'
    }
  },
  methods: {
    setTitle(msg) {
      this.title = msg
    }
  }
}
</script>

  <style lang="sass" scoped="" type="text/css">
    @import "../../common/scss/helpers/variables.scss";
    @import "../../common/scss/helpers/mixins.scss";
    @import "../../common/scss/helpers/function.scss";
    @import "../../common/scss/base/base.scss";

    .select-ui
      box-sizing: border-box
      @include px2rem(height, 34px)
      width: auto
      border: 2px solid #fffbfc
      display: inline-block
      color: #fffbfc
      border-radius: 10px
      @include font-dpr(10px)
      display: inline-flex
      align-items: center
      @include px2rem(padding-left, 10px)
      @include px2rem(padding-right, 10px)
      i
        @include font-dpr(14px)
</style>
