<template lang="html">
  <section :class="$style.userCenter" ref="userCenter">
    <scroll ref="scroll" :class="$style.wrapper" :data="songSheets">
      <div>
        <div :class="$style.top">
          <userinfo @selectUserInfo="selectUserInfo"></userinfo>
          <user-items @selectUserMenu="selectUserMenu"></user-items>
        </div>
        <section :class="$style.items">
          <div :class="$style.item" v-for="(item, index) in radios" :key="index" @click="playSongs(item.radioId)">
            <div :class="$style.img">
              <img :src="item.headImg" />
            </div>

            <div :class="$style.cont">
              <p>
                {{item.title}}
              </p>
              <p>
                好音乐因你而存在
              </p>
            </div>
          </div>
        </section>
        <build-songsheet @createSongSheet="createSongSheet"  @selectSongSheet="selectSongSheet" :songSheets="songSheets" :menu="menu"></build-songsheet>
      </div>
    </scroll>
    <create ref="create" ></create>
    <manage-songsheet ref="ManageSongsheet" :songSheets="songSheets"></manage-songsheet>
    <msg ref="msg"></msg>
  </section>
</template>

<script>
import Userinfo from 'components/user-center/userinfo'
import UserItems from 'components/user-center/user-items'
import Create from 'components/song-sheet/create'
import BuildSongsheet from 'components/song-sheet/build-songsheet'
import ManageSongsheet from 'components/song-sheet/manage-songsheet'
import { createSong, processSongsUrl } from 'domain/song'
import { getSongs } from 'api/radiostation'
import {mapActions} from 'vuex'
import {
  getSongSheet
} from 'db/songSheet'
import Scroll from 'base/scroll/scroll'
import {playlistMixin} from 'common/js/mixin'
import Msg from 'base/msg/msg'
export default {
  mixins: [playlistMixin],
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
          action: this.openManage
        }
      ],
      radios: [
        {
          title: '热歌',
          num: '97.3',
          radioId: '199',
          headImg: 'http://y.gtimg.cn/music/photo/radio/track_radio_199_10_8.jpg'
        },
        {
          title: '随身听',
          num: '72.1',
          radioId: '101',
          headImg: 'http://y.gtimg.cn/music/photo/radio/track_radio_101_10_4.jpg'
        },
        {
          title: 'KTV必点歌',
          num: '99.5',
          radioId: '270',
          headImg: 'http://y.gtimg.cn/music/photo/radio/track_radio_270_10_4.jpg'
        }
      ]
    }
  },
  components: {
    Userinfo,
    UserItems,
    Create,
    BuildSongsheet,
    ManageSongsheet,
    Scroll,
    Msg
  },
  created() {
    this._getSongSheet()
  },
  methods: {
    handlePlayList(playList) {
      const bottom = playList.length > 0 ? `1.3333333rem` : ''
      this.$refs.userCenter.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    initSongs(list) {
      let ret = []
      list.forEach((musicData) => {
        if (musicData.mid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    },
    ...mapActions([
      'selectSingerMusic'
    ]),
    playSongs(catid) {
      catid = parseInt(catid)
      getSongs(catid).then((res) => {
        let reg = new RegExp(`^getradiosonglist7732631040990154\\(`)
        let reg2 = new RegExp('\\)$')
        res = res.replace(reg, '').replace(reg2, '')
        res = JSON.parse(res)
        this.songs = res.songlist.data.track_list
        if (this.songs) {
          processSongsUrl(this.initSongs(this.songs)).then((songs) => {
            this.songs = songs
            this.selectSingerMusic({
              list: this.songs,
              index: 0
            })
          })
        }
      }).then((err) => {
        console.log(err)
      })
    },
    selectUserInfo() {
      this.$refs.msg.show({
        msg: '用户模块 还未上线，敬请期待!',
        msgType: 'error',
        delay: 900
      })
    },
    selectUserMenu(item, index) {
      this.$refs.msg.show({
        msg: item.title + '模块 还未上线，敬请期待!',
        msgType: 'error',
        delay: 900
      })
    },
    openManage() {
      this._getSongSheet()
      this.$refs.ManageSongsheet.show()
    },
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
    left: 0
    bottom: 0
    overflow: hidden
    .wrapper
      width: 100%
      position: absolute
      left: 0
      bottom: 0
      top: 0
      overflow: hidden
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
            flex: 1
            border-bottom: 2px solid #f4f4f4
            p:first-child
              font-size: 26px; /*px*/
              line-height: 40px
            p:last-child
              font-size: 20px; /*px*/
              color: #797979
              line-height: 32px
</style>
