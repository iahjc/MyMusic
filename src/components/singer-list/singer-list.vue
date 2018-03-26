<template>
  <section class="singer-list">
    <div class="sl-lis" v-for="(item, index) in singerList" @click="selectItem(item, index)">
      <div class="sl-li">
        <div class="sli-img">
          <img :src="item.img" />
        </div>
        <p class="sli-author">
          {{item.name}}
        </p>
        <i class="fa fa-angle-right"></i>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    singerList: {
      type: Array,
      default: []
    }
  },
  created() {
  },
  methods: {
    selectItem(item, index) {
      this.$emit('selectItem', item, index)
    }
  }
}
</script>

<style lang="sass" scoped="" type="text/css">
  .singer-list
    width: 100%
    .sl-key
      width: 100%
      height: 54px
      background-color: #eaeaea
      border-top: 1px solid #e5e5e5
      border-bottom: 1px solid #e5e5e5
      font-size: 20px; /*px*/
      color: #565656
      line-height: 54px
      padding-left: 32px
      box-sizing: border-box
    .sl-lis
      width: 100%
      .sl-li
        display: flex
        height: 100px
        border-bottom: 1px solid #f5f5f5
        align-items: center
        justify-content: space-between
        box-sizing: border-box
        .sli-img
          width: 76px
          height: 76px
          border-radius: 100%
          overflow: hidden
          margin-left: 25px
          margin-right: 25px
          img
            width: 100%
        .sli-author
          font-size: 32px; /*px*/
          color: #000
          flex: 1
        i
          font-size: 36px; /*px*/
          color: #969696
          margin-right: 30px
</style>
