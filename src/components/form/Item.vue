<template>
  <div>
    <i class="iconfont" v-if="icon" :class="icon"></i>
    <slot></slot>
    <button type="button" class="btn" v-if="btn" @click="btnClick">{{btn}}</button>
  </div>
</template>

<script>
// import { getCurrentInstance } from 'vue'
export default {
  name: 'Item',
  props: {
    label: String,
    role: Array,
    icon: String,
    btn: String
  },
  setup (props, { emit, slots }) {
    // const instance = getCurrentInstance()
    console.log(slots.default()[0])
    const btnClick = e => emit('btnclick', e)
    return { btnClick }
  }
}
</script>

<style lang="scss" scoped>

</style>
