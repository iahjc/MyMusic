<template lang="html">
  <section :class="$style.albumList" v-show="showFlag">
    <div :class="$style.alLi" v-for="(item, index) in albumList" :key="index" @click="selectItem(item, index)">
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
    selectItem(item, index) {
      this.$emit('selectAlbumItem', item, index)
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

  <style lang="sass" scoped="" type="text/css" module>
    .albumList
      width: 100%
      .alLi
        width: 100%
        height: 125px
        border-bottom: 1px solid #f0f0f0; /*no*/
        ul
          width: 100%
          height: 100%
          display: flex
          li:first-child
            width: 125px
            height: 125px
            img
              width: 100%
          li:nth-child(2)
            margin-left: 28px
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            p:first-child
              font-size: 28px; /*px*/
            p:last-child
              margin-top: 18px
              font-size: 20px; /*px*/
              color: #7f7f7f
          li:nth-child(3)
            width: 70px
            display: flex
            justify-content: center
            align-items: center
            i
              font-size: 48px; /*px*/
              color: #565656
</style>
