<template lang="html">
  <section :class="$style.singleTop">
    <div :class="[$style.background]">
      <div :class="$style.filter"></div>
      <div :class="$style.bg" :style="bgStyle">
      </div>
      <article :class="$style.content">
        <div :class="$style.contentL" :style="bgStyle">

        </div>
        <div :class="$style.contentR">
          <h2>{{detas.dissname || detas.name || detas.songSheetName}}</h2>
          <div :class="$style.author">
            <div :class="$style.authorImg" :style="authorBgStyle">
              <img :src="detas.ifpicurl"  v-if="detas.ifpicurl" />
            </div>
            &nbsp;&nbsp;<span>{{detas.nickname || detas.singername}}</span>
          </div>
          <p>
            简介: <span v-html="detas.desc"></span>
          </p>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    detas: {
      type: Object,
      default: {}
    }
  },
  computed: {
    bgStyle() {
      if (this.detas.logo) {
        return `background-image:url(${this.detas.logo})`
      } else {
        if (this.detas.mid) {
          return `background-image:url(https://y.gtimg.cn/music/photo_new/T002R300x300M000${this.detas.mid}.jpg?max_age=2592000)`
        }
      }
    },
    authorBgStyle() {
      if (this.detas.headurl) {
        return `background-image:url(${this.detas.headurl})`
      } else {
        if (this.detas.mid) {
          return `background-image:url(https://y.gtimg.cn/music/photo_new/T001R300x300M000${this.detas.singermid}.jpg?max_age=2592000)`
        }
      }
    }
  },
  created() {
  }
}
</script>

<style lang="sass" scoped="" type="text/css" module>
  .singleTop
    width: 100%
    position: relative
    height: 500px
    overflow: hidden
    .background
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      display: flex
      justify-content: center
      align-items: center
      .bg
        background-size: cover
        background-repeat: no-repeat
        width: 100%
        height: 100%
        position: absolute
        left: 0
        top: 0
        filter: blur(20px)
        z-index: -1
      .filter
        width: 100%
        height: 100%
        position: absolute
        left: 0
        top: 0
        background: rgba(7, 17, 27, 0.4)
      .content
        position: relative
        display: flex
        .contentL
          width: 250px
          height: 250px
          background-size: cover
        .contentR
          width: 380px
          margin-left: 20px
          display: flex
          justify-content: center
          flex-direction: column
          .author
            margin-top: 20px
            font-size: 25px; /*px*/
            color: #fff
            display: flex
            align-items: center
            .authorImg
              width: 50px
              height: 50px
              border-radius: 100%
              background-size: cover
              img
                width: 100%
                border-radius: 100%
          p
            margin-top: 20px
            font-size: 26px; /*px*/
            line-height: 30px
            color: #fff
            height: 30px
            text-overflow: ellipsis
            white-space: nowrap
            overflow: hidden
          h2
            font-size: 38px; /*px*/
            white-space: nowrap
            text-overflow: ellipsis
            overflow: hidden
            color: #fff
</style>
