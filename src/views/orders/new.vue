<template>
  <div class="page">
    <c-source-form
      :columns="columns"
      :data="data"
      @submit="handleCreate"
    />
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import { formColumn } from './columns';

@Component
export default class OrderEdit extends Vue {
  data = {};

  get columns() {
    return formColumn;
  }

  async handleCreate(data) {
    console.log(data)
  }
}
</script>
