<template>
  <section class="music-list">
    <div class="ml-t">
      <div class="ml-t-l">
        <i class="fa fa-play-circle-o"></i>&nbsp;&nbsp;<span>全部播放</span>
      </div>
      <ul>
        <li>
          <i class="fa fa-download"></i>&nbsp;&nbsp;<span>下载</span>&nbsp;&nbsp;
        </li>
        <li>
          <i class="fa fa-list"></i>&nbsp;&nbsp;<span>多选</span>
        </li>
      </ul>
    </div>

    <div class="ml-list">
      <div class="ml-li" v-for="(item, index) in songList" @click="selectItem(item, index)">
        <div class="ml-l">
          <h4 class="ml-l-title">{{item.name}}</h4>
          <p>{{item.des}}</p>
        </div>
        <div class="ml-m">
        </div>
        <div class="ml-r">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    songList: {
      type: Array,
      default: null
    }
  },
  created() {
    console.log(this.songList)
  },
  methods: {
    selectItem(item, index) {
      this.$emit('selectSingerMusic', item, index)
    }
  }
}
</script>

<style lang="sass" scoped="" type="text/css">
  @import "../../common/scss/helpers/variables.scss";
  @import "../../common/scss/helpers/mixins.scss";
  @import "../../common/scss/base/base.scss";

  .music-list
    width: 100%
    .ml-t
      @include px2rem(width, 700px)
      @include px2rem(height, 98px)
      display: flex
      justify-content: space-between
      align-items: center
      margin: 0 auto
      .ml-t-l
        display: flex
        align-items: center
      i
        color: #62bd82
        @include font-dpr(20px)
      span
        @include font-dpr(16px)
      ul
        display: flex
        li
          display: flex
          align-items: center
    .ml-list
      width: 100%
      .ml-li
        padding-left: 3%
        padding-right: 3%
        @include px2rem(height, 100px)
        border: 1px solid #f2f2f2
        display: flex
        align-items: center
        box-sizing: border-box
</style>
