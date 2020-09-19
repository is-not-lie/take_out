<template>
  <footer>
    <div class="loding"></div>
    <span>正在加载...</span>
  </footer>
</template>

<script>
export default {
  name: 'FooterLoding',
  setup () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
footer{
  @extend .flex;
  height: rem(45);
  .loding{
    width: rem(20);
    height: rem(20);
    border-radius: rem(20);
    background-image: url('~@img/loding.png');
    background-repeat: no-repeat;
    background-size: cover;
    animation: rotate 1s linear infinite;
  }
  span{
    margin-left: rem(10);
    font-size: $min-size;
  }
}
@keyframes rotate {
  100%{
    transform: rotateZ(360deg);
  }
}
</style>
