/**
 * 搜索历史管理类
 * @type {[type]}
 */
export default class SearchHistoryDb {
  constructor() {
    this.storage = window.localStorage
    this.history = []
  }

  /**
   * 添加搜索历史管理关键词
   * @param  {[type]} key [description]
   * @return {[type]}     [description]
   */
  insert(key) {
    if (this.isSearchHistory()) {
      if (!this.selectKeyInSearchHistory(key)) {
        this.history.push(key)
        this.storage.setItem('searchhistory', JSON.stringify(this.history))
      }
    } else {
      this.storage.setItem('searchhistory', JSON.stringify([]))
    }
  }

  /**
   * 在内存中查找是否存在搜索历史
   * @return {Boolean} [description]
   */
  isSearchHistory() {
    return this.storage.getItem('searchhistory')
  }

  /**
   * 在历史管理列表中查询 该查询词是否存在
   * @param  {[type]} key [description]
   * @return {[type]}     [description]
   */
  selectKeyInSearchHistory(key) {
    this.getAllSearchHistory()
    let bool = false
    this.history.forEach((item) => {
      if (key === item) {
        bool = true
      }
    })
    return bool
  }

  /**
   * 获取所有的历史管理项目
   * @return {[type]} [description]
   */
  getAllSearchHistory() {
    if (this.isSearchHistory()) {
      this.history = JSON.parse(this.storage.getItem('searchhistory'))
    } else {
      this.history = []
    }
    return this.history
  }

  /**
   * 删除搜索历史
   */
  remove(key) {
    this.selectKeyInSearchHistory()
    this.history.forEach((item, index) => {
      if (key === item) {
        this.history.splice(index, 1)
      }
    })

    this.storage.setItem('searchhistory', JSON.stringify(this.history))
  }

  /**
   * 删除所有搜索历史
   */
  clearAll() {
    this.history = []
    this.storage.setItem('searchhistory', JSON.stringify([]))
  }
}
