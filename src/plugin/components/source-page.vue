<script lang="jsx">
import { Vue, Component, Prop } from 'vue-property-decorator';
import _ from 'lodash';
import { createSourceFormDialog } from './source-form';

@Component
export default class SourcePage extends Vue {
  @Prop({ type: Array, default: () => [] }) columns;
  @Prop({ type: Array, default: () => [] }) filter;
  @Prop({ type: Object, default: () => ({}) }) pagination;
  @Prop({ type: Object, default: () => ({ data: [] }) }) table;
  @Prop({ type: String }) resource;
  @Prop(String) createButtonText;
  @Prop(Object) createPageLocation; // 创建页面链接
  @Prop({ type: String, default: '' }) exportExcelURL;
  @Prop({ type: Array, default: () => [] }) batchActions; // 批处理

  exporting = false;
  tableHeight = 0;
  selectedRows = [];

  async export() {
    this.exporting = true;
    try {
      this.$refs.sourceFilter.onSubmit();
      await this.$nextTick();
      const params = { ...this.$route.query, page: undefined, per_page: undefined };
      await this.$download({
        url: this.exportExcelURL,
        params,
        name: _.get(this.$route, 'meta.title', 'resource') + '.xlsx'
      });
    } finally {
      this.exporting = false;
    }
  }

  get showCreateButton() {
    return this.createButtonText;
  }

  get showExportButton() {
    return !!this.exportExcelURL;
  }

  getTableComponent() {
    return this.$refs.sourceTable.getTableComponent();
  }

  renderSelectionButtons() {
    return this.batchActions.map(item => {
      const props = { type: 'primary', ...item.buttonProps }
      const className = props.class || props.className;
      return <el-button
        disabled={!this.selectedRows.length}
        props={props}
        class={className || null}
        onClick={() => item.handler(JSON.parse(JSON.stringify(this.selectedRows)))}
      >{item.text || item.title}</el-button>;
    })
  }

  renderButtons() {
    const createPageLocation = this.createPageLocation || { name: `${this.resource}.new` };

    const { default: defaultSlot, action: actionSlot } = this.$slots;
    const $actionSlot = actionSlot || defaultSlot;

    return (
      <div class="source-page-btn-group">
        {this.showCreateButton && <c-router-link keepNode={false} to={createPageLocation}><el-button class="btn-create" type="primary">{this.createButtonText}</el-button></c-router-link>}
        {this.showExportButton && <el-button disabled={this.exporting} onClick={this.export} loading={this.exporting} type="primary">{this.$t('导出数据')}</el-button>}
        {this.renderSelectionButtons()}
        {
          $actionSlot && (
            <div class="action">
              {$actionSlot}
            </div>
          )
        }
      </div>
    )
  }

  async calcTableHeight() {
    await this.$nextTick();
    const table = this.$refs.sourceTable;
    this.tableHeight = table.$el.offsetHeight;
  }

  debouncedCalcTableHeight = _.debounce(this.calcTableHeight, 500);

  mounted() {
    this.calcTableHeight();
    window.addEventListener('resize', this.debouncedCalcTableHeight, false);
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.debouncedCalcTableHeight, false);
  }

  get tableKey() {
    const key = _.get(this, '$route.name');
    return key ? `table_${key}` : '';
  }

  get tableFieldSelected() {
    const key = this.tableKey;
    const data = localStorage.getItem(key);
    if (data) {
      try {
        const { selected = [], origin = [] } = JSON.parse(data);
        // 对比当前版本和之前版本字段
        if (String(origin) === String(this.tableColumnsProp)) {
          return selected;
        }
      } catch (e) {
        localStorage.removeItem(key);
      }
    }
    return this.tableColumns.map(item => item.prop).filter(Boolean);
  }

  get tableColumns() {
    return this.batchActions.length ? [{ type: 'selection', width: 55 }].concat(this.columns) : this.columns;
  }

  get tableColumnsProp() {
    return this.tableColumns.map(item => item.prop).filter(Boolean);
  }

  get tableRenderColumns() {
    return this.tableColumns.filter(item => !item.prop || this.tableFieldSelected.includes(item.prop));
  }

  get tableProps() {
    if (this.batchActions.length) {
      _.set(this.table, 'events.selection-change', selectedRows => this.selectedRows = selectedRows);
    }
    return this.table;
  }

  handleTableSetting() {
    // source-table filterTableColumns
    const tableColumnsFilter = _.get(this.$refs.sourceTable, 'filterTableColumns', a => a);
    const columns = tableColumnsFilter(this.tableColumns).filter(item => item.label && item.prop);
    createSourceFormDialog(this.$createElement, {
      title: this.$t('表格设置'),
      data: {
        fieldSelected: this.tableFieldSelected
      },
      columns: [
        {
          prop: 'fieldSelected',
          label: this.$t('选择渲染列'),
          form: {
            component: 'checkboxGroup',
            props: {
              checkboxs: columns.map(item => ({ label: item.prop, title: item.label }))
            }
          }
        }
      ],
      onConfirm: ({ fieldSelected }) => {
        const data = {
          selected: fieldSelected,
          origin: this.tableColumnsProp
        }
        localStorage.setItem(this.tableKey, JSON.stringify(data));
        location.reload();
      }
    })
  }

  render() {
    return (
      <div class="source-page">
        <div class="source-page-header">
          <c-source-filter filter={this.filter} ref="sourceFilter" />
        </div>
        {
          this.renderButtons()
        }
        {
          <c-source-table
            ref="sourceTable"
            table-height={this.tableHeight}
            resource={this.resource}
            table={this.tableProps}
            columns={this.tableRenderColumns}
          />
        }
        <div class="page-bottom">
          <c-pagination pagination={this.pagination} class="pagination" />
          <el-button type="primary" icon="el-icon-setting" onClick={this.handleTableSetting}>{this.$t('表格设置')}</el-button>
        </div>
      </div>
    )
  }
}
</script>
