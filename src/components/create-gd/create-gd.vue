<template>
<transition name="showGd">
  <section class="create-gd" v-show="showFlag">
    <header class="gd-h">
      <ul>
        <li @click="closeCreateBg">取消</li>
        <li>新建歌单</li>
        <li>完成</li>
      </ul>
    </header>

    <div class="gd-input">
      <input type="text" placeholder="歌单标题" />
    </div>
  </section>
</transition>
</template>

<script>
export default {
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
    },
    closeCreateBg() {
      console.log(111)
      this.$emit('closeCreateBg')
    }
  }
}
</script>

  <style lang="sass" scoped="" type="text/css">
    @import "../../common/scss/helpers/variables.scss";
    @import "../../common/scss/helpers/mixins.scss";
    @import "../../common/scss/base/base.scss";
    .showGd-enter,.showGd-leave-to
      transform: translateY(100%)
    .showGd-enter-active
      transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0)
    .showGd-leave-active
      transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0)

    .create-gd
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      background: #fff
      z-index: 5
      .gd-h
        @include px2rem(height, 86px)
        background: #61bf81
        color: #fff
        ul
          display: flex
          align-items: center
          @include font-dpr(15px)
          li:first-child,li:last-child
            @include px2rem(width, 100px)
            @include px2rem(height, 75px)
            display: flex
            justify-content: center
            align-items: center
          li:nth-child(2)
            flex: 1
            @include px2rem(height, 86px)
            display: flex
            align-items: center
            justify-content: center
      .gd-input
        @include px2rem(height, 80px)
        box-sizing: border-box
        @include px2rem(border-bottom-width, 2px)
        border-color: #f2f2f2
        border-style: solid
        input
          height: 100%
          border: 0
          @include font-dpr(14px)
          color: #747474
</style>
