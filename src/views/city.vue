<template>
  <section>
    <nav>
      <a href="#">#</a>
      <a v-for="(ify,i) in citys.classify_nav" :key="i" :href="`#${ify.idx}`">{{ify.idx}}</a>
    </nav>
    <header>
      <div class="seach">
        <i class="iconfont icon-seach"></i>
        <input type="text" placeholder="城市中文名或拼音" />
        <router-link :to="{}">取消</router-link>
      </div>
      <div class="site">
        <span><i class="iconfont icon-position"></i>当前定位城市</span>
        <span>{{'潮州市'}}</span>
      </div>
      <div class="hot-city">
        <p>热门城市</p>
        <ul>
          <li v-for="city in citys.hot_city" :key="city.city_id">
            <router-link :to="{ name: 'position', params: { id: city.city_id }}">
              {{city.city_name}}
            </router-link>
          </li>
        </ul>
      </div>
    </header>
    <section class="citys">
      <ul>
        <li v-for="city in citys.city_nav" :key="city.idx" :id="city.idx">
          <p>{{city.idx}}</p>
          <ul>
            <li v-for="citie in city.cities" :key="citie.city_id" class="city_name">
              <router-link :to="{ name: 'position', params: { id: citie.city_id }}">
                {{citie.city_name}}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
/*
  城市页面
  需求:
    1. 点击取消时返回定位页面
    2. 点击对应城市时返回定位页面并展示对应城市
    3. 输入框的实时搜索显示
    4. 点击右侧导航移动到对应位置(完成)
*/
import { reactive, toRefs, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'city',
  setup () {
    const store = useStore()
    const state = reactive({
      citys: store.state.citys
    })

    onBeforeMount(() => {
      if (!state.citys.classify_nav) {
        store.dispatch('getCity', (citys) => { state.citys = citys })
      }
    })

    return toRefs(state)
  }
}
</script>

<style lang="scss" scoped>
nav{
  position: fixed;
  width: 10%;
  text-align: center;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  a,span{
    padding: rem(5);
    font-size: $min-size;
    color: $color2;
  }
}
.citys{
  position: relative;
}
header{
  .seach{
    @extend .flex;
    @extend .border-bottom;
    padding: rem(10) rem(15);
    i{
      width: rem(15);
      height: rem(15);
      color: $color2;
      font-size: $base-size;
    }
    a{
      color: $color;
      padding: rem(5);
    }
    input{
      flex: 1;
      padding-left: rem(10);
      border: none;
    }
  }
  .site{
    padding: rem(15);
    font-size: $base-size;
    i{
      margin-right: rem(5);
    }
    span:nth-last-child(1){
      color: $subtopic;
      margin-left: rem(5);
    }
  }
  .hot-city{
    width: 90%;
    padding: rem(15);
    padding-right: 0;
    p{
      color: $color2;
    }
    ul{
      display: flex;
      flex-wrap: wrap;
      li{
        width: 22%;
        margin: rem(10) 1% 0;
        @include border-y-1px;
        a{
          @include border-x-1px;
          text-align: center;
          height: rem(35);
          line-height: rem(35);
        }
      }
    }
  }
}
.citys{
  width: 90%;
  p{
    line-height: rem(25);
    padding-left: rem(15);
    background-color: $bg-color;
  }
  .city_name{
    padding-left: rem(15);
    line-height: rem(42);
    @extend .border-bottom;
    font-size: $base-size;
    color: $color2;
  }
}
</style>
