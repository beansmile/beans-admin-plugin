<template>
  <div class="admin-source-page source-page-table">
    <div class="page-content">
      <slot name="before-filter" />
      <AdminFilter
        v-if="filterColumns.length"
        v-bind="filterProps"
        v-model="filterForm"
        :columns="filterColumns"
        @filter="handleFilter"
        @reset="handleReset"
      />
      <slot name="after-filter" />

      <slot name="before-table" />
      <div class="box-table">
        <Table
          v-bind="tableProps"
          v-on="tableEvents"
          :columns="sourcePageTableColumns"
          :value="value"
          :actions="actions"
          :action-column-props="actionColumnProps"
          :default-sort="defaultSort"
          @sort-change="handleSortChange"
        />
      </div>
      <slot name="after-table" />
    </div>
    <div class="page-footer">
      <slot name="before-pagination" />
      <Pagination
        v-bind="paginationProps"
        @submit="handlePagination"
      />
      <slot name="after-pagination" />
    </div>
  </div>
</template>

<script>
import { Vue, Component, Prop } from 'vue-property-decorator';
import AdminFilter from '../form/filter';
import Table from '../table';
import Pagination from '../pagination';
import _ from 'lodash';

@Component({
  components: {
    AdminFilter,
    Table,
    Pagination
  }
})
export default class AdminSourcePageTable extends Vue {
  @Prop({ type: Array, default: () => [] }) tableColumns;
  @Prop({ type: Array, default: () => [] }) filterColumns;
  @Prop({ type: Array, default: () => [] }) value;
  @Prop({ type: [Function, Array], default: () => [] }) actions;
  @Prop({ type: Object, default: () => ({}) }) actionColumnProps;
  @Prop({ type: Object, default: () => ({}) }) tableProps;
  @Prop({ type: Object, default: () => ({}) }) filterProps;
  @Prop({ type: Object, default: () => ({}) }) paginationProps;
  @Prop({ type: Object, default: () => ({}) }) tableEvents;

  filterForm = {};
  defaultSort = {};

  get sourcePageTableColumns() {
    const defaultSortable = _.get(this, '$vadminConfig.sourcePage.sortable', []);
    return this.tableColumns.map(item => ({
      ...item,
      sortable: item.sortable === false ?
        false :
        (item.sortable || defaultSortable.includes(item.prop) ? 'custom' : false)
    }))
  }

  created() {
    this.filterForm = JSON.parse(JSON.stringify(this.$route.query));
    const sortParams = _.get(this.filterForm, 'order', {});
    const sortKey = Object.keys(sortParams)[0];
    if (sortKey) {
      this.defaultSort = { prop: sortKey, order: { asc: 'ascending', desc: 'descending' }[sortParams[sortKey]] }
    }
  }

  handleSortChange(e) {
    const { prop, order } = e;
    // 只支持一列排序
    this.handleFilter({ order: { [prop]: { ascending: 'asc', descending: 'desc' }[order] } });
  }

  handleAutoFilter() {
    this.handleFilter(this.filterForm);
  }

  handleFilter(params) {
    this.$router.replace({ query: { ...this.$route.query, ...params, page: 1 } });
  }

  handleReset() {
    this.$router.replace({ query: {} });
  }

  handlePagination({ page, size }) {
    this.$router.replace({ query: { ...this.$route.query, page, per_page: size } });
  }
}
</script>
