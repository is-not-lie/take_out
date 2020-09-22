<template>
  <Transition name="alert">
    <section class="alert-container" @touchstart.self="handleClose">
      <section class="alert-content">
        <slot></slot>
        <slot name="footer">
          <footer class="btn-container">
            <button class="ok" @touchstart.prevent="handleOK">确定</button>
            <button class="close" @touchstart.prevent="handleClose">取消</button>
          </footer>
        </slot>
      </section>
    </section>
  </Transition>
</template>

<script>
export default {
  name: 'Alert',
  setup (props, { emit }) {
    const handleClose = () => emit('handleclick', 'close')
    const handleOK = () => emit('handleclick', 'ok')
    return { handleClose, handleOK }
  }
}
</script>

<style lang="scss" scoped>
.alert-enter-active,
.alert-leave-active{
  transition: transform .3s;
}

.alert-enter-from,
.alert-leave-to{
  transform: scale(0);
}

.alert-enter-to,
.alert-leave-from{
  transform: scale(1);
}

.alert-container{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  .alert-content{
    position: absolute;
    left: 50%;
    top: rem(150);
    transform: translateX(-50%);
    width: rem(300);
    max-height: rem(220);
    border-radius: rem(10);
    background-color: $bg-color2;
    text-align: center;
    .btn-container{
      display: flex;
      height: rem(44);
      @extend .border-top;
      button{
        flex: 1;
        border: none;
        background: none;
        font-size: $base-size;
        &.close{
          color: $theme;
        }
        &.ok{
          @extend .border-right;
        }
      }
    }
  }
}
</style>
