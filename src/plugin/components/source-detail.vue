<script>
import { Vue, Component, Prop } from 'vue-property-decorator';
import { sourceColumnRender } from './source-render';
import { loadingService } from '../services';

@Component
export default class SourceDetail extends Vue {
  @Prop({ type: Array, default: () => [] }) pages;
  @Prop({ type: Array, default: () => [] }) columns;
  @Prop(Object) scope;
  @Prop({ type: String }) resource;
  @Prop({ type: Object, default: () => ({}) }) data;

  activeTab = '0'
  tabSessionKey = '';

  created() {
    const TAB_SESSION_STORAGE_KEY = 'tab_session';
    const { path } = this.$route;
    this.tabSessionKey = TAB_SESSION_STORAGE_KEY + path;
    this.activeTab = this.getTabSession();
  }

  removeTabSession() {
    return sessionStorage.removeItem(this.tabSessionKey);
  }

  getTabSession() {
    return sessionStorage.getItem(this.tabSessionKey);
  }

  setTabSession(value) {
    const activeTab = String(value);
    this.activeTab = activeTab;
    sessionStorage.setItem(this.tabSessionKey, activeTab);
  }

  renderCell(columns, column, extra = {}) {
    const scope = this.scope || {
      row: this.data
    };
    return sourceColumnRender(this.$createElement, { resource: this.resource, ...extra })(
      {
        columns,
        column,
        scope
      }
    );
  }

  getClass(column) {
    return `item item-${column.prop}`;
  }

  renderColumns(columns) {
    const showColumns = columns.filter(item => (item.action || []).indexOf('hide-in-detail') === -1);
    const detailColumns = showColumns.filter(item => item.prop !== 'action');
    const actionColumn = showColumns.find(item => item.prop === 'action');

    return (
      <div class="render-columns">
        <div class="content">
          {
            detailColumns.map(column => (
              <div class={this.getClass(column)} key={column.prop}>
                <div class="label">{column.label}：</div>
                <div class="value">{this.renderCell(columns, column)}</div>
              </div>
            ))
          }
        </div>
        {actionColumn && <div class="toolbar-action">{this.renderCell(this.columns, actionColumn, { actionButtonMode: true, actionButtonProps: { type: 'primary' } })}</div>}
      </div>
    )
  }

  renderComponent(component) {
    // eslint-disable-next-line
    return <div class="render-component"><v-node renderNode={h => component} /></div>
  }

  renderPages() {
    const event = {
      'tab-click': ({ name }) => {
        this.setTabSession(name);
      }
    }
    const activeTab = (+this.activeTab > this.pages.length - 1 ? '0' : this.activeTab) || '0';

    return (
      <el-tabs type="border-card" value={activeTab} on={event}>
        {this.pages.map((page, index) => (
          <el-tab-pane label={page.name || page.label} name={String(index)}>
            {
              activeTab === String(index) &&
              (page.columns ? this.renderColumns(page.columns) : this.renderComponent(page.component))
            }
          </el-tab-pane>
        ))}
      </el-tabs>
    )
  }

  render() {
    return (
      <div class="c-source-detail" v-loading={loadingService.state.count > 0}>
        {this.columns.length ? this.renderColumns(this.columns) : this.renderPages()}
      </div>
    )
  }
}

</script>
