<template>
<section class="navSlidebar">
  <div class="l-ns">
    <ul class="l-ns-lis">
      <li>
        <div class="l-ns-title">
          升级VIP
        </div>
        <div class="l-ns-des">
          畅享音乐特权
        </div>
      </li>
      <li>
        <div class="l-ns-title">
          个性装扮
        </div>
        <div class="l-ns-des">
          默认皮肤
        </div>
      </li>
      <li>
        <div class="l-ns-title">
          消息中心
        </div>
        <div class="l-ns-des">

        </div>
      </li>
      <li>
        <div class="l-ns-title">
          免流量服务
        </div>
        <div class="l-ns-des">
          在线听歌免流量
        </div>
      </li>
    </ul>

    <ul class="l-ns-lis">
      <li>
        <div class="l-ns-title">
          定时关闭
        </div>
        <div class="l-ns-des">

        </div>
      </li>
      <li>
        <div class="l-ns-title">
          仅Wi-Fi联网
        </div>
        <div class="l-ns-des">

        </div>
      </li>
      <li>
        <div class="l-ns-title">
          流量提醒
        </div>
        <div class="l-ns-des">

        </div>
      </li>
      <li>
        <div class="l-ns-title">
          听歌偏好
        </div>
        <div class="l-ns-des">

        </div>
      </li>
    </ul>

    <ul class="l-ns-lis">
      <li>
        <div class="l-ns-title">
          微云音乐网盘
        </div>
        <div class="l-ns-des">

        </div>
      </li>
      <li>
        <div class="l-ns-title">
          清理占用空间
        </div>
        <div class="l-ns-des">

        </div>
      </li>
      <li>
        <div class="l-ns-title">
          帮助与反馈
        </div>
        <div class="l-ns-des">

        </div>
      </li>
      <li>
        <div class="l-ns-title">
          关于QQ音乐
        </div>
        <div class="l-ns-des">
        </div>
      </li>
    </ul>
  </div>
  <div class="l-ns-control">
    <div class="l-ns-sz">
      <i class="fa fa-cog fa-fw icon-color"></i><span>设置</span>
    </div>
    <div class="l-ns-login">
      <i class="fa fa-toggle-right icon-color"></i>&nbsp;<span>立即登录</span>
    </div>
  </div>
</section>
</template>

<script>
export default {}
</script>

<style lang="sass" scoped="" type="text/css">
  @import "../../common/scss/helpers/variables.scss";
  @import "../../common/scss/helpers/mixins.scss";
  @import "../../common/scss/base/base.scss";

  .navSlidebar
    position: absolute
    left: 0
    top: 0
    bottom: 0
    background: $navSlidebar-bg
    @include px2rem(width, 640px, 75px)
    .l-ns
      width: 90%
      margin-left: 5%
      .l-ns-lis
        width: 100%
        @include px2rem(margin-top, 48px)
        li
          display: flex
          .l-ns-title
            width: 50%
            @include font-dpr(14px)
            color: $ns-l-color
            @include px2rem(margin-top, 24px)
            @include px2rem(margin-bottom, 24px)
          .l-ns-des
            width: 50%
            text-align: right
            @include font-dpr(12px)
            color: $ns-l-des-color
            display: flex
            align-items: center
            justify-content: flex-end
    .l-ns-control
      width: 90%
      display: flex
      position: absolute
      bottom: 0
      left: 5%
      @include px2rem(height, 100px)
      box-sizing: border-box
      border-top: 1px solid #e8e8e8
      i
        @include font-dpr(16px)
      div
        width: 50%
        display: flex
        align-items: center
      .l-ns-sz
        @include font-dpr(14px)
      .l-ns-login
        justify-content: flex-end
</style>
