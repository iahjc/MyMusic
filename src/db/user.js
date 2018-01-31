/**
 * 用户数据
 */
let storage = window.localStorage
/**
 * 将user数据添加到localStore中
 * @param  {[type]} user [description]
 * @return {[type]}      [description]
 */
export function insertUser(user) {
  if (storage['user']) {
    storage['user'] = JSON.stringify(user)
  } else {
    storage.setItem('user', JSON.stringify(user))
  }
}

/**
 * 修改用户
 * @param  {[type]} user [description]
 * @return {[type]}      [description]
 */
export function updateUser(user) {
  insertUser(user)
}

/**
 * 获取用户数据
 * @return {[type]} [description]
 */
export function getUser() {
  if (storage['user']) {
    return JSON.parse(storage.getItem('user'))
  } else {
    return {}
  }
}
