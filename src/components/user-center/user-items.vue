<template lang="html">
  <ul :class="$style.userItems">
    <li v-for="(item, index) in navs" :key="index">
      <i :class="item.icon"></i>
      <p>{{item.title}}</p>
      <p>{{item.count}}</p>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    navs: {
      type: Array,
      default() {
        return [
          {
            title: '全部歌曲',
            icon: 'fa fa-music',
            action: null,
            count: 1
          },
          {
            title: '下载歌曲',
            icon: 'fa fa-download',
            action: null,
            count: 1
          },
          {
            title: '最近播放',
            icon: 'fa fa-clock-o',
            action: null,
            count: 1
          },
          {
            title: '我喜欢',
            icon: 'fa fa-heart-o',
            action: null,
            count: 1
          },
          {
            title: '下载MV',
            icon: 'fa fa-video-camera',
            action: null,
            count: 1
          },
          {
            title: '已购音乐',
            icon: 'fa fa-credit-card',
            action: null,
            count: 1
          }
        ]
      }
    }
  }
}
</script>

<style lang="sass" scoped="" type="text/css" module>
  .userItems
    width: 100%
    display: flex
    flex-wrap: wrap
    padding-bottom: 35px
    margin-top: 35px
    background: #fff
    li
      width: 33%
      height: 160px
      display: flex
      align-items: center
      justify-content: center
      flex-direction: column
      i
        font-size: 64px; /*px*/
        color: #58c088
      p:nth-child(2)
        font-size: 28px; /*px*/
        line-height: 48px
      p:nth-child(3)
        color: #444444
</style>
