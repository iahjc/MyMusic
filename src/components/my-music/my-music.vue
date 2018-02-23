<template>
  <section class="my-music">

    <div class="my-user">
      <ul class="mu-ul" v-show="isLogin">
        <li>
          <img src="./user.jpg" />
        </li>
        <li>
          演绎
        </li>
      </ul>

      <div class="btn2" v-show="!isLogin">
        立即登录
      </div>

      <ul class="my-control">
        <li>
          <i class="fa fa-music"></i>
          <p>全部歌曲</p>
          <p>1</p>
        </li>
        <li>
          <i class="fa fa-download"></i>
          <p>下载歌曲</p>
          <p>1</p>
        </li>
        <li>
          <i class="fa fa-clock-o"></i>
          <p>最近播放</p>
          <p>149</p>
        </li>
        <li>
          <i class="fa fa-heart-o"></i>
          <p>我喜欢</p>
          <p>1</p>
        </li>
        <li>
          <i class="fa fa-video-camera"></i>
          <p>下载MV</p>
          <p>1</p>
        </li>
        <li>
          <i class="fa fa-credit-card"></i>
          <p>已购音乐</p>
          <p>1</p>
        </li>
      </ul>
    </div>

    <div class="my-it">
      <div class="it-li">
        <div class="il-img">
          <img src="./01.jpg" />
        </div>

        <div class="il-cont">
          <p>
            个性电台
          </p>
          <p>
            好音乐因你而存在
          </p>
        </div>
      </div>

      <div class="it-li">
        <div class="il-img">
          <img src="./01.jpg" />
        </div>

        <div class="il-cont">
          <p>
            个性电台
          </p>
          <p>
            好音乐因你而存在
          </p>
        </div>
      </div>
    </div>

    <create-mlist
              @createNewGd="createNewGd"
              @manageSongSheets="manageSongSheets"
              @selectItems="selectItems"
              :songSheets="songSheets"></create-mlist>

    <create-gd ref="createGd" @closeCreateBg="closeCreateBg"></create-gd>

    <manage-songsheet ref="ManageSongsheet"
          :songSheets="songSheets"
          @refreshSongSheets="refreshSongSheets"
          ></manage-songsheet>
  </section>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import {getUser, insertUser} from 'db/user'
import MHeader from 'components/m-header/m-header'
import CreateMlist from 'components/create-mlist/create-mlist'
import CreateGd from 'components/create-gd/create-gd'
import {getSongSheet} from 'db/songSheet'
import ManageSongsheet from 'components/manage-songsheet/manage-songsheet'
export default {
  data() {
    return {
      isLogin: false,
      songSheets: []
    }
  },
  components: {
    MHeader,
    CreateMlist,
    CreateGd,
    ManageSongsheet
  },
  created() {
    this._isLogin()
    this._getSongSheet()
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    refreshSongSheets() {
      this._getSongSheet()
    },
    selectItems(item) {
      let id = `${item.id},,,${item.songSheetName}`
      this.$router.push({
        path: `/songsheet/${id}`
      })
    },
    manageSongSheets() {
      this.$refs.ManageSongsheet.show()
    },
    _getSongSheet() {
      this.songSheets = getSongSheet()
      console.log(this.songSheets)
    },
    closeCreateBg() {
      this.$refs.createGd.hide()
    },
    createNewGd() {
      this.$refs.createGd.show()
    },
    _isLogin() {
      if (JSON.stringify(this.userInfo) === '{}') {
        if (JSON.stringify(getUser()) === '{}') {
          let user = {
            nickname: '演绎'
          }
          insertUser(user)
          this.setUserInfo(user)
        } else {
          this.isLogin = true
        }
      } else {
        this.isLogin = true
      }
    },
    ...mapMutations({
      'setUserInfo': 'SET_USERINFO'
    })
  }
}
</script>

  <style lang="sass" scoped="" type="text/css">
    @import "../../common/scss/helpers/variables.scss";
    @import "../../common/scss/helpers/mixins.scss";
    @import "../../common/scss/base/base.scss";
    @import "../../common/scss/components/buttons.scss";

    .my-music
      top: 152px
      width: 750px
      position: absolute
      background: #f4f4f4
      .my-user
        width: 100%
        background: #fff
        overflow: hidden
        .btn2
          margin: 0 auto
          margin-top: 60px
        .mu-ul
          display: flex
          flex-direction: column
          align-items: center
          padding-top: 10px
          li:first-child
            width: 105px
            height: 105px
            img
              width: 100%
          li:last-child
            font-size: 34px; /*px*/
            @include px2rem(line-height, 60px)
        .my-control
          width: 100%
          display: flex
          flex-wrap: wrap
          @include px2rem(padding-bottom, 35px)
          @include px2rem(margin-top, 35px)
          li
            width: 33%
            @include px2rem(height, 160px)
            display: flex
            align-items: center
            justify-content: center
            flex-direction: column
            i
              font-size: 64px; /*px*/
              color: #58c088
            p:nth-child(2)
              font-size: 28px; /*px*/
              @include px2rem(line-height, 48px)
            p:nth-child(3)
              color: #444444
      .my-it
        width: 100%
        background: #fff
        @include px2rem(margin-top, 10px)
        .it-li
          @include px2rem(height, 118px)
          width: 100%
          display: flex
          @include px2rem(margin-top, 5px)
          .il-img
            @include px2rem(width, 118px)
            @include px2rem(height, 118px)
            img
              width: 100%
          .il-cont
            display: flex
            flex-direction: column
            justify-content: center
            @include px2rem(margin-left, 20px)
            border-bottom: 2px solid #f4f4f4
            p:first-child
              font-size: 26px; /*px*/
              @include px2rem(line-height, 40px)
            p:last-child
              font-size: 20px; /*px*/
              color: #797979
              @include px2rem(line-height, 32px)
</style>
