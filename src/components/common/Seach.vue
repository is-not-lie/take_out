<template>
  <div class="seach-container" :style="{backgroundColor: bgc ? bgc : ''}">
    <div class="seach">
      <i class="iconfont icon-seach"></i>
      <input type="seach" placeholder="请输入商家或商品名称" />
    </div>
    <button v-if="showBtn">搜索</button>
  </div>
</template>

<script>
/*
  搜索框组件
  需求: 输入关键字实时搜索商品
*/
export default {
  name: 'Seach',
  props: {
    showBtn: {
      type: Boolean,
      default: () => false
    },
    bgc: String
  },
  setup () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.seach-container{
  padding: rem(10);
  @extend .flex;
  .seach{
    flex: 1;
    height: rem(30);
    padding-left: rem(10);
    display: flex;
    background-color: $bg-color3;
    border-radius: rem(20);
    input{
      flex: 1;
      background: none;
      border: none;
    }
    i{
      width: rem(20);
      line-height: rem(30);
    }
  }
  button{
    width: rem(60);
    height: rem(44);
    color: $color2;
    font-size: $base-size;
    background: none;
    border: none;
  }
}
</style>
