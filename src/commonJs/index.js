import { reactive, computed, toRefs, onMounted, nextTick } from 'vue'
import { sendCode } from '@utils/login'
import { debounce } from '@utils/optimize'
import BetterScroll from 'better-scroll'
let timer = null // 保存定时器标识
// 发送短信验证码函数
const send = sendCode()
export const sendPhoneCode = () => {
  const state = reactive({
    phone: '',
    computeTime: 60,
    sendCode: false,
    isDisabled: computed(() => !(/^1[34578]\d{9}$/g.test(state.phone)))
  })

  const getCode = () => {
    const { phone } = state
    state.sendCode = true
    timer = setInterval(() => {
      state.computeTime--
      if (state.computeTime <= 0) {
        clearInterval(timer)
        timer = null
        state.sendCode = false
        state.computeTime = 60
        console.log('验证码发送失败')
      }
    }, 1000)
    send(phone, (status) => {
      clearInterval(timer)
      timer = null
      state.sendCode = false
      state.computeTime = 60
      if (!status) { console.log('验证码发送失败') }
    })
  }

  return { getCode, ...toRefs(state) }
}
export const clearInter = () => clearInterval(timer)

export const initScroll = (target) => {
  // 滑动事件触发类型 1: 非实时 2. 实时触发,但不触发惯性的滑动 3. 实时触发,包括惯性滑动
  return new BetterScroll(target, { probeType: 2 })
}

export const initTops = (target) => {
  const tops = []
  Object.values(target).reduce((top, item) => {
    tops.push(top)
    return top + item.clientHeight
  }, 0)
  return tops
}

// 上拉加载逻辑
export const update = (callback) => {
  const state = reactive({
    scrollTop: 0,
    scrollHeight: 0
  })

  const start = e => {
    const offsetHeight = document.documentElement.offsetHeight
    const clientHeight = document.documentElement.clientHeight
    state.scrollHeight = offsetHeight - clientHeight
  }
  const move = debounce(e => {
    state.scrollTop = window.scrollY
    if (Math.ceil(state.scrollTop) >= state.scrollHeight) {
      callback(e)
    }
  }, 600)

  onMounted(() => {
    nextTick(() => {
      document.documentElement.addEventListener('touchstart', start)
      document.documentElement.addEventListener('touchmove', move)
    })
  })

  return { ...toRefs(state), start, move }
}
