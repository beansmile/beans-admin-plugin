<template>
  <div class="page">
    <c-source-detail
      :pages="pages"
      :data="data"
      resource="orders"
    />
    <!-- columns优先渲染 -->
    <!-- <c-source-detail
      :columns="columns"
      :pages="pages"
      :data="data"
      resource="orders"
    /> -->
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import createColumns from './columns';
import Tab from './tab';

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

  get pages() {
    return [
      {
        name: '详情',
        columns: this.columns,
        component: <Tab /> // columns优先渲染
      },
      {
        name: 'tab',
        component: <Tab />
      }
    ]
  }
}
</script>
