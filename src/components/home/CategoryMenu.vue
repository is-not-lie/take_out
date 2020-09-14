<template>
  <ul class="category-list">
    <li v-for="item in menu" :key="item._id">
      <router-link :to="{ name: 'category', params: { id: item._id } }">
        <img :src="`${BASE_URL}${item.img}`" :alt="item.name">
        <span>{{item.name}}</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
import { onBeforeMount, reactive, toRefs } from 'vue'
import { http } from '@api'
import { BASE_URL } from '@config'
export default {
  name: 'CategoryMenu',
  setup () {
    const state = reactive({ menu: [] })
    onBeforeMount(async () => {
      const result = await http.reqCategory()
      if (result) state.menu = result
    })
    return { ...toRefs(state), BASE_URL }
  }
}
</script>

<style lang="scss" scoped>
.category-list{
  @extend .flex;
  flex-wrap: wrap;
  margin-top: rem(50);
  li{
    width: 20%;
    a{
      @extend .flex;
      flex-direction: column;
      font-size: $min-size;
      img{
        width: rem(44);
        height: rem(44);
        margin-top: rem(20);
        margin-bottom: rem(10);
      }
    }
  }
}
</style>
