<template>
  <section class="gd-list">
    <top-menu @selectMenuItem="selectMenuItem"></top-menu>
    <ul class="gd-ul">
      <li v-for="(item, index) in rsList" @click="selectItem(item, index)">
        <div class="gd-img">
          <img v-lazy="item.imgurl" />
        </div>
        <p>
          {{item.dissname}}
        </p>
        <div class="gd-author">
          {{item.creator.name}} VIP: {{item.creator.isVip}}
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import TopMenu from 'base/top-menu/top-menu'
export default {
  components: {
    TopMenu
  },
  props: {
    title: {
      type: String,
      default: '精选歌单'
    },
    rsList: {
      type: Array,
      default: []
    }
  },
  methods: {
    selectMenuItem(item, index, ev) {
      this.$emit('selectMenuItem', item, index, ev)
    },
    selectItem(item, index) {
      this.$emit('selectItem', item, index)
    }
  }
}
</script>

  <style lang="sass" scoped="" type="text/css">
    @import "../../common/scss/components/buttons.scss"

    .gd-list
      .gd-t
        display: flex
        justify-content: space-between
        height: 92px
        align-items: center
        .gd-t-title
          font-size: 32px; /*px*/
        .gd-t-r
          font-size: 26px; /*px*/
      .gd-ul
        display: flex
        flex-wrap: wrap
        justify-content: space-between
        li
          width: 350px
          .gd-img
            width: 350px
            height: 350px
            margin-bottom: 20px
            img
              width: 100%
          p
            font-size: 28px; /*px*/
            width: 95%
            margin: 0 auto
            color: #000000
            line-height: 38px
          .gd-author
            width: 95%
            margin: 0 auto
            font-size: 20px; /*px*/
            height: 40px
            display: flex
            align-items: center
            color: #5d5d5d
            margin-bottom: 20px
</style>
