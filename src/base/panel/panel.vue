<template lang="html">
  <section :class="[panelClass, cname]">
    <h4 @click="selectItem">{{title}}<i class="fa fa-chevron-right icon-color"></i></h4>
    <slot/>
  </section>
</template>

<script>
export default {
  props: {
    cname: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      panelClass: 'panel'
    }
  },
  methods: {
    selectItem() {
      this.$emit('selectItem')
    }
  }
}
</script>

<style lang="sass" scoped="" type="text/css">
  @import "../../common/scss/layout/layout.scss";
  .panel
    @include panel
</style>
