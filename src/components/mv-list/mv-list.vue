<template>
  <section class="mv-list">
    <div class="mv-t">
      <div class="mv-t-title">
        {{title}}
      </div>
      <div class="mv-t-r">
        <span>最新</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span>最热</span>
      </div>
    </div>

    <ul class="mv-ul">
      <li v-for="(item, index) in mvList" @click="selectItem(item, index)">
        <div class="mv-img">
          <img :src="item.picurl" />
        </div>
        <p>
          {{item.mvtitle}}
        </p>
        <div class="mv-author">
          {{item.singername}}
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '精选MV'
    },
    mvList: {
      type: Array,
      default: []
    }
  },
  methods: {
    selectItem(item, index) {
      this.$emit('selectItem', item, index)
    }
  }
}
</script>

  <style lang="sass" scoped="" type="text/css">
    @import "../../common/scss/helpers/variables.scss";
    @import "../../common/scss/helpers/function.scss";
    @import "../../common/scss/helpers/mixins.scss";
    @import "../../common/scss/base/base.scss";
    @import "../../common/scss/components/buttons.scss"

    .mv-list
      .mv-t
        display: flex
        justify-content: space-between
        @include px2rem(height, 92px)
        align-items: center
        .mv-t-title
          font-size: 32px; /*px*/
        .mv-t-r
          font-size: 26px; /*px*/
      .mv-ul
        display: flex
        flex-wrap: wrap
        justify-content: space-between
        li
          @include px2rem(width, 350px)
          .mv-img
            @include px2rem(width, 350px)
            @include px2rem(margin-bottom, 20px)
            img
              width: 100%
          p
            font-size: 24px; /*px*/
            width: 95%
            margin: 0 auto
            color: #000000
            @include px2rem(line-height, 38px)
          .mv-author
            width: 95%
            margin: 0 auto
            font-size: 20px; /*px*/
            @include px2rem(height, 40px)
            display: flex
            align-items: center
            color: #5d5d5d
            @include px2rem(margin-bottom, 20px)
</style>
