<template>
  <section class="goods-container">
    <div class="category">
      <nav>
        <a v-for="(category, i) in list" :key="i" :class="{active: currentIndex === i}" @click="menuClick(i)">
          <img :src="category.iconUrl" :alt="category.categoryName" v-if="category.iconUrl">
          {{category.categoryName}}
        </a>
      </nav>
    </div>
    <div class="goods" ref="goods">
      <ul ref="goodUL">
        <li v-for="(category, i) in list" :key="i">
          <h3 class="category-name">{{category.categoryName}}</h3>
          <ul>
            <li class="food" v-for="spu in category.spuList" :key="spu.spuId">
              <img :src="spu.bigImageUrl" @touchstart.prevent="showFood(spu)"/>
              <div>
                <p class="good-name">{{spu.spuName}}</p>
                <p class="good-desc">{{spu.spuDesc}}</p>
                <p>
                  <span v-html="`月售${spu.saleVolumeDecoded}`"></span>
                  <span v-html="`赞${spu.praiseNumDecoded}`"></span>
                </p>
                <p>
                  <span class="cur-pri">¥ {{spu.currentPrice}}</span>
                  <span class="unit">/{{spu.unit}}</span>
                  <del class="ori-pri">¥{{spu.originPrice}}</del>
                </p>
                <p class="spu-pro">
                  <span v-if="spu.spuPromotionInfo">{{spu.spuPromotionInfo}}</span>
                  <img v-for="(pictureUrl, i) in spu.productLabelPictureList" :key="i" :src="pictureUrl.pictureUrl" :style="{width: `${pictureUrl.width / 2}px`, height: `${pictureUrl.height / 2}px`}" />
                </p>
              </div>
              <div class="btns">
                <CartControl :food="spu"/>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <Modal v-show="showGoodModal" @close="showGoodModal = false">
      <header>
        <img class="modal-food-img" :src="food.littleImageUrl" :alt="food.spuName">
      </header>
      <section class="food-desc">
        <p>{{food.spuName}}</p>
        <p>
          <span v-html="`月售${food.saleVolumeDecoded}`"></span>
          <span class="praise-num" v-html="`赞${food.praiseNumDecoded}`"></span>
        </p>
        <div>
          <img v-for="(pictureUrl, i) in food.productLabelPictureList" :key="i" :src="pictureUrl.pictureUrl" :style="{width: `${pictureUrl.width / 2}px`, height: `${pictureUrl.height / 2}px`}" />
        </div>
        <p>{{food.spuDesc}}</p>
      </section>
      <footer class="food-price">
        <p>
          <span class="cur-pri">¥{{food.currentPrice}}</span>
          <span class="unit">/{{food.unit}}</span>
        </p>
        <button @touchstart.prevent="cartAdd(food)">加入购物车</button>
      </footer>
    </Modal>
  </section>
</template>

<script>
/*
  商家商品列表组件
*/
import { getCurrentInstance, reactive, toRefs, computed, onMounted, nextTick } from 'vue'
import { useStore } from 'vuex'
import { initScroll, initTops } from '@js'
import CartControl from './CartControl'
export default {
  name: 'Goods',
  props: {
    list: Array
  },
  components: { CartControl },
  setup () {
    let scroll = null
    const instance = getCurrentInstance()
    const { dispatch } = useStore()
    const state = reactive({
      scrollY: 0,
      tops: [],
      showGoodModal: false,
      food: {}
    })

    // 计算当前分类索引逻辑
    const currentIndex = computed(() => {
      const { scrollY, tops } = state
      const index = tops.findIndex((top, i) => scrollY >= top && scrollY < tops[i + 1])
      return index
    })

    // 分类导航点击回调
    const menuClick = i => {
      const { tops } = state
      state.scrollY = tops[i]
      // 滑动到指定位置函数
      scroll.scrollTo(0, -tops[i], 400)
    }

    // 显示商品模态框函数
    const showFood = spu => {
      state.showGoodModal = true
      state.food = spu
    }

    // 添加购物车函数
    const cartAdd = (food) => {
      if (food.count) food.count++
      else food.count = 1
      dispatch('updateCart', food)
      state.showGoodModal = false
    }

    onMounted(() => {
      // 异步调用 确保能拿到dom
      nextTick(() => {
        scroll = initScroll(instance.refs.goods)
        // 监听滑动事件
        scroll.on('scroll', ({ y }) => { state.scrollY = -y })
        // 监听滑动停止事件
        scroll.on('scrollEnd', ({ y }) => { state.scrollY = -y })
        // 收集每个li的top值
        state.tops = initTops(instance.refs.goodUL.children)
      })
    })

    return { menuClick, ...toRefs(state), currentIndex, showFood, cartAdd }
  }
}
</script>

