<template>
  <div class="page">
    <img @click="goBack" class="error-page-image" :src="IMG404" alt="404-image" />
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Page404 extends Vue {
  IMG404 = require('./image').default;

  goBack() {
    this.$router.go(-1)
  }
}
</script>
