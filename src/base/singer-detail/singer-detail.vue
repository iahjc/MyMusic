<template>
  <section class="sd" v-show="showFlag">
    <div class="sd-c">
      {{desc}}
    </div>
  </section>
</template>

<script>
export default {
  props: {
    desc: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showFlag: false
    }
  },
  methods: {
    show() {
      this.showFlag = true
    },
    hide() {
      this.showFlag = false
    }
  }
}
</script>

  <style lang="sass" scoped="" type="text/css">
    @import "../../common/scss/helpers/variables.scss";
    @import "../../common/scss/helpers/mixins.scss";
    @import "../../common/scss/base/base.scss";
    @import "../../common/scss/components/buttons.scss";
    .sd
      width: 100%
      @include font-dpr(14px)
      color: #7f7f7f
      @include px2rem(line-height, 42px)
      .sd-c
        width: 95%
        margin: 0 auto
</style>