<style lang="scss" scoped>
.goods-container {
  display: flex;
  max-height: 64vh;
  margin-bottom: rem(50);
  .category {
    width: rem(80);
    min-height: 100%;
    background-color: $bg-color6;
    a {
      @extend .flex;
      justify-content: flex-start;
      padding: rem(10) rem(10) rem(22);
      font-size: $min-size;
      color: $color;
      &.active {
        color: $color3;
        font-weight: 600;
        background-color: $bg-color2;
      }
      img {
        width: rem(15);
        height: rem(15);
        margin-right: rem(5);
      }
    }
  }
  .goods {
    flex: 1;
    max-height: 100%;
    overflow-y: hidden;
    .category-name {
      height: rem(36);
      background-color: $bg-color6;
      line-height: rem(36);
      padding-left: rem(10);
      margin-bottom: rem(10);
      font-size: $min-size;
      font-weight: 200;
    }
    .food {
      display: flex;
      position: relative;
      padding: 0 rem(10) rem(20);
      & > img {
        width: rem(75);
        height: rem(75);
        margin-right: rem(10);
      }
      div {
        flex: 1;
        p {
          @extend .nowrap;
          max-width: rem(190);
          margin-bottom: rem(3);
          font-size: $min-size;
          color: $color;
          line-height: rem(15);
        }
        .good-name {
          font-size: $base-size;
          font-weight: 600;
          margin-bottom: rem(10);
        }
        .cur-pri {
          font-size: $sm-size;
          color: $color5;
          line-height: rem(22);
        }
        .unit {
          font-size: $min-size;
          color: $color2;
          margin-right: rem(5);
          line-height: rem(22);
        }
        .ori-pri {
          color: $color2;
        }
        .spu-pro {
          display: flex;
          span {
            position: relative;
            height: rem(15);
            line-height: rem(20);
            color: $color5;
            padding: 0 rem(5);
            font-size: $min-size;
            margin-right: rem(3);
            &::before {
              content: '';
              position: absolute;
              top: -50%;
              bottom: -50%;
              left: -50%;
              right: -50%;
              border: rem(1) solid $color5;
              transform: scale(0.5);
            }
          }
          img {
            margin-right: rem(3);
          }
        }
      }
      .btns{
        position: absolute;
        right: rem(10);
        bottom: rem(40);
      }
    }
  }
  .modal-food-img{
    width: 100%;
    border-top-left-radius: rem(10);
    border-top-right-radius: rem(10);
  }
  .food-desc{
    padding: rem(10) rem(17) 0;
    max-height: 100px;
    overflow-y: auto;
    p{
      margin-bottom: rem(5);
      font-size: $min-size;
      &:nth-last-child(1){
        margin: rem(10) 0 rem(16);
      }
      &:nth-child(1){
        font-size: $base-size;
        font-weight: 600;
        @extend .nowrap;
      }
      .praise-num{
        margin-left: rem(10);
      }
    }
  }
  .food-price{
    position: relative;
    padding: rem(8) rem(17);
    @extend .flex;
    justify-content: space-between;
    background-color: $bot-bg-color;
    border-bottom-left-radius: rem(10);
    border-bottom-right-radius: rem(10);
    .cur-pri{
      font-size: $ls-size;
      color: $color5;
      line-height: rem(22);
    }
    .unit {
      font-size: $min-size;
      color: $color2;
      line-height: rem(22);
    }
    button{
      border: none;
      background: #FFD161;
      background-image: linear-gradient(-135deg, #FFBD27 0%, #FFD161 100%);
      border-radius: rem(25);
      font-size: $min-size;
      padding: 0 rem(15);
      height: rem(25);
    }
  }
}
</style>
