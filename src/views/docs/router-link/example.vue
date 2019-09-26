<template>
  <div>
    <div>
      <c-router-link :to="{ name: 'doc.clipboard' }">去剪切板文档</c-router-link>
    </div>
    <div>
      <c-router-link replace :to="{ name: 'doc.clipboard' }">去剪切板文档</c-router-link>
    </div>
  </div>
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Example extends Vue {
  }
</script>
