<template>
  <component :is="component" />
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';

  @Component
  export default class BeanComponentRender extends Vue {
    @Prop([Object, Function, String]) component;
  }
</script>
