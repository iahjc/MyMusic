<template>
  <transition name="songsheet">
  <section class="manage-songsheet" v-show="showFlag">
    <header class="rs-header">
      <div class="r-h-nav" @click="back">
        <i class="fa  fa-chevron-left"></i>
      </div>
      <p class="r-h-title">
        {{title}}
      </p>
      <p class="r-h-r">
        恢复
      </p>
    </header>

    <scroll class="ms-cont" :data="songSheets">
      <div>
        <div class="ms-li" v-for="item in songSheets" @click="selectSongSheet(item, $event)">
          <div class="ms-check">
            <div>
              <i class="fa fa-check"></i>
            </div>
          </div>
          <ul>
            <li>
              <div class="c-mr">
                <i class="fa fa-music"></i>
              </div>
            </li>
            <li>
              <p>
                {{item.songSheetName}}
              </p>
              <p>
                共 {{item.songsNum}} 首
              </p>
            </li>
            <li>
              <i class="fa fa-bars"></i>
            </li>
          </ul>
        </div>
      </div>
    </scroll>

    <div class="ms-remove">
      <div class="re-rm" @click="remove">
        <i class="fa fa-trash-o"></i>
        <p>
          删除
        </p>
      </div>
    </div>

    <msg ref="msg"></msg>
    <confirm ref="confirm"></confirm>
  </section>
  </transition>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Msg from 'base/msg/msg'
import Confirm from 'base/confirm/confirm'
// import { deleteSongSheet } from 'db/songSheet'

export default {
  data() {
    return {
      showFlag: false,
      sheets: [],
      title: '管理自建歌单',
      size: 0
    }
  },
  components: {
    Scroll,
    Msg,
    Confirm
  },
  props: {
    songSheets: {
      type: Array,
      default: []
    }
  },
  methods: {
    remove() {
      if (this.sheets.length > 0) {
        this.$refs.confirm.show({
          title: '删除自建歌单',
          msg: `确定要删除要选中的${this.size}个自建歌单吗？`,
          btns: [
            {
              title: '取消',
              click: function(confirmThis) {
                confirmThis.hide()
              }
            }
          ]
        })
        // deleteSongSheet(this.sheets)
        // 应该有删除成功的标记 后期添加
        // this.$emit('refreshSongSheets')
      } else {
        this.$refs.msg.show({
          msg: '请选择要移除的歌单!',
          msgType: 'error',
          delay: 1200
        })
        return false
      }
    },
    selectSongSheet(item, event) {
      let el = event.currentTarget
      if (this._isChecked(el.children[0])) {
        this._clearChecked(el.children[0])
      } else {
        this._setChecked(el.children[0])
      }

      let index = this._songSheetsIndex(this.sheets, item)
      if (index === -1) {
        this.sheets.push(item)
      } else {
        this.sheets.splice(index, 1)
      }

      // 修改标题
      this._setTitle()
    },
    _setTitle() {
      this.size = this.sheets.length
      if (this.size <= 0) {
        this.title = '管理自建歌单'
      } else {
        this.title = `已选定${this.size}个`
      }
    },
    _isChecked(el) {
      if (el.className.indexOf('checked') > 0) {
        return true
      } else {
        return false
      }
    },
    _songSheetsIndex(songSheets, item) {
      let currentIndex = -1
      songSheets.forEach((obj, index) => {
        if (obj.id === item.id && obj.songSheetName === item.songSheetName) {
          currentIndex = index
        }
      })

      return currentIndex
    },
    _clearChecked(el) {
      el.className = 'ms-check'
    },
    _setChecked(el) {
      el.className = 'ms-check checked'
    },
    back() {
      this.hide()
    },
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
    @import "../../common/scss/helpers/function.scss";
    @import "../../common/scss/base/base.scss";
    .songsheet-enter,.songsheet-leave-to
      transform: translateX(100%)
    .songsheet-enter-active
      transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0)
    .songsheet-leave-active
      transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0)

    .manage-songsheet
      position: fixed
      bottom: 0
      left: 0
      top: 0
      right: 0
      overflow: hidden
      background: #fff
      .rs-header
        background-color: #61bf81
        @include px2rem(height, 86px)
        width: 100%
        display: flex
        justify-content: space-between
        align-items: center
        position: absolute
        top: 0
        .r-h-r
          @include px2rem(width, 86px)
          @include px2rem(height, 86px)
          color: #fff
          font-size: 30px; /*px*/
          display: flex
          justify-content: center
          align-items: center
        .r-h-title
          font-size: 30px; /*px*/
          display: flex
          justify-content: center
          align-items: center
          color: #fff
        .r-h-nav
          color: #fff
          @include px2rem(width, 80px)
          text-align: center
          i
            font-size: 36px; /*px*/
      .ms-cont
        position: absolute
        @include px2rem(top, 86px)
        width: 100%
        left: 0
        bottom: 0
        .ms-li
          display: flex
          width: 100%
          .ms-check
            @include px2rem(width, 100px)
            display: flex
            justify-content: center
            align-items: center
            div
              @include px2rem(width, 40px)
              @include px2rem(height, 40px)
              box-sizing: border-box
              @include px2rem(border-width, 4px)
              border-style: solid
              border-color: #dedede
              border-radius: 100%
              display: flex
              justify-content: center
              align-items: center
              i
                font-size: 24px; /*px*/
                display: none
          div.checked
            div
              background: #61bf81
              border-color: #61bf81
              i
                color: #fff
                display: block
          ul
            flex: 1
            display: flex
            align-items: center
            justify-content: center
            @include px2rem(border-bottom-width, 2px)
            border-style: solid
            border-color: #ececec
            @include px2rem(padding-top, 12px)
            @include px2rem(padding-bottom, 12px)
            li
              @include px2rem(height, 120px)
            li:first-child
              @include px2rem(height, 120px)
              @include px2rem(width, 120px)
              background: #ececec
              display: flex
              justify-content: center
              align-items: center
              .c-mr
                @include px2rem(width, 70px)
                @include px2rem(height, 70px)
                border-radius: 100%
                overflow: hidden
                @include px2rem(border-width, 4px)
                border-color: #d6d6d6
                border-style: solid
                display: flex
                align-items: center
                justify-content: center
                i
                  font-size: 32px; /*px*/
                  color: #d6d6d6
            li:nth-child(3)
              @include px2rem(width, 80px)
              @include px2rem(height, 80px)
              display: flex
              justify-content: center
              align-items: center
              i
                color: #808080
                font-size: 30px; /*px*/
            li:nth-child(2)
              flex: 1
              display: flex
              justify-content: center
              flex-direction: column
              font-size: 30px; /*px*/
              box-sizing: border-box
              @include px2rem(padding-left, 20px)
              p:first-child
                font-size: 30px; /*px*/
                @include px2rem(line-height, 45px)
                color: #444
              p:last-child
                font-size: 24px; /*px*/
                @include px2rem(line-height, 38px)
                color: #bdbdbd
      .ms-remove
        @include px2rem(height, 132px)
        width: 100%
        background: #fff
        position: absolute
        bottom: 0
        left: 0
        display: flex
        justify-content: center
        align-items: center
        .re-rm
          @include px2rem(width, 100px)
          @include px2rem(height, 100px)
          color: #9f9f9f
          font-size: 20px; /*px*/
          display: flex
          justify-content: center
          align-items: center
          flex-direction: column
          p
            @include px2rem(line-height, 40px)
          i
            font-size: 50px; /*px*/
</style>
