<template>
  <div class="page">
    <img @click="goBack" class="one-page-image" :src="IMG404" alt="404-image" />
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  IMG404 = require('../assets/404.png');

  goBack() {
    this.$router.go(-1)
  }
}
</script>
