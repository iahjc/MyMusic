<template>
  <section class="mv-list" v-show="showFlag">
    <div class="mv-li" v-for="item in mvList">
      <ul>
        <li>
          <img v-lazy="item.mv_pic_url" />
        </li>
        <li>
          <p v-html="item.mv_name">
          </p>
          <p>
            <span v-for="(singer, index) in item.singer_list">{{singer.name}}<em v-show="item.singer_list.length !== (index + 1)">/</em></span>&nbsp;&nbsp;<span>{{item.duration}}</span>
          </p>
        </li>
      </ul>
    </div>
    <div class="mv-loading" v-show="mvList.length <= 0">
      <loading :isShow="true" :msg="msg"></loading>
    </div>
  </section>
</template>

<script>
import {searchMvList} from 'api/search'
import {mapGetters} from 'vuex'
import Loading from 'base/loading/loading'
export default {
  components: {
    Loading
  },
  computed: {
    ...mapGetters([
      'keywords'
    ])
  },
  data() {
    return {
      showFlag: true,
      mvList: [],
      msg: ''
    }
  },
  created() {
    if (this.keywords) {
      this.msg = `正在搜索 '${this.keywords}'`
      this._searchMvList(this.keywords)
    }
  },
  methods: {
    _searchMvList(key) {
      searchMvList(key).then((res) => {
        let reg = new RegExp(`^MusicJsonCallback5987696727295411\\(`)
        let reg2 = new RegExp('\\)$')
        res = res.replace(reg, '').replace(reg2, '')
        res = JSON.parse(res)
        this.mvList = res.data.mv.list
      })
    }
  }
}
</script>

  <style lang="sass" scoped="" type="text/css">
    .mv-list
      width: 100%
      position: relative
      .mv-loading
        width: 100%
        position: absolute
        top: 400px
        display: flex
        justify-content: center
      .mv-li
        height: 128px
        border-bottom: 1px solid #efefef; /*px*/
        box-sizing: border-box
        ul
          display: flex
          li
            height: 128px
          li:first-child
            width: 220px
            img
              width: 100%
          li:last-child
            font-size: 24px; /*px*/
            display: flex
            flex-direction: column
            justify-content: center
            box-sizing: border-box
            max-width: 480px
            margin-left: 28px
            p:last-child
              font-size: 20px; /*px*/
              color: #4c4c4c
              margin-top: 24px
</style>
