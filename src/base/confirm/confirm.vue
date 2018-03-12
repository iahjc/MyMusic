<template>
<section :class="$style.confirm" v-show="showFlag">
  <div :class="$style.content">
    <div :class="$style.title">
      <p>{{options.title}}</p>
      <p>{{options.msg}}</p>
    </div>
    <div :class="$style.btn">
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
import {
  DepthExtend
} from 'common/js/utils/util'

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
            color: '#1b1b1b'
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
      callback.call(this, this)
    },
    show(option) {
      DepthExtend(this.options, option)
      this.$refs.mask.show()
      this.showFlag = true
    },
    hide() {
      this.showFlag = false
    }
  }
}
</script>

  <style lang="sass" scoped="" type="text/css" module>
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
      .content
        width: 540px
        height: 305px
        background: #fff
        position: relative
        z-index: 15
        border-radius: 12px
        .title
          width: 100%
          height: 224px
          display: flex
          justify-content: center
          align-items: center
          flex-direction: column
          p
            display: flex
            justify-content: center
          p:first-child
            font-size: 32px; /*px*/
            line-height: 32px
            color: #444
          p:nth-child(2)
            margin-top: 20px
            width: 90%
            font-size: 28px; /*px*/
            line-height: 32px
            color: #4a4a4a
        .btn
          height: 80px
          display: flex
          box-sizing: border-box
          width: 100%
          border-top: 1px solid #e1e1e1; /*no*/
          position: absolute
          bottom: 0
          left: 0
          div.b-sx
            color: #719e8a
          div:first-child
            border-right: 1px solid #e1e1e1; /*no*/
          div
            width: 50%
            display: flex
            justify-content: center
            align-items: center
            font-size: 24px; /*px*/
            box-sizing: border-box
</style>
