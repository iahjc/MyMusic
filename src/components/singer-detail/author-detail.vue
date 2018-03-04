<template lang="html">
  <section :class="$style.authorDetail" v-show="singer">
    <div :class="$style.background" :style="bgStyle">
      <div :class="$style.content">
        <h4>{{singer.name}}</h4>
        <ul>
          <li>

          </li>
          <li :class="$style.fans">
            粉丝数: {{Math.round((fansNum / 10000) * 100) / 100}}
          </li>
          <li>

          </li>
        </ul>

        <div :class="$style.btns">
          <btn>关注</btn> <btn>勋章</btn>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Btn from 'base/btn/btn'
export default {
  components: {
    Btn
  },
  props: {
    singer: {
      type: Object,
      default: {}
    },
    fansNum: {
      type: Number,
      default: 0
    }
  },
  computed: {
    bgStyle() {
      return `background:url(${this.singer.avatar}) no-repeat; background-size: 100% auto`
    }
  }
}
</script>

<style lang="sass" scoped="" type="text/css" module>
  @import "../../common/scss/components/buttons.scss";
  .authorDetail
    width: 100%
    height: 520px
    overflow: hidden
    .background
      width: 100%
      padding-top: 66%
      background-size: cover
      .content
        width: 100%
        display: flex
        flex-direction: column
        align-items: center
        justify-content: flex-end
        ul
          display: flex
          height: 50px
          align-items: center
          .fans
            width: 160px
            text-align: center
            font-size: 22px; /*px*/
            color: #fff
          li:first-child,li:last-child
            width: 90px
            height: 1px; /*no*/
            background: #fff
        h4
          font-size: 42px; /*px*/
          color: #fff
</style>
