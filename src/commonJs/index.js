import { reactive, computed, toRefs } from 'vue'
import { sendCode } from '@utils/login'
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
  let top = 0
  tops.push(top)
  Object.values(target).forEach(item => {
    top += item.clientHeight
    tops.push(top)
  })
  return tops
}
