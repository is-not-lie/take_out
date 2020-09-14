<template>
  <form @submit.prevent="submit">
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'Form',
  props: {},
  setup (props, { emit }) {
    const submit = e => {
      const { target } = e
      const values = {}
      const inputs = Object.values(target)
      inputs.forEach(item => {
        if (item.name) values[item.name] = item.value
      })
      emit('submit', values)
    }
    return { submit }
  }
}
</script>

<style lang="scss" scoped>

</style>
