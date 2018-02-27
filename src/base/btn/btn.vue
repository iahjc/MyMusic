<template lang="html">
  <div :class="[btnClass,cname]" @click="selectItem">
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
      btnClass: "button"
    }
  },
  methods: {
    selectItem() {
      this.$emit('selectItem')
    }
  },
  mounted() {
    console.log(this.cname)
  }
}
</script>

<style lang="sass" scoped="" type="text/css">
  @import "../../common/scss/components/buttons.scss";
  .button
    @include btn
</style>
