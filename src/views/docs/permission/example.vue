<template>
  <c-permission permission="Users.create">
    有权限才显示
  </c-permission>
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Example extends Vue {
  }
</script>
