<template>
  <div class="page">
    <img @click="goBack" class="one-page-image" :src="IMG500" alt="500-image" />
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  IMG500 = require('../assets/500.png');

  goBack() {
    this.$router.go(-1)
  }
}
</script>
