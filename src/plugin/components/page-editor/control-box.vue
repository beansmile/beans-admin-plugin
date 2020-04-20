<template>
  <div class="c-control-box">
    <h5 class="title">{{ title }}</h5>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';

  @Component
  export default class controlBox extends Vue {
    @Prop(String) title;
  }
</script>
