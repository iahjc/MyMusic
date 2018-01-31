/**
 * user实体类
 */
export default class User {
  constructor(avator, nickname) {
    this.mid = '5381'
    this.avator = avator
    this.nickname = nickname
  }

  getJson() {
    return {
      mid: this.mid,
      avator: this.avator,
      nickname: this.nickname
    }
  }
}
