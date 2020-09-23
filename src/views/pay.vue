<template>
  <section>
    <img src="@img/error.png" />
    <p>仿制页面,暂无结算功能...</p>
    <router-link to="/">返回首页</router-link>
  </section>
</template>

<script>
export default {
  setup () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
section{
  width: 100vw;
  height: 100vh;
  @extend .flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: rem(20);
  p{
    font-size: $max-size;
    margin: rem(30) 0;
  }
  a{
    height: rem(40);
    width: rem(200);
    background-color: $theme;
    @extend .flex;
    font-size: $ls-size;
    font-weight: 600;
    border-radius: rem(5);
    color: $color;
  }
}
</style>
