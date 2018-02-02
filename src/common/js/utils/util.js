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
