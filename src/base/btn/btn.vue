<template lang="html">
  <div :class="[btnClass,cname]">
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    cname: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      btnClass: "btn"
    }
  }
}
</script>

<style lang="sass" scoped="" type="text/css">
  @import "../../common/scss/components/buttons.scss";
  .btn
    @include btn
</style>
