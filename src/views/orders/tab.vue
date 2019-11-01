<template>
  <div>tab</div>
</template>


<script>
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Tab extends Vue {
     mounted() {
      console.log('tab');
    }
  }
</script>
