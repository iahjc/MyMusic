<template>
  <section class="condition">
    <ul class="c-w-lis">
      <li class="cur">
        全部
      </li>
      <li>
        内地
      </li>
      <li>
        港台
      </li>
    </ul>

    <ul class="c-w-lis">
      <li class="cur">
        全部
      </li>
      <li>
        男
      </li>
      <li>
        女
      </li>
      <li>
        组合
      </li>
    </ul>

    <ul class="c-w-lis">
      <li class="cur">
        全部
      </li>
      <li>
        流行
      </li>
      <li>
        嘻哈
      </li>
      <li>
        摇滚
      </li>
    </ul>
  </section>
</template>

<script>
export default {
}
</script>

<style lang="sass" scoped="" type="text/css">
  @import "../../common/scss/helpers/variables.scss";
  @import "../../common/scss/helpers/mixins.scss";
  @import "../../common/scss/base/base.scss";

  .condition
    background: #f4f4f4
    .c-w-lis
      display: flex
      border-bottom: 2px solid #ededed
      li
        @include px2rem(height, 70px)
        @include px2rem(width, 110px)
        text-align: center
        @include px2rem(line-height, 70px)
      li.cur
        color: #81a395
</style>
