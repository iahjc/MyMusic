<template>
  <section class="album-list" v-show="showFlag">
    <div class="al-li" v-for="item in albumList">
      <ul>
        <li>
          <img :src="item.headimg" />
        </li>
        <li>
          <p>
            {{item.albumName}}
          </p>
          <p>
            {{item.pubTime}}
          </p>
        </li>
        <li>
          <i class="fa fa-angle-right"></i>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    albumList: {
      type: Array,
      default: []
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

    .album-list
      width: 100%
      .al-li
        width: 100%
        @include px2rem(height, 125px)
        @include px2rem(border-width, 2px)
        border-style: solid
        border-color: #f0f0f0
        ul
          width: 100%
          height: 100%
          display: flex
          li:first-child
            @include px2rem(width, 125px)
            @include px2rem(height, 125px)
            img
              width: 100%
          li:nth-child(2)
            @include px2rem(margin-left, 28px)
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            p:first-child
              @include font-dpr(14px)
            p:last-child
              @include px2rem(margin-top, 18px)
              @include font-dpr(10px)
              color: #7f7f7f
          li:nth-child(3)
            @include px2rem(width, 70px)
            display: flex
            justify-content: center
            align-items: center
            i
              @include font-dpr(24px)
              color: #565656
</style>
