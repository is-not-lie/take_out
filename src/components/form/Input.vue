<template>
  <input :type="type" :placeholder="pla" :name="name" :disabled="disabled" v-model="inputVal" />
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'Input',
  props: {
    type: {
      type: String,
      default: () => 'text'
    },
    pla: {
      type: String,
      default: () => ''
    },
    icon: String,
    name: String,
    value: String,
    disabled: {
      type: Boolean,
      default: () => false
    }
  },
  setup (props, { emit }) {
    const inputVal = ref('')
    const handleInput = e => emit('input', e.target.value)
    return { inputVal, handleInput }
  }
}
</script>

<style lang="scss" scoped>

</style>
