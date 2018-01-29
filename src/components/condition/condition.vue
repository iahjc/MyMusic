<template>
  <section class="condition">
    <ul class="c-w-lis" @click="selectItem(0)">
      <li class="cur" data-type="all">全部</li>
      <li data-type="cn">内地</li>
      <li data-type="eu">欧美</li>
      <li data-type="j">日本</li>
      <li data-type="k">韩国</li>
      <li data-type="other">其他</li>
    </ul>

    <ul class="c-w-lis"  @click="selectItem(1)">
      <li class="cur" data-type="man">全部</li>
      <li data-type="man">男</li>
      <li data-type="woman">女</li>
      <li data-type="team">组合</li>
    </ul>
    <ul class="c-w-lis" @click="selectItem(1)">
      <li class="cur">全部</li>
      <li data-type="orchestra">乐团</li>
      <li data-type="performer">演奏家</li>
      <li data-type="composer">作曲家</li>
      <li data-type="cantor">指挥家</li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      condtion: 'all_man_all'
    }
  },
  methods: {
    selectItem(index) {
      let target = event.target || event.srcElement
      if (target.nodeName.toLowerCase() === 'li') {
        let con = target.getAttribute('data-type')
        let arr = this.condtion.split('_')
        arr[index] = con
        this.condtion = arr.join('_')
        let ul = target.parentElement.children
        for (let i = 0; i < ul.length; i++) {
          ul[i].className = ''
        }
        target.className = 'cur'

        this.$emit('searchSinger', this.condtion)
      }
    }
  }
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
