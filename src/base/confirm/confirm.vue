<template>
  <section class="confirm" v-show="showFlag">
    <div class="confirm-cont">
      <div class="c-c">
        <p>{{options.title}}</p>
        <p>{{options.msg}}</p>
      </div>
      <div class="c-btn">
        <div v-for="item in options.btns" :style="{color: item.color}" @click="selectItem(item.click)">
          {{item.title}}
        </div>
      </div>
    </div>
    <bg ref="mask"></bg>
  </section>
</template>

<script>
import Bg from 'base/bg/bg'
import {DepthExtend} from 'common/js/utils/util'
export default {
  components: {
    Bg
  },
  data() {
    return {
      showFlag: false,
      options: {
        title: '删除自建歌单',
        msg: '确认要删除选中要删除选中要删除选中要删除选中的1个自建歌单吗?',
        btns: [
          {
            title: '取消',
            click: function() {},
            color: "#1b1b1b"
          },
          {
             title: '删除',
             click: function() {},
             color: '#719e8a'
          }
        ]
      }
    }
  },
  methods: {
    selectItem(callback) {
      callback(this)
    },
    show(option) {
      DepthExtend(this.options, option)
      console.log(this.options)
      this.$refs.mask.show()
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

    .confirm
      left: 0
      top: 0
      bottom: 0
      right: 0
      position: fixed
      overflow: hidden
      display: flex
      justify-content: center
      align-items: center
      .confirm-cont
        @include px2rem(width, 540px)
        @include px2rem(height, 305px)
        background: #fff
        position: relative
        z-index: 15
        @include px2rem(border-radius, 12px)
        .c-c
          width: 100%
          @include px2rem(height, 224px)
          display: flex
          justify-content: center
          align-items: center
          flex-direction: column
          p
            display: flex
            justify-content: center
          p:first-child
            @include font-dpr(16px)
            @include px2rem(line-height, 32px)
            color: #444
          p:nth-child(2)
            @include px2rem(margin-top, 20px)
            width: 90%
            @include font-dpr(14px)
            @include px2rem(line-height,32px)
            color: #4a4a4a
        .c-btn
          @include px2rem(height, 80px)
          display: flex
          box-sizing: border-box
          width: 100%
          @include px2rem(border-top-width, 2px)
          border-style: solid
          border-color: #e1e1e1
          position: absolute
          bottom: 0
          left: 0
          div.b-sx
            color: #719e8a
          div:first-child
            @include px2rem(border-right-width, 2px)
            border-style: solid
            border-color: #e1e1e1
          div
            width: 50%
            display: flex
            justify-content: center
            align-items: center
            @include font-dpr(12px)
            box-sizing: border-box
</style>
