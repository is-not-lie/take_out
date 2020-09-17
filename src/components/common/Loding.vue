<template>
  <div class="updating">
    <img src="@img/updating.png" alt="updating" />
  </div>
</template>

<script>
export default {
  name: 'Loding',
  setup () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.updating{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: rem(100);
  height: rem(100);
  border-radius: rem(10);
  background-color: rgba($color: #000000, $alpha: .8);
  @extend .flex;
  img{
    width: 30%;
    height: 30%;
    animation: rotate 1s linear infinite;
  }
}
@keyframes rotate {
  100% {
    transform: rotateZ(360deg);
  }
}
</style>
