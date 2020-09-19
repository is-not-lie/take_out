<template>
  <div class="cate-container">
    <ul class="cate">
      <li
        v-for="category in categories"
        :key="category.cateId"
        :class="{active: showCateId === category.cateId}"
        @touchstart="showCateId = category.cateId">
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
          v-show="item.parentId === showCateId"
          :class="{active: subActive === item.cateId}"
          @touchstart="subActive = item.cateId">
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
export default {
  props: {
    categories: Array
  },
  setup (props) {
    const state = reactive({
      showCateId: 910,
      subActive: 910,
      subCateList: computed(() => props.categories?.map(category => category.subCate))
    })
    return toRefs(state)
  }
}
</script>

<style lang="scss" scoped>
ul{
  float: left;
  max-height: rem(450);
  overflow-y: scroll;
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
}
.cate-container{
  @extend .clearfix;
  .cate{
    width: 40%;
  }
  .cate-sub{
    width: 60%;
    background-color: $bg-color2;
  }
}
</style>
