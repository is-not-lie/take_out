// 防抖函数
export const debounce = (callback, time = 300) => {
  let timer = null
  return function (e) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      callback.call(this, e)
      timer = null
    }, time)
  }
}
// 节流函数
export const throttle = (callback, time) => {
  let oldTime = 0
  return function (e) {
    const newTime = Date.now()
    if (newTime - oldTime >= time) {
      callback.call(this, e)
      oldTime = newTime
    }
  }
}
