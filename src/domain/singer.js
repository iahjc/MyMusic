export default class Singer {
  constructor({id, name, sex, nickname, mid}) {
    this.id = id
    this.name = name
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
    this.mid = mid
    this.sex = sex
    this.nickname = nickname
    this.img = `https://y.gtimg.cn/music/photo_new/T001R150x150M000${mid}.jpg?max_age=2592000`
  }
}

export function createSinger(singer) {
  return new Singer({
    id: singer.Fsinger_mid,
    name: singer.Fsinger_name,
    sex: singer.Fgenre,
    nickname: singer.Fother_name,
    mid: singer.Fsinger_mid
  })
}
