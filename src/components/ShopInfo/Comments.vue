<template>
  <section v-if="comments">
    <header>
      <div class="shop-score">
        <span>{{comments.shopScore}}</span>
        <span>商家评分</span>
      </div>
      <div class="score">
        <div class="quality-score">
          <span>口味</span>
          <Star size="max" :score="comments.qualityScore * 10"/>
          <span>{{comments.qualityScore}}</span>
        </div>
        <div class="pack-score">
          <span>包装</span>
          <Star size="max" :score="comments.packScore * 10"/>
          <span>{{comments.packScore}}</span>
        </div>
      </div>
      <div class="delivery-score">
        <span>{{comments.deliveryScore}}</span>
        <span>配送评分</span>
      </div>
    </header>
    <section class="content">
      <ul>
        <li :class="{active: i === 0}" v-for="(label, i) in comments.commentLabels" :key="label.ID">
          {{label.content}}
        </li>
      </ul>
    </section>
  </section>
  <Loding v-else/>
</template>

<script>
import { reactive, toRefs, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
export default {
  setup () {
    const store = useStore()
    const route = useRoute()
    const state = reactive({
      comments: store.state.comments
    })

    onBeforeMount(() => {
      const { id } = route.params
      store.dispatch('getShopComments', {
        shopId: id,
        callback (comments) {
          state.comments = comments
          console.log(comments)
        }
      })
    })

    return toRefs(state)
  }
}
</script>

<style lang="scss" scoped>
section{
  background-color: $bg-color6;
  header{
    padding: rem(15) 0;
    margin-bottom: rem(10);
    display: flex;
    background-color: $bg-color2;
    .shop-score,.delivery-score{
      padding: 0 6%;
      @extend .flex;
      flex-direction: column;
      height: rem(50);
      span:nth-child(1){
        font-size: rem(27);
        font-weight: 400;
        margin-bottom: rem(5);
      }
      span:nth-child(2){
        color: $color2;
        font-size: $min-size;
      }
    }
    .shop-score span:nth-child(1){
      color: $subtopic;
    }
    .delivery-score span:nth-child(1){
      color: $color2;
    }
    .score{
      flex: 1;
      @extend .flex;
      flex-direction: column;
      div{
        span{
          &:nth-child(1){
            margin-right: rem(15);
            font-size: $min-size;
            color: $color;
          }
          &:nth-last-child(1){
            color: $subtopic;
            margin-left: rem(10);
          }
        }
      }
      .quality-score{
        margin: rem(3) 0 rem(10);
      }
    }
  }
  .content{
    background-color: $bg-color2;
    ul{
      padding: rem(15) rem(14) rem(5);
      display: flex;
      flex-wrap: wrap;
      @extend .border-bottom;
      li{
        padding: 0 rem(12);
        margin-right: rem(12);
        margin-bottom: rem(10);
        color: $color;
        font-size: $min-size;
        height: rem(26);
        line-height: rem(26);
        position: relative;
        &::before{
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          right: -50%;
          bottom: -50%;
          border: 1px solid $color2;
          transform: scale(.5);
          border-radius: rem(26);
        }
        &.active{
          color: $theme;
          &::before{
            border-color: $theme;
          }
        }
      }
    }
  }
}
</style>
