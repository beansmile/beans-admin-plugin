<template>
  <c-preview-image :current="image">
    <img :src="image" alt="" style="width: 100px; height: auto;">
  </c-preview-image>
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Example extends Vue {
    image = 'https://www.beansmile.com/assets/logo-ab3df405e4d02281a92bd754d203283a92f36b416f0216acf3ba31a99b4213bf.png'
  }
</script>
