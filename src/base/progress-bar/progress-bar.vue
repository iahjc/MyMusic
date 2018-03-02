<template lang="html">
  <div :class="$style.progressBar" ref="progressBar" @click="progressClick">
    <div :class="$style.barInner">
      <div :class="$style.progress" ref="progress">

      </div>
      <div :class="$style.progressBtnWrapper" ref="progressBtn"
            @touchstart.prevent="progressTouchStart"
            @touchmove.prevent="progressTouchMove"
            @touchend="progressTouchEnd">
            <div :class="$style.progressBtn">

            </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  prefixStyle
} from 'common/js/utils/dom'

const progressBtnWidth = 16
const transform = prefixStyle('transform')
export default {
  created() {
    this.touch = {}
  },
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  methods: {
    progressTouchStart(e) {
      this.touch.initiated = true
      this.touch.startX = e.touches[0].pageX
      this.touch.left = this.$refs.progress.clientWidth
    },
    progressTouchMove(e) {
      if (!this.touch.initiated) {
        return
      }
      const deltaX = e.touches[0].pageX - this.touch.startX
      const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX))
      this._offset(offsetWidth)
    },
    progressTouchEnd(e) {
      this.touch.initiated = false
      this._triggerPercent()
    },
    progressClick(e) {
      const rect = this.$refs.progressBar.getBoundingClientRect()
      const offsetWidth = e.pageX - rect.left
      this._offset(offsetWidth)
      // 当我们点击 progressBtn 的时候 e.offsetX 获取不对
      // this._offset(e.offsetX)
      this._triggerPercent()
    },
    _offset(offsetWidth) {
      this.$refs.progress.style.width = `${offsetWidth}px`
      this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
    },
    _triggerPercent() {
      const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
      const percent = this.$refs.progress.clientWidth / barWidth
      this.$emit('percentChange', percent)
    }
  },
  watch: {
    percent(newPercent) {
      if (newPercent >= 0 && !this.touch.initiated) {
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        const offsetWidth = newPercent * barWidth
        this._offset(offsetWidth)
      }
    }
  }
}
</script>

<style lang="sass" scoped="" type="text/css" module>
  .progressBar
    height: 32px
    .barInner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: #61bf81
      .progressBtnWrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progressBtn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid #61bf81
          border-radius: 50%
          background: #61bf81
</style>
