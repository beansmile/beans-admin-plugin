<template>
  <AppLayout>
    <template v-slot:toolbar-right>
      <span style="margin-right: 15px">beans-admin-plugin</span>
    </template>
  </AppLayout>
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator';
  import { AppLayout } from './plugin';

  @Component({ components: { AppLayout } })
  export default class App extends Vue {
  }
</script>
