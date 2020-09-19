<template>
  <section class="goods-container">
    <div class="category">
      <nav>
        <a v-for="(category, i) in list" :key="i">
          <img :src="category.iconUrl" :alt="category.categoryName" v-if="category.iconUrl">
          {{category.categoryName}}
        </a>
      </nav>
    </div>
    <div class="goods">
      <h3 class="category-name">{{'热销'}}</h3>
      <ul v-for="(category, i) in list" :key="i">
        <li v-for="spu in category.spuList" :key="spu.spuId">
          <img :src="spu.bigImageUrl" />
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
          <button></button>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
/*
  商家商品列表组件
  需求:
    1. 顶部显示当前所在商品对应的分类
    2. 实时更新分类导航样式
    3. 点击对应分类导航移动到对应商品位置
    4. 点击商品图片显示大图片模态框
    5. 点击 + 按钮则商品数量 +1 并显示 - 按钮与商品数量, 点击 - 按钮则反过来..数量为 0 时隐藏 - 按钮
    6. 底部购物车实时更新商品总价与商品数量
    7. 当商品总价达到最低起送价时显示"去结算"按钮,并点击该按钮时跳转结算页面
*/
export default {
  name: 'Goods',
  props: {
    list: Array
  },
  setup () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.goods-container {
  display: flex;
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
    .category-name {
      height: rem(36);
      background-color: $bg-color2;
      line-height: rem(36);
      padding-left: rem(10);
      font-size: $min-size;
      font-weight: 200;
    }
    li {
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
          font-size: rem(18);
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
            font-size: rem(10);
            margin-right: rem(3);
            &::before {
              content: '';
              position: absolute;
              top: -50%;
              bottom: -50%;
              left: -50%;
              right: -50%;
              border: 1px solid $color5;
              transform: scale(0.5);
            }
          }
          img {
            margin-right: rem(3);
          }
        }
      }
      button {
        position: absolute;
        width: rem(25);
        height: rem(25);
        border-radius: rem(25);
        background-image: url('~@img/btn-bg.png');
        background-repeat: no-repeat;
        background-size: cover;
        border: none;
        right: rem(10);
        bottom: rem(45);
      }
    }
  }
}
</style>
