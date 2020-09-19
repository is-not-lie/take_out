<template>
  <section class="seach">
    <header>
      <h3>
        <i class="iconfont icon-left" @touchstart.prevent="back()"></i>
        搜索页
      </h3>
      <div>
        <Seach showBtn />
      </div>
    </header>
    <section>
      <div class="hot-seach">
        <p>热门搜索</p>
        <ul>
          <li v-for="(hot,i) in hotLabels" :key="i">
            <router-link to="">{{hot.labelName}}</router-link>
          </li>
        </ul>
      </div>
      <div class="history-seach">
        <p><span>历史搜索</span><i class="iconfont icon-trash"></i></p>
        <ul>
          <li v-for="(history,i) in historySeach" :key="i">
            <router-link to="">{{history}}</router-link>
          </li>
        </ul>
      </div>
    </section>
  </section>
</template>

<script>
/*
  搜索页面
  需求:
    1. 点击label显示对应商家列表
    2. 点击搜索显示对应关键字商家列表
    3. 页面加载完毕显示热门搜索label和用户历史搜索(有用户的话)
    4. 点击用户历史搜索右边的垃圾桶时提醒用户是否清空历史搜索,确认则清除
*/
import { reactive, toRefs, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'seach',
  setup () {
    const store = useStore()
    const { back } = useRouter()
    const state = reactive({
      hotLabels: store.state.seachLabels?.hot
    })
    const historySeach = ['尊宝宝马来榴莲披萨（古巷店）', '华莱士']

    onBeforeMount(() => store.dispatch('getSeachLabels', (seachLabels) => { state.hotLabels = seachLabels?.hot }))

    return { ...toRefs(state), historySeach, back }
  }
}
</script>

<style lang="scss" scoped>
.seach{
  header{
    h3{
      position: relative;
      height: rem(50);
      text-align: center;
      line-height: rem(50);
      i{
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: rem(40);
        font-size: $max-size;
      }
    }
  }
  section{
    padding-left: rem(10);
    p{
      height: rem(40);
      line-height: rem(40);
      color: $color2;
      @extend .border-bottom;
    }
    ul{
      @extend .clearfix;
      max-height: rem(80);
      margin: rem(13) 0 rem(24);
      overflow: hidden;
      li{
        float: left;
        margin-right: rem(10);
        margin-top: rem(5);
        margin-bottom: rem(5);
        @include border-y-1px;
        a{
          max-width: rem(150);
          height: rem(28);
          line-height: rem(28);
          padding: 0 rem(10);
          color: $color;
          @extend .nowrap;
          @include border-x-1px;
        }
      }
    }
    .history-seach p{
      display: flex;
      justify-content: space-between;
      padding-right: rem(10);
      i{
        font-size: $base-size;
      }
    }
  }
}
</style>
