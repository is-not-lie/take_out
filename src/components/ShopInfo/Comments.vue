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
    <section class="comments-container">
      <ul class="top-label">
        <li :class="{active: i === 0}" v-for="(label, i) in comments.commentLabels" :key="label.ID">
          {{label.content}}
        </li>
      </ul>
      <ul class="comments-content">
        <li v-for="item in comments.list" :key="item.userID">
          <img class="user-pic" :src="item.userPicUrl || require('@img/user_pic.png')" alt="userPic" />
          <div class="comment-content">
            <p class="user">
              <span class="user-name">{{item.userName}}</span>
              <span class="comment-time">{{item.commentTime}}</span>
            </p>
            <p class="delivery-time">{{item.deliveryTime}}</p>
            <p class="content">{{item.content}}</p>
            <div class="imgs" v-if="item.pictures">
              <img v-for="(img, i) in item.pictures" :key="i" :src="img.smallPicUrl" />
            </div>
            <p class="praise-dish" v-if="item.praiseDish">
              <i class="iconfont icon-good"></i>
              {{item.praiseDish}}
            </p>
            <p class="label" v-if="item.label">
              <i class="iconfont icon-label"></i>
              {{item.label}}
            </p>
            <p class="shop-reply" v-if="item.shopReply">{{item.shopReply}}</p>
          </div>
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
  .comments-container{
    background-color: $bg-color2;
    .top-label{
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
    .comments-content{
      padding: 0 rem(15);
      background-color: $bg-color2;
      margin-bottom: rem(50);
      li{
        display: flex;
        padding: rem(15) 0 rem(10);
        font-size: $min-size;
        .user-pic{
          width: rem(40);
          height: rem(40);
          border-radius: rem(40);
          margin-right: rem(12);
        }
        .comment-content{
          flex: 1;
          .user{
            @extend .flex;
            justify-content: space-between;
            .user-name{
              font-size: $base-size;
              color: #2f2f2f;
            }
            .comment-time{
              color: $color2;
            }
          }
          .delivery-time{
            margin-top: rem(7);
            color: $color;
          }
          .content{
            line-height: rem(20);
            padding: rem(14) 0 rem(8);
            font-size: rem(14);
          }
          .imgs{
            display: flex;
            overflow-x: auto;
            padding-bottom: rem(5);
            img{
              width: rem(80);
              height: rem(80);
              margin-right: rem(5);
            }
          }
          .praise-dish,
          .label{
            color: $color2;
            vertical-align: middle;
            line-height: rem(20);
            i{
              margin-right: rem(2);
              font-size: $min-size;
            }
          }
          .praise-dish{
            margin: rem(4) 0;
          }
          .shop-reply{
            margin: rem(10) 0;
            padding: rem(5) rem(8);
            line-height: rem(18);
            background-color: $bg-color6;
          }
        }
      }
    }
  }
}
</style>
