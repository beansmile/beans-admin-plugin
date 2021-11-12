<template>
  <bean-nav-layout
    :menus="menus"
    :show-back="showBackButton"
    @back="$router.go(-1)"
  >
    <template #header-title>
      {{ title }}
      <portal-target name="layout-nav-title"></portal-target>
    </template>
  </bean-nav-layout>
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator';
  import _ from 'lodash';

  @Component
  export default class LayoutNav extends Vue {
    menus = require('@/menu').default;

    get title() {
      return _.get(this.$route, 'meta.title');
    }

    get showBackButton() {
      if (this.$route.name) {
        const showBack = _.get(this.$route, 'meta.showBack');
        // 除了home页其他页都加返回按钮
        return showBack || this.$route.name !== 'home';
      }
      return false;
    }
  }
</script>

<style lang="scss" scoped>
</style>
