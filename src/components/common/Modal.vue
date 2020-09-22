<template>
  <Transition name="modal">
    <section class="modal" @touchstart.self="closeModal">
      <section class="modal-item">
        <slot></slot>
      </section>
      <span class="close" @touchstart.self="closeModal">
        <i class="iconfont icon-close" @touchstart="closeModal"></i>
      </span>
    </section>
  </Transition>
</template>

<script>
/*
  显示商品大图片和信息的模态框
*/
export default {
  name: 'Modal',
  setup (props, { emit }) {
    const closeModal = () => emit('close')
    return { closeModal }
  }
}
</script>

<style lang="scss" scoped>
.modal-enter-active,
.modal-leave-active{
  transition: transform .3s;
}

.modal-enter-from,
.modal-leave-to{
  transform: scale(0);
}

.modal-enter-to,
.modal-leave-from{
  transform: scale(1);
}

.modal{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  background-color: rgba($color: #000000, $alpha: .5);
  backdrop-filter: blur(20px) brightness(100%);
  @extend .flex;
  flex-direction: column;
  .modal-item{
    max-width: 84vw;
    max-height: 88vh;
    background-color: $bg-color2;
    border-radius: rem(10);
  }
  .close{
    width: rem(40);
    height: rem(40);
    margin-top: rem(15);
    border-radius: rem(40);
    @extend .flex;
    border: solid transparent 10px;
    background-color: rgba($color: #000000, $alpha: .4);
    i{
      color: $bg-color2;
      font-size: $base-size;
    }
  }
}
</style>
