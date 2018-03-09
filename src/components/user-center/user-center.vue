<template lang="html">
  <section :class="$style.userCenter">
    <div :class="$style.top">
      <userinfo></userinfo>
      <user-items></user-items>
    </div>
    <section :class="$style.items">
      <div :class="$style.item">
        <div :class="$style.img">
          <img src="./01.jpg" />
        </div>

        <div :class="$style.cont">
          <p>
            个性电台
          </p>
          <p>
            好音乐因你而存在
          </p>
        </div>
      </div>
    </section>
    <build-songsheet @createSongSheet="createSongSheet" @selectSongSheet="selectSongSheet" :songSheets="songSheets" :menu="menu"></build-songsheet>
    <create ref="create" ></create>
  </section>
</template>

<script>
import Userinfo from 'components/user-center/userinfo'
import UserItems from 'components/user-center/user-items'
import Create from 'components/song-sheet/create'
import BuildSongsheet from 'components/song-sheet/build-songsheet'
import { getSongSheet } from 'db/songSheet'
export default {
  data() {
    return {
      songSheets: [],
      menu: [
        {
          title: '',
          icon: 'fa fa-plus',
          action: this.createSongSheet
        },
        {
          title: '',
          icon: 'fa fa-th-list',
          action: null
        }
      ]
    }
  },
  components: {
    Userinfo,
    UserItems,
    Create,
    BuildSongsheet
  },
  created() {
    this._getSongSheet()
  },
  methods: {
    selectSongSheet(item, index) {
      let id = `${item.id}`
      this.$router.push({
        path: `/songsheet/${id}`
      })
    },
    createSongSheet() {
      this.$refs.create.show()
    },
    _getSongSheet() {
      this.songSheets = getSongSheet()
    }
  }
}
</script>

<style lang="sass" scoped="" type="text/css" module>
  .userCenter
    top: 152px
    width: 100%
    position: absolute
    background: #f4f4f4
    .top
      background: #fff
    .items
      width: 100%
      background: #fff
      margin-top: 10px
      .item
        height: 118px
        width: 100%
        display: flex
        margin-top: 5px
        .img
          width: 118px
          height: 118px
          img
            width: 100%
        .cont
          display: flex
          flex-direction: column
          justify-content: center
          margin-left: 20px
          border-bottom: 2px solid #f4f4f4
          p:first-child
            font-size: 26px; /*px*/
            line-height: 40px
          p:last-child
            font-size: 20px; /*px*/
            color: #797979
            line-height: 32px
</style>
