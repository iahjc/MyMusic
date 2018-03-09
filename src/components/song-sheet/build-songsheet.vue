<template lang="html">
  <section :class="$style.build">
    <div :class="$style.top">
      <div :class="$style.middle">
        <span v-for="(item, index) in navs" :key="index" :class="{current: currentIndex === index}">{{item.title}}</span>
        <!-- <span :class="$style.current">自建歌单</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span>收藏歌单</span> -->
      </div>
      <ul :class="$style.menu">
        <li v-for="(item, index) in menu" :key="index" @click="selectItem(item, index)">
          <i :class="item.icon"></i>
        </li>
        <!-- <li @click="createNewGd">
          <i class="fa fa-plus"></i>
        </li>
        <li @click="manageSongSheets">
          <i class="fa fa-th-list"></i>
        </li> -->
      </ul>
    </div>
    <section :class="$style.content">
      <div :class="$style.default" @click="createSongSheet" v-show="songSheets.length <= 0">
        <ul>
          <li>
            <span></span>
          </li>
          <li>新建歌单</li>
          <li>
            <i class="fa fa-chevron-right"></i>
          </li>
        </ul>
      </div>

      <div :class="$style.item" v-for="(item, index) in songSheets" :key="index" @click="selectSongSheet(item, index)">
        <div :class="$style.img">
          <div :class="$style.icon">
            <i class="fa fa-music"></i>
          </div>
        </div>
        <div :class="$style.title">
          <p>
            {{item.songSheetName}}
          </p>
          <p>
            共 {{item.songsNum}} 首
          </p>
        </div>
        <div :class="$style.r">
          <i class="fa fa-chevron-right"></i>
        </div>
      </div>

    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    songSheets: {
      type: Array,
      default: []
    },
    navs: {
      type: Array,
      default() {
        return [
          {
            title: '自建歌单',
            action: null
          },
          {
            title: '收藏歌单',
            action: null
          }
        ]
      }
    },
    menu: {
      type: Array,
      default() {
        return [
          {
            title: '',
            icon: 'fa fa-plus',
            action: null
          },
          {
            title: '',
            icon: 'fa fa-th-list',
            action: null
          }
        ]
      }
    }
  },
  methods: {
    selectItem(item, index) {
      console.log(item.action)
      if (typeof(item.action) === 'function') {
        item.action()
      }
    },
    createSongSheet() {
      this.$emit('createSongSheet')
    },
    selectSongSheet(item, index) {
      this.$emit('selectSongSheet', item, index)
    }
  }
}
</script>
  <style lang="sass" scoped="" type="text/css">
    span.current
      color: #000
    </style>
  <style lang="sass" scoped="" type="text/css" module>
    .build
      width: 100%
      margin-top: 10px
      position: relative
      .top
        height: 100px
        position: relative
        background: #fff
        .middle
          height: 100%
          display: flex
          align-items: center
          justify-content: center
          color: #6b6b6b
          span:last-child
            border-right: 0
          span
            padding: 0 10px
            font-size: 30px; /*px*/
            border-right: 1px solid #6b6b6b; /*no*/
            box-sizing: border-box
          span.current
            color: #000
        .menu
          display: flex
          position: absolute
          right: 0
          top: 0
          height: 100%
          align-items: center
          right: 20px
          li
            width: 60px
            height: 60px
            display: flex
            justify-content: center
            align-items: center
            i
              font-size: 32px; /*px*/
      .content
        width: 100%
        margin-top: 4px
        background: #fff
        .default
          ul
            display: flex
            align-items: center
            li
              height: 120px
            li:nth-child(3)
              width: 80px
              height: 80px
              display: flex
              justify-content: center
              align-items: center
              i
                color: #808080
                font-size: 30px; /*px*/
            li:nth-child(2)
              font-size: 30px; /*px*/
              display: flex
              align-items: center
              margin-left: 20px
              flex: 1
            li:first-child
              width: 120px
              height: 120px
              background: #f7f7f7
              display: flex
              justify-content: center
              align-items: center
              span
                display: block
                width: 36px
                height: 2px
                background: #5eba93
                &::before
                  content: ''
                  display: block
                  width: 36px
                  height: 2px
                  transform: rotate(90deg)
                  background: #5eba93
        .item
          width: 100%
          border-bottom: 1px solid #f9f9f9; /*no*/
          display: flex
          align-items: center
          height: 120px
          .img
            width: 120px
            height: 120px
            background: #ececec
            display: flex
            justify-content: center
            align-items: center
            .icon
              width: 70px
              height: 70px
              border-radius: 100%
              overflow: hidden
              border: 4px solid #d6d6d6
              display: flex
              align-items: center
              justify-content: center
              i
                font-size: 32px; /*px*/
                color: #d6d6d6
          .title
            flex: 1
            display: flex
            justify-content: center
            flex-direction: column
            font-size: 30px; /*px*/
            box-sizing: border-box
            padding-left: 20px
            p:first-child
              font-size: 30px; /*px*/
              line-height: 45px
              color: #444
            p:last-child
              font-size: 24px; /*px*/

              line-height: 38px
              color: #bdbdbd
          .r
            width: 80px
            height: 80px
            display: flex
            justify-content: center
            align-items: center
            i
              color: #808080
              font-size: 30px; /*px*/

</style>
