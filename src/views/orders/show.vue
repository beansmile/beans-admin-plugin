<template>
  <div class="page">
    <c-source-detail
      :columns="columns"
      :data="data"
      resource="orders"
    />
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import createColumns from './columns';

@Component
export default class OrderDetail extends Vue {
  data = require('./data.json')[0];

  get columns() {
    return createColumns.call(this, {
      actionColumn: {
        detail: false
      }
    });
  }
}
</script>
