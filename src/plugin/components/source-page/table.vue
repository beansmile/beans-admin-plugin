<template>
  <div class="admin-source-page source-page-table">
    <div class="page-content">
      <slot name="before-filter" />

      <template v-if="filterColumns.length">
        <el-drawer
          append-to-body
          :size="null"
          direction="ltr"
          :visible.sync="filterDrawerVisible"
          custom-class="source-page-filter-drawer"
          v-if="renderFilterDrawer"
        >
          <AdminFilter
            :inline="false"
            label-position="top"
            v-bind="filterProps"
            v-model="filterForm"
            :columns="filterColumns"
            @filter="handleFilter"
            @reset="handleReset"
          />
        </el-drawer>
        <AdminFilter
          v-else
          v-bind="filterProps"
          v-model="filterForm"
          :columns="filterColumns"
          @filter="handleFilter"
          @reset="handleReset"
        />
      </template>

      <template v-if="scopeColumns.length">
        <AdminForm
          v-model="filterForm"
          :columns="scopeColumnsWithoutLable"
          @change="handleScopeChange"
        >
          <template v-slot:action>
          </template>
        </AdminForm>
      </template>

      <slot name="after-filter" />

      <slot name="before-table" />
      <div class="box-table">
        <slot name="table" :value="value">
          <Table
            v-if="renderTable"
            v-bind="tableProps"
            v-on="tableEvents"
            :columns="sourcePageTableColumnsSelected"
            :value="value"
            :actions="actions"
            :action-column-props="actionColumnProps"
            :default-sort="defaultSort"
            @sort-change="handleSortChange"
          />
        </slot>
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
      <div class="box-btn-setting">
        <ColumnSetting :columns="tableColumnsCanControl" v-model="selectedTableColumnProps" />
      </div>
    </div>
  </div>
</template>

<script>
import { Vue, Component, Prop, PropSync } from 'vue-property-decorator';
import AdminFilter from '../form/filter';
import AdminForm from '../form/index';
import Table from '../table';
import Pagination from '../pagination';
import _ from 'lodash';
import { sleep } from '../../utils';
import ColumnSetting from './column-setting.vue';

@Component({
  components: {
    AdminFilter,
    AdminForm,
    Table,
    Pagination,
    ColumnSetting
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
  @Prop(Boolean) renderFilterDrawer;
  @PropSync('showFilterDrawer', Boolean) filterDrawerVisible;
  @Prop({ type: Array, default: () => [] }) scopeColumns;

  filterForm = {};
  defaultSort = {};
  selectedTableColumnProps = [];
  renderTable = true;

  get tableColumnsCanControl() {
    return this.tableColumns.filter(item => {
      return !!(item.label && item.prop) && item.type !== 'selection';
    });
  }

  get SELECTED_COLUMN_PROPS_STORAGE_KEY() {
    return `${location.hostname}_${location.pathname}_admin-source-page-selected-column-props`;
  }

  get sourcePageTableColumnsSelected() {
    if (this.selectedTableColumnProps.length) {
      return _.filter(this.sourcePageTableColumns, (column) => {
        return _.includes(this.selectedTableColumnProps, column.prop);
      });
    }
    return this.sourcePageTableColumns;
  }

  get sourcePageTableColumns() {
    const defaultSortable = _.get(this, '$vadminConfig.sourcePage.sortable', []);
    return this.tableColumns.map(item => ({
      ...item,
      sortable: item.sortable === false ?
        false :
        (item.sortable || defaultSortable.includes(item.prop) ? 'custom' : false)
    }))
  }

  get scopeColumnsWithoutLable() {
    return this.scopeColumns.map(item => _.omit(item, 'label'));
  }

  async created() {
    // 重新渲染table
    this.reRenderTable = _.debounce(async () => {
      this.renderTable = false;
      await this.$nextTick();
      this.renderTable = true;
    }, 500);

    this.filterForm = JSON.parse(JSON.stringify(this.$route.query));
    const sortParams = _.get(this.filterForm, 'order', {});
    const sortKey = Object.keys(sortParams)[0];
    if (sortKey) {
      this.defaultSort = { prop: sortKey, order: { asc: 'ascending', desc: 'descending' }[sortParams[sortKey]] }
    }
    try {
      this.selectedTableColumnProps = JSON.parse(localStorage.getItem(this.SELECTED_COLUMN_PROPS_STORAGE_KEY)) || [];
    // eslint-disable-next-line no-empty
    } catch (e) {}

    this.dispose = this.$watch('selectedTableColumnProps', () => {
      this.reRenderTable();
    });
  }

  beforeDestroy() {
    this.dispose && this.dispose();
    return localStorage.setItem(this.SELECTED_COLUMN_PROPS_STORAGE_KEY, JSON.stringify(this.selectedTableColumnProps));
  }

  handleSortChange(e) {
    const { prop, order } = e;
    // 只支持一列排序
    this.handleFilter({ order: { [prop]: { ascending: 'asc', descending: 'desc' }[order] } });
  }

  handleAutoFilter() {
    this.handleFilter(this.filterForm);
  }

  async handleCloseDrawer() {
    if (this.filterDrawerVisible) {
      this.filterDrawerVisible = false;
      await sleep(300);
    }
  }

  async handleFilter(params) {
    await this.handleCloseDrawer();
    this.$router.replace({ query: { ...this.$route.query, ...params, page: 1 }, hash: this.$route.hash });
  }

  async handleReset() {
    await this.handleCloseDrawer();
    // scopeColumns除外
    this.$router.replace({ query: _.pick(this.$route.query, this.scopeColumns.map(item => item.prop)), hash: this.$route.hash });
  }

  handlePagination({ page, size }) {
    this.$router.replace({ query: { ...this.$route.query, page, per_page: size }, hash: this.$route.hash });
  }

  handleScopeChange(params) {
    this.$router.replace({ query: { ...this.$route.query, ...params, page: 1 }, hash: this.$route.hash });
  }
}
</script>
