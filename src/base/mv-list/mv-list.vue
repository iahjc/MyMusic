<template>
  <section class="mv-list" v-show="showFlag">
    <div class="mv-li" v-for="item in mvList">
      <ul>
        <li>
          <img :src="item.pic" />
        </li>
        <li>
          <p>
            {{item.title}}
          </p>
          <p>
            {{item.date}}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    mvList: {
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
    .mv-list
      width: 100%
      .mv-li
        @include px2rem(height, 128px)
        ul
          display: flex
          li
            @include px2rem(height, 128px)
          li:first-child
            @include px2rem(width, 220px)
            img
              width: 100%
          li:last-child
            @include font-dpr(12px)
            display: flex
            flex-direction: column
            justify-content: center
            @include px2rem(margin-left, 28px)
            p:last-child
              @include font-dpr(10px)
              color: #4c4c4c
              @include px2rem(margin-top, 24px)
</style>
