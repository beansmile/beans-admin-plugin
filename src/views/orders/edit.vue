<template>
  <div class="page">
    <c-source-form
      :columns="columns"
      :data="data"
      @submit="handleUpdate"
    />
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import { formColumn } from './columns';

@Component
export default class OrderEdit extends Vue {
  data = require('./data.json')[0];

  get columns() {
    return formColumn;
  }

  async handleUpdate(data) {
    console.log(data)
  }
}
</script>
