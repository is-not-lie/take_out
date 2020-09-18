<template>
  <ul>
    <li :class="{last: last}" class="filter-item" v-for="item in items" :key="item.id">
      <input
      :id="item.id"
      :type="iptType ? 'radio' : 'checkbox'"
      :name="iptName"
      :value="item.name"
      @input="iptChange"
      v-show="false"/>
      <label :for="item.id">
        <img :src="`${BASE_URL}/${item.icon}`" :alt="item.name" v-if="item.id === '-7'">
        <i v-if="item.icon && item.id !== '-7'" :class="item.icon"></i>
        {{item.name}}
      </label>
    </li>
  </ul>
</template>

<script>
import { reactive, toRefs, computed } from 'vue'
import { BASE_URL } from '@config'
export default {
  props: {
    items: Array,
    iptName: String,
    last: Boolean
  },
  setup (props, { emit }) {
    const state = reactive({
      iptType: computed(() => props.iptName.indexOf('单选') !== -1)
    })
    const iptChange = (e) => {
      console.log(e.target.value)
      emit('input', e.target.value)
    }
    return { BASE_URL, ...toRefs(state), iptChange }
  }
}
</script>

<style lang="scss" scoped>
ul{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .filter-item{
    width: 30%;
    margin-bottom: rem(10);
    margin-right: 3%;
    border-radius: rem(3);
    img{
      width: rem(20);
      height: rem(20);
    }
    label{
      height: rem(30);
      line-height: rem(30);
      border: rem(1) solid #ccc;
      @extend .flex;
      font-size: $min-size;
    }
    input:checked + label{
      color: $subtopic;
      border-color: $subtopic;
      background-color: #FFFBF1;
    }
  }
  .last{
    width: 50%;
    margin-right: 0;
    label{
      border: none;
      justify-content: flex-start;
    }
    input:checked + label{
      background-color: $bg-color2;
      font-weight: 600;
    }
  }
}
</style>
