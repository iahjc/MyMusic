export function debounce(func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

/**
 * 合并
 * @param  {[type]} opt1 [description]
 * @param  {[type]} opt2 [description]
 * @return {[type]}      [description]
 */
export function extend(opt1, opt2) {
  for (let key in opt2) {
    opt1[key] = opt2[key]
  }
  return opt1
}

/**
 * DepthExtend(this.options, obj)
 * @param       {[type]} opt1 [description]
 * @param       {[type]} opt2 [description]
 * @constructor
 */
export function DepthExtend(opt1, opt2) {
  for (let key in opt1) {
    if (opt2[key] && opt2[key] !== undefined) {
      // 如果是数组
      if (isArray(opt2[key])) {
        opt1 = DepthExtend(opt1[key], opt2[key])
      }
      // 如果是方法
      if (isFunction(opt2[key])) {
        opt1[key] = JSON.parse(JSON.stringify(opt2[key]))
      }
      // 其他
      opt1[key] = opt2[key]
    }
  }
  return opt1
}

/**
 * 判断是否是一个对象
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
export function isObject(obj) {
  if (obj === null) {
    return 'Null'
  }

  if (obj === undefined) {
    return 'Undefined'
  }

  return Object.prototype.toString.call(obj).slice(8, -1)
}

/**
 * 判断该数据是否是数组   或者使用ES5的 Array.isArray()
 * @param  {[type]}  arr [description]
 * @return {Boolean}     [description]
 */
export function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

/**
 * 判断是否是方法
 * @param  {[type]}  opt [description]
 * @return {Boolean}     [description]
 */
export function isFunction(opt) {
  return typeof opt === 'function'
}
