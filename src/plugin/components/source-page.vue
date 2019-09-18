<script lang="jsx">
import { Vue, Component, Prop } from 'vue-property-decorator';
import _ from 'lodash';

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

  exporting = false;
  tableHeight = 0;

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

  renderButtons() {
    const createPageLocation = this.createPageLocation || { name: `${this.resource}.new` };

    const { default: defaultSlot, action: actionSlot } = this.$slots;
    const $actionSlot = actionSlot || defaultSlot;

    return (
      <div class="source-page-btn-group">
        {this.showCreateButton && <c-router-link keepNode={false} to={createPageLocation}><el-button class="btn-create" type="primary">{this.createButtonText}</el-button></c-router-link>}
        {this.showExportButton && <el-button disabled={this.exporting} onClick={this.export} loading={this.exporting} type="primary">导出数据</el-button>}
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

  mounted() {
    this.calcTableHeight();
    // TODO tableHeight 变了之后table不会重新渲染
    // window.addEventListener('resize', () => this.calcTableHeight(), false);
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
          <c-source-table ref="sourceTable" table-height={this.tableHeight} resource={this.resource} table={this.table} columns={this.columns} />
        }
        <c-pagination pagination={this.pagination} />
      </div>
    )
  }
}
</script>
