<template>
  <section class="album-list">
    <div class="album-t">
      <div class="album-t-title">
        {{title}}
      </div>
      <div class="album-t-r">
        <span>最新</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span>最热</span>
      </div>
    </div>

    <ul class="album-ul">
      <li v-for="(item, index) in albumList" @click="selectItem(item, index)">
        <div class="album-img">
          <img :src="setImg(item.album_mid)" />
        </div>
        <p>
          {{item.album_name}}
        </p>
        <div class="album-author">
          {{item.singers[0].singer_name}}&nbsp;&nbsp;{{item.public_time}}
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '精选专辑'
    },
    albumList: {
      type: Array,
      default: []
    }
  },
  methods: {
    selectItem(item, index) {
      this.$emit('selectItem', item, index)
    },
    setImg(mid) {
      return `https://y.gtimg.cn/music/photo_new/T002R300x300M000${mid}.jpg?max_age=2592000`
    }
  }
}
</script>

  <style lang="sass" scoped="" type="text/css">
    @import "../../common/scss/helpers/variables.scss";
    @import "../../common/scss/helpers/function.scss";
    @import "../../common/scss/helpers/mixins.scss";
    @import "../../common/scss/base/base.scss";
    @import "../../common/scss/components/buttons.scss"

    .album-list
      .album-t
        display: flex
        justify-content: space-between
        @include px2rem(height, 92px)
        align-items: center
        .album-t-title
          font-size: 32px; /*px*/
        .mv-t-r
          font-size: 26px; /*px*/
      .album-ul
        display: flex
        flex-wrap: wrap
        justify-content: space-between
        li
          @include px2rem(width, 350px)
          .album-img
            @include px2rem(width, 350px)
            @include px2rem(margin-bottom, 20px)
            img
              width: 100%
          p
            font-size: 24px; /*px*/
            width: 95%
            margin: 0 auto
            color: #000000
            @include px2rem(line-height, 38px)
          .album-author
            width: 95%
            margin: 0 auto
            font-size: 20px; /*px*/
            @include px2rem(height, 40px)
            display: flex
            align-items: center
            color: #5d5d5d
            @include px2rem(margin-bottom, 20px)
</style>
