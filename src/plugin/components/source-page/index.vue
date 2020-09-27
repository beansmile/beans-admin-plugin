<template>
  <div style="width: 100%; height: 100%">
    <portal to="layout-nav-title">{{ pageTitle }}</portal>
    <TablePage
      v-if="type === 'index'"
      :value="state.data"
      :table-columns="sourcePageColumns"
      :filter-columns="sourcePageFilterColumns"
      :actions="sourcePageAction"
      :pagination-props="state.pagination"
      :table-events="tablePageEvents"
      :action-column-props="actionColumnProps"
    >
      <template #after-filter>
        <div class="box-actions">
          <AdminLink :to="{ name: `${resource}.new` }" v-if="actionButtons.includes('new')">
            <el-button type="primary">新建</el-button>
          </AdminLink>
        </div>
      </template>
    </TablePage>
    <ShowPage
      v-else-if="type === 'show'"
      :value="state.data"
      :columns="sourcePageColumns"
      :actions="sourcePageAction"
    />
    <FormPage
      v-else-if="type === 'edit' || type === 'new'"
      :columns="sourcePageFormColumns"
      :loading="formLoading"
      v-model="state.data"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import { Vue, Component, Prop } from 'vue-property-decorator';
import TablePage from './table';
import ShowPage from './show';
import FormPage from './form';
import _ from 'lodash';
import { request } from '../../utils';
import AdminLink from '../link';

@Component({
  components: {
    TablePage,
    ShowPage,
    FormPage,
    AdminLink
  }
})
export default class AdminSourcePage extends Vue {
  @Prop(String) type; // index new edit show
  @Prop(String) title;
  @Prop(String) resource;
  @Prop([Array, Function]) columns;
  @Prop([Array, Function]) formColumns;
  @Prop([Array, Function]) filterColumns;
  @Prop({ type: Array, default: () => ['new', 'show'] }) actionButtons;
  @Prop([Array, Function]) actions;
  @Prop({ type: Object, default: () => ({}) }) tableEvents;
  @Prop(Function) beforeSubmit;
  @Prop(Function) onFormSubmit;
  @Prop(Function) onFetchData;
  @Prop({ type: Object, default: () => ({}) }) form;
  @Prop({ type: Object }) actionColumnProps;

  formLoading = false;
  state = {}

  get tablePageEvents() {
    const defaultEvents = {};
    if (this.actionButtons.includes('show')) {
      defaultEvents['row-click'] =  ({ id }) => this.$router.push({ name: `${this.resource}.show`, params: { id } });
    }
    return {
      ...defaultEvents,
      ...this.tableEvents
    }
  }

  get sourcePageColumns() {
    return this.getColumns(this.columns).concat(
      this.getColumns(_.get(this, '$vadminConfig.sourcePage.columns', []))
    );
  }

  get sourcePageFormColumns() {
    const exportParams = {
      data: this.state.data || {},
      change: this.syncForm
    }
    return this.getColumns(this.formColumns, exportParams).concat(
      this.getColumns(_.get(this, '$vadminConfig.sourcePage.formColumns', []), exportParams)
    );
  }

  get sourcePageFilterColumns() {
    return this.getColumns(this.filterColumns);
  }

  get sourcePageAction() {
    if (_.isArray(this.actions)) {
      return this.actions;
    }
    if (_.isFunction(this.actions)) {
      return (...args) => {
        return this.actions(...args, {
          remove: this.handleDelete,
          reload: this.fetchData,
        });
      }
    }
    return [];
  }

  get pageTitle() {
    if (this.type === 'new') {
      return '新建' + this.title;
    }
    if (this.type === 'edit') {
      return '编辑' + this.title;
    }
    if (this.type === 'show') {
      return this.title + '详情';
    }
    return this.title;
  }

  mounted() {
    this.fetchData();
  }

  async fetchData() {
    if (_.isFunction(this.onFetchData)) {
      const state = await this.onFetchData({ resource: this.resource, type: this.type });
      this.state = state;
      return;
    }

    if (this.type === 'index') {
      const { data, pagination } = await request.get(`/${this.resource}`, { params: { ...this.$route.query } });
      this.$set(this.state, 'data', data);
      this.$set(this.state, 'pagination', pagination);
      return;
    }

    if (this.type === 'edit' || this.type === 'show') {
      const data = await request.get(`/${this.resource}/${this.$route.params.id}`);
      this.originData = _.cloneDeep(data);
      this.$set(this.state, 'data', data);
    }

    if (this.type === 'new') {
      this.originData = _.cloneDeep(this.form);
      this.$set(this.state, 'data', this.form);
    }
  }

  getColumns(columns, exportParams) {
    if (_.isArray(columns)) {
      return columns;
    }
    if (_.isFunction(columns)) {
      return columns(this.$createElement, { type: this.type, resource: this.resource, ...exportParams });
    }
    return [];
  }

  syncForm(data) {
    const newForm = _.mergeWith({}, this.state.data, data, (objValue, srcValue) => {
      if (_.isArray(objValue)) {
        return srcValue;
      }
    });
    this.$set(this.state, 'data', newForm);
  }

  async handleDelete(id) {
    await request.delete(`/${this.resource}/${id}`);
    this.$message.success('删除成功');
    if (this.type === 'show') {
      this.$router.go(-1);
      return;
    }
    await this.fetchData();
  }

  async handleSubmit(data) {
    try {
      this.formLoading = true;
      const hookParams = { data, originData: this.originData, state: this.state, type: this.type, resource: this.resource };
      if (_.isFunction(this.onFormSubmit)) {
        await this.onFormSubmit(hookParams);
      } else {
        let body = data;
        if (_.isFunction(this.beforeSubmit)) {
          body = await this.beforeSubmit(hookParams);
        }
        const action = this.type === 'new' ? 'post' : 'put';
        const path = this.type === 'new' ? `/${this.resource}` : `/${this.resource}/${body.id}`;
        const { id } = await request[action](path, body);
        const message = this.type === 'new' ? '创建成功' : '更新成功';
        this.$message.success(message);
        this.$router.push({ name: `${this.resource}.show`, params: { id } });
      }
    } finally {
      this.formLoading = false;
    }
  }
}
</script>
