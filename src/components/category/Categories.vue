<template>
  <div class="cate-container">
    <ul class="cate">
      <li
        v-for="category in categories"
        :key="category.cateId"
        :class="{active: cateId === category.cateId}"
        @touchstart="setCateId(category.cateId)">
        <p v-if="!category.all">
          <span>{{category.name}}</span>
          <span class="count">{{category.count}}</span>
        </p>
      </li>
    </ul>
    <ul class="cate-sub">
      <li v-for="(sub, i) in subCateList" :key="i">
        <p
          v-for="item in sub" :key="item.cateId"
          v-show="item.parentId === cateId"
          :class="{active: subCateId === item.cateId}"
          @touchstart="setSubCateId(item.cateId)">
          <span>{{item.name}}</span>
          <span class="count">{{item.count}}</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
/*
  分类页面导航隐藏的分类列表
  需求: 点击相应分类时显示对应分类商品
*/
import { reactive, toRefs, computed } from 'vue'
import { useRoute } from 'vue-router'
export default {
  props: {
    categories: Array
  },
  setup (props) {
    const { params } = useRoute()
    const state = reactive({
      cateId: parseInt(params.id),
      subCateId: parseInt(params.id)
    })
    const subCateList = computed(() => props.categories?.map(category => category.subCate))

    const setCateId = (id) => { state.cateId = state.subCateId = id }

    const setSubCateId = (id) => { state.subCateId = id }

    return {
      ...toRefs(state),
      subCateList,
      setCateId,
      setSubCateId
    }
  }
}
</script>

<style lang="scss" scoped>
.cate-container{
  position: absolute;
  z-index: 2;
  width: 100%;
  background-color: $bg-color2;
  max-height: rem(450);
  display: flex;
  ul{
    max-height: 100%;
    overflow-y: scroll;
    &::-webkit-scrollbar{
      display: none;
    }
    li{
      padding: 0 rem(15);
      &.active{
        color: $subtopic;
        background-color: $bg-color2;
        font-weight: 600;
        .count{
          color: $subtopic;
        }
      }
      p{
        height: rem(42);
        @extend .flex;
        justify-content: space-between;
        &.active{
          color: $subtopic;
          font-weight: 600;
        }
        .count{
          color: $color2;
          font-size: $min-size;
        }
      }
    }
    &.cate{
      flex: 2;
      background-color: $bg-color6;
    }
    &.cate-sub{
      flex: 3;
    }
  }
}
</style>
