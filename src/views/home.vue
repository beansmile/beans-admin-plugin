<template>
  <div>
    首页
    <!-- <bean-link keepNode :to="{ name: 'tests.index' }">跳转到测试页</bean-link> -->
    <!-- {{ $t('home.title') }} -->
  </div>
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Home extends Vue {
  }
</script>
