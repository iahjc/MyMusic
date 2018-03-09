<template lang="html">
  <section :class="$style.userinfo">
    <div :class="$style.loginInfo" v-show="isLogin">
      <div :class="$style.img">
        <img src="./user.jpg" />
      </div>
      <p>
        演绎
      </p>
    </div>
    <div :class="$style.login" v-show="!isLogin">
      <div :class="$style.btn">
        立即登录
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    isLogin: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="sass" scoped="" type="text/css" module>
  .userinfo
    width: 100%
    background: #fff
    overflow: hidden
    .loginInfo
      width: 100%
      display: flex
      align-items: center
      flex-direction: column
      margin-top: 20px
      .img
        width: 105px
        height: 105px
        img
          width: 100%
      p
        margin-top: 20px
        font-size: 34px; /*px*/
    .login
      margin: 20px auto
      display: flex
      justify-content: center
      .btn
        width: 260px
        height: 52px
        font-size: 32px; /*px*/
        border-radius: 20px
        border: 1px solid #71ca9a; /*no*/
        display: flex
        color:  #71ca9a
        justify-content: center
        align-items: center
</style>
