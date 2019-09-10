<template>
  <div class="page">
    <img @click="goBack" class="error-page-image" :src="IMG500" alt="500-image" />
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Page500 extends Vue {
  IMG500 = require('./image').default;

  goBack() {
    this.$router.go(-1)
  }
}
</script>
