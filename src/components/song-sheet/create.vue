<template>
<transition name="bottomFadeIn">
  <section :class="$style.create" v-show="showFlag">
    <text-header :navs="navs"></text-header>
    <input-content ref="inputContent"></input-content>
    <msg ref="msg"></msg>
  </section>
</transition>
</template>

<script>
import Msg from 'base/msg/msg'
import SongSheet from 'domain/songSheet'
import TextHeader from 'base/text-header/text-header'
import InputContent from 'components/song-sheet/input-content'
import {insertSongSheet, isSongSheet, getNextSongSheetId} from 'db/songSheet'
export default {
  components: {
    Msg,
    TextHeader,
    InputContent
  },
  data() {
    return {
      showFlag: false,
      title: '',
      bgColor: '#61bf81',
      navs: [
        {
          title: '取消',
          action: this.cancel
        },
        {
          title: '新建歌单',
          action: null
        },
        {
          title: '完成',
          action: this.complete
        }
      ]
    }
  },
  methods: {
    complete() {
      let title = this.$refs.inputContent.getTitle()
      if (title !== '') {
        if (isSongSheet(title)) {
          this.$refs.msg.show({
            msg: '歌单已存在，请重新创建!',
            msgType: 'error',
            delay: 900
          })
          return false
        }
        let songSheetId = getNextSongSheetId()
        // 判断歌单是否重复
        let songSheet = new SongSheet({
          id: songSheetId,
          songSheetName: title,
          desc: title,
          songsNum: 0,
          nickname: '演绎',
          ifpicurl: `https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erhcicLoxbj5wL72I628xYe4EMgNLVQpLdibvMgEIza6zVM2MCJFazRQbn1HeaH2t72MuwUhiaiag4OGg/132`,
          songs: [],
          logo: `https://y.gtimg.cn/music/photo_new/T002R300x300M0000020dl8E3hsQqj.jpg?max_age=2592000`
        })
        insertSongSheet(songSheet.getJson(songSheet))

        this.$refs.msg.show({
          msg: '成功创建歌单!',
          msgType: 'success',
          delay: 900
        })

        setTimeout(() => {
          this.$router.push({
            path: `/songsheet/${songSheetId}`
          })
        }, 900)
      } else {
        this.$refs.msg.show({
          msg: '请输入歌单标题!',
          msgType: 'error',
          delay: 900
        })
        return false
      }
    },
    cancel() {
      this.hide()
    },
    removeTitle() {
      this.title = ''
    },
    show() {
      this.removeTitle()
      this.showFlag = true
    },
    hide() {
      this.showFlag = false
    },
    commitBg() {
      if (this.title !== '') {
        if (isSongSheet(this.title)) {
          this.$refs.msg.show({
            msg: '歌单已存在，请重新创建!',
            msgType: 'error',
            delay: 900
          })
          return false
        }

        // 判断歌单是否重复
        let songSheet = new SongSheet({
          id: getNextSongSheetId(),
          songSheetName: this.title,
          songsNum: 0
        })
        insertSongSheet(songSheet.getJson(songSheet))
      } else {
        this.$refs.msg.show({
          msg: '请输入歌单标题!',
          msgType: 'error',
          delay: 900
        })
        return false
      }
    }
  }
}
</script>
<style lang="sass" scoped="" type="text/css">
  @import "../../common/scss/components/animation.scss";
</style>

  <style lang="sass" scoped="" type="text/css" module>
    .create
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      background: #fff
      z-index: 5
</style>
