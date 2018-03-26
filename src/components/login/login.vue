<template>
  <section class="login">
    <div class="login-bg">
      <img src="./loginBg.jpg" />
      <div></div>
    </div>

    <div class="login-cont">
      <ul class="lc-ul">
        <li>
          <canvas ref="canvas" @click="selectImg"></canvas>
          <input type="file" ref="selectFile" style="display: none"/>
        </li>
        <li>
          <span>昵称:</span>&nbsp;&nbsp;<input type="text" />
        </li>
        <li>
          <div class="btn2">
            SIGN IN
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    selectImg() {
      this.$refs.selectFile.click()
    }
  }
}
</script>

  <style lang="sass" scoped="" type="text/css">
    @import "../../common/scss/components/buttons.scss";

    .login
      position: fixed
      left: 0
      top: 0
      bottom: 0
      right: 0
      display: flex
      justify-content: center
      align-items: center
      .login-cont
        position: relative
        z-index: 10
        ul.lc-ul
          color: #fff
          li:first-child
            display: flex
            justify-content: center
            canvas
              background: #ccc
              width: 100px
              height: 100px
          li:nth-child(2)
            span
              font-size: 28px; /*px*/
            input
              height: 45px
              background: none
              border: 1px solid #71ca9a
              color: #fff
      .login-bg
        position: absolute
        left: 0
        bottom: 0
        right: 0
        top: 0
        div
          position: absolute
          left: 0
          bottom: 0
          right: 0
          top: 0
          background: rgba(0, 0, 0, .4)
        img
          width: 100%
          filter: blur(5px)

</style>
