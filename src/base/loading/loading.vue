<template>
  <section class="loading" v-show="showFlag">
    <div class="loading-cont">
      <i class="fa fa-spinner fa-spin"></i>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      showFlag: false
    }
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    if (this.isShow) {
      this.showFlag = true
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

  .loading
    position: relative
</style>
