<template>
  <i v-for="(star, i) in starClass" :key="i" :class="[size ? size : 'min', star]"></i>
</template>

<script>
import { computed, ref } from 'vue'
export default {
  name: 'Star',
  props: {
    score: Number,
    size: String
  },
  setup (props) {
    const starClass = computed(() => {
      const score = props.score.toString().split('').join('.') * 1
      const className = []
      for (let i = 0; i < Math.floor(score); i++) {
        className.push('on')
      }
      if (score * 10 - Math.floor(score) * 10 >= 5) {
        className.push('half')
      }
      while (className.length < 5) {
        className.push('off')
      }
      return className
    })
    return { starClass: ref(starClass) }
  }
}
</script>

<style lang="scss" scoped>
i{
  display: inline-block;
  background-image: url('~@img/star.png');
  background-repeat: no-repeat;
  background-size: cover;
  &.min{
    width: rem(10);
    height: rem(10);
  }
  &.max{
    width: rem(15);
    height: rem(15);
  }
  &.half{
    background-position: 0 50%;
  }
  &.off{
    background-position: 0 100%;
  }
  &:nth-last-child(1){
    margin-right: rem(5);
  }
}
</style>
