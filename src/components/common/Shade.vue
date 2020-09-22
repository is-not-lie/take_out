<template>
  <Transition name="shade">
    <div class="shade"></div>
  </Transition>
</template>

<script>
export default {
  name: 'Shade'
}
</script>

<style lang="scss" scoped>
.shade-enter-active,
.shade-leave-active{
  transition: opacity .2s;
}

.shade-enter-from,
.shade-leave-to{
  opacity: 0;
}

.shade-enter-to,
.shade-leave-from{
  opacity: 1;
}

.shade{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  background-color: rgba($color: #000000, $alpha: .4);
}
</style>
