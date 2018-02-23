<template>
  <section class="player-process">
    <div class="pl-time-cur">
      {{startTime}}
    </div>
    <div class="pl-process" @click="toMusicTime" ref="plProcess">
      <div class="pl-p-c" ref="gProcess" >

      </div>
    </div>
    <div class="pl-time-end">
      {{convertDuration(song.duration)}}
    </div>
  </section>
</template>

<script>
export default {
  props: {
    song: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      endTime: 0,
      startTime: '00:00'
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    setProcess(percent) {
      this.$refs.gProcess.style.width = `${percent}%`
    },
    setPlayTime(duration) {
      this.startTime = this.convertDuration(duration)
    },
    toMusicTime(e) {
      const rect = this.$refs.plProcess.getBoundingClientRect()
      const offsetWidth = e.pageX - rect.left
      let w = this.$refs.plProcess.clientWidth
      let percent = (offsetWidth / w) * 100
      this.$emit('toMusicTime', percent)
    },
    setTime(interval) {
      this.startTime = this.convertDuration(interval)
      let pro = (interval / this.song.duration) * 100
      this.$refs.gProcess.style.width = `${pro}%`
    },
    convertDuration(interval) {
      interval = interval | 0
      const minute = interval / 60 | 0
      const second = this._pad(interval % 60)
      return `${minute}:${second}`
    },
    _pad(num, n = 2) {
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    }
  }
}
</script>

  <style lang="sass" scoped="" type="text/css">
    @import "../../common/scss/helpers/variables.scss";
    @import "../../common/scss/helpers/mixins.scss";
    @import "../../common/scss/helpers/function.scss";
    @import "../../common/scss/base/base.scss";
    .player-process
      @include px2rem(height, 30px)
      display: flex
      align-items: center
      .pl-process
        @include px2rem(width, 600px)
        @include px2rem(height, 8px)
        background-color: rgba(255, 255, 255, 0.1)
        .pl-p-c
          width: 0%
          height: 100%
          background-color: #61bf80
      .pl-time-cur,.pl-time-end
        @include px2rem(width, 75px)
        color: #b28e8e
        text-align: center
        font-size: 18px; /*px*/
</style>
