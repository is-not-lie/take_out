<template>
  <section class="position">
    <header>
      <router-link :to="{ name: 'city' }" class="city">
        <span>选择城市</span>
        <i class="iconfont icon-bottom"></i>
      </router-link>
      <input type="text" placeholder="小区/街道/大厦/学校名称" />
      <span class="pass" @click="$router.back()">取消</span>
    </header>
    <section>
      <div class="cur-position">
        <p>
          <span class="current">当前位置: <span>{{'名邦花苑'}}</span></span>
          <span>重新定位</span>
        </p>
      </div>
      <div class="user-postion" v-if="user.token">
        <p>
          <i class="iconfont icon-home"></i>
          <span>我的收获地址</span>
        </p>
        <ul>
          <li>
            <p class="site">testtesttest</p>
            <p class="user">
              <span>test</span>
              <span>123456789</span>
            </p>
          </li>
        </ul>
      </div>
      <div class="nearby">
        <p>
          <i class="iconfont icon-position"></i>
          <span>附近地址</span>
        </p>
        <ul>
          <li>潮州福临楼住宿</li>
          <li>潮州迎宾馆</li>
          <li>潮州锦怡公寓</li>
          <li>潮州广福楼住宿</li>
          <li>莉莉M2酒吧</li>
        </ul>
      </div>
    </section>
  </section>
</template>

<script>
/*
  位置显示页面
  需求:
    1. 页面加载完毕显示用户当前定位,附近商家地址,用户收货地址
    2. 点击重新定位时重新定位并更新用户位置
    3. 点击选择城市时跳转city页面(已完成)
    4. 点击搜索框时隐藏用户当前定位,附近商家地址,用户收货地址, 点击取消时显示
    5. 搜索框输入时实时请求数据并展示
*/
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'position',
  setup () {
    const store = useStore()
    const state = reactive({
      user: store.state.user
    })
    return toRefs(state)
  }
}
</script>

<style lang="scss" scoped>
.position{
  header{
    height: rem(50);
    line-height: rem(50);
    padding: rem(10) rem(15);
    display: flex;
    @extend .border-bottom;
    .city{
      width: rem(50);
      line-height: 1.4;
      text-align: center;
      font-size: $min-size;
      span{
        color: $theme;
      }
      i{
        font-size: $min-size;
        color: $color2;
      }
    }
    input{
      flex: 1;
      border: none;
      padding-left: rem(20);
      &::placeholder{
        color: $color2;
      }
    }
    .pass{
      width: rem(30);
      text-align: center;
      line-height: 1;
      color: $color2;
      @extend .border-left;
      padding-left: rem(10);
    }
  }
  section{
    padding: 0 rem(15);
    margin-top: rem(20);
    .cur-position{
      margin-bottom: rem(10);
      p{
        @extend .flex;
        justify-content: space-between;
        .current{
          font-size: $base-size;
          span{
            font-weight: 600;
          }
        }
        & > span:nth-last-child(1){
          color: $subtopic;
        }
      }
    }
    .user-postion{
      & > p{
        padding: rem(15) 0 rem(10);
        color: $color2;
        i{
          margin-right: rem(5);
          font-weight: 600;
        }
      }
      li{
        padding: rem(20) 0;
        .site{
          font-size: $base-size;
          @extend .nowrap;
        }
        .user{
          margin-top: rem(10);
          color: $color;
          span{
            margin-right: rem(15);
          }
        }
      }
    }
    .nearby{
      p{
        padding: rem(15) 0 rem(10);
        color: $color2;
        i{
          margin-right: rem(5);
        }
      }
      li{
        padding: rem(20) 0;
        @extend .border-bottom;
        font-size: $base-size;
        @extend .nowrap;
      }
    }
  }
}
</style>
