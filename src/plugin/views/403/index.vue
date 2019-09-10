<template>
  <div class="page">
    <img @click="goBack" class="error-page-image" :src="IMG403" alt="403-image" />
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Page403 extends Vue {
  IMG403 = require('./image').default

  goBack() {
    this.$router.go(-1)
  }
}
</script>
