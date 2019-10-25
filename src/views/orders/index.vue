<template>
  <div class="page">
    <c-source-page
      :table="table"
      :columns="columns"
      :filter="filter"
      :pagination="pagination"
      createButtonText="新建"
      resource="orders"
      :batch-actions="batchActions"
    />
  </div>
</template>


<script>
import { Vue, Component } from 'vue-property-decorator';
import createColumns from './columns';

@Component
export default class Index extends Vue {

  pagination = {}

  filter = [
    {
      prop: 'number',
      label: '会员名',
      form: {
        component: 'search'
      }
    },
  ]

  memberOptions = []

  batchActions = [
    {
      text: '批量删除',
      buttonProps: {
        type: 'danger'
      },
      handler: (selectedRows) => {
        console.log(selectedRows)
      }
    }
  ]

  table = {
    data: []
  };

  get columns() {
    return createColumns.call(this)
  }

  created() {
    this.table.data = require('./data.json');
  }
}
</script>
