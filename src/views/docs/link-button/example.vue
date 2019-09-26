<template>
  <c-link-button
    :to="{ name: 'doc.clipboard' }"
    :button-props="{ size: 'medium', type: 'success' }"
  >
    去剪切板文档
  </c-link-button>
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Example extends Vue {
  }
</script>
