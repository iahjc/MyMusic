<template lang="html">
  <transition name="auxiliary-fade">
  <section :class="$style.auxiliary" v-show="auxiliaryState" @click.stop>
    <div :class="$style.wrapper" class="auxiliary-content">
      <div :class="$style.content" v-show="auxiliaryList">
        <ul>
          <li v-for="(item, index) in auxiliaryList" v-if="item.showFlag" @click="selectItem(item, index)">
            <div :class="$style.lcIcon">
              <i :class="setIcon(item.icon)"></i>
            </div>
            <p>
              {{item.title}}
            </p>
          </li>
        </ul>
      </div>
      <div :class="$style.cannel" @click="cannel">
        取消
      </div>
    </div>
  </section>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'auxiliaryState',
      'auxiliaryList',
      'auxiliaryActions'
    ])
  },
  methods: {
    selectItem(item, index) {
      if (typeof (item.action) === 'function') {
        item.action.call(this, item)
      }
    },
    cannel() {
      if (typeof (this.auxiliaryActions[0].action) === 'function') {
        this.auxiliaryActions[0].action.call(this)
      }
    },
    setIcon(str) {
      return `fa fa-${str}`
    }
  }
}
</script>
<style lang="sass" scoped="" type="text/css">
  @import "../../common/scss/components/animation.scss";
</style>

<style lang="sass" scoped="" type="text/css" module>
  .auxiliary
    position: fixed
    left: 0
    right: 0
    bottom: 0
    top: 0
    z-index: 11111
    background-color: rgba(0, 0, 0, 0.3)
    .wrapper
      position: absolute
      left: 0
      bottom: 0
      background: #e4e4e4
      width: 100%
      .content
        ul
          width: 95%
          display: flex
          margin: 0 auto
          flex-wrap: wrap
          padding-bottom: 32px
          li:nth-child(6n)
            margin-right: 0
          li
            margin-right: 28px
            margin-top: 32px
            .lcIcon
              width: 94px
              height: 94px
              background: #fff
              border-radius: 24px
              display: flex
              justify-content: center
              align-items: center
              i
                font-size: 48px; /*px*/
                color: #424242
            p
              margin: 20px 0
              font-size: 24px; /*px*/
              color: #0a0a0a
              text-align: center
      .cannel
        width: 100%
        height: 108px
        display: flex
        justify-content: center
        align-items: center
        font-size: 32px; /*px*/
        border-top: 1px solid #cdcdcd; /*no*/
</style>
