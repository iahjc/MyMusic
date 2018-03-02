<template>
  <section class="gd-list">
    <div class="gd-t">
      <div class="gd-t-title">
        {{title}}
      </div>
      <div class="gd-t-r">
        <span>最新</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span>最热</span>
      </div>
    </div>

    <ul class="gd-ul">
      <li v-for="(item, index) in rsList.list" @click="selectItem(item, index)">
        <div class="gd-img">
          <img v-lazy="item.imgurl" />
        </div>
        <p>
          {{item.dissname}}
        </p>
        <div class="gd-author">
          {{item.creator.name}} VIP: {{item.creator.isVip}}
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
      default: '精选歌单'
    },
    rsList: {
      type: Object,
      default: {}
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

    .gd-list
      .gd-t
        display: flex
        justify-content: space-between
        @include px2rem(height, 92px)
        align-items: center
        .gd-t-title
          font-size: 32px; /*px*/
        .gd-t-r
          font-size: 26px; /*px*/
      .gd-ul
        display: flex
        flex-wrap: wrap
        justify-content: space-between
        li
          @include px2rem(width, 350px)
          .gd-img
            @include px2rem(width, 350px)
            @include px2rem(height, 350px)
            @include px2rem(margin-bottom, 20px)
            img
              width: 100%
          p
            font-size: 28px; /*px*/
            width: 95%
            margin: 0 auto
            color: #000000
            @include px2rem(line-height, 38px)
          .gd-author
            width: 95%
            margin: 0 auto
            font-size: 20px; /*px*/
            @include px2rem(height, 40px)
            display: flex
            align-items: center
            color: #5d5d5d
            @include px2rem(margin-bottom, 20px)
</style>
