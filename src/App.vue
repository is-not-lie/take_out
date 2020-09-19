<template>
  <router-view />
  <FooterBar v-show="$route.meta.showFooter" />
</template>

<style lang="scss">
@import '~@sass/reset.scss';
</style>
