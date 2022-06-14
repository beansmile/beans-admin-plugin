<script>
import { Vue, Component, Prop } from 'vue-property-decorator';
import _ from 'lodash';
import { abilityService } from '../../services';
import List from '../list';

@Component
export default class AdminSourcePageShow extends Vue {
  @Prop({ type: [Array, Function], default: () => [] }) tabs;
  @Prop({ type: Array, default: () => [] }) columns;
  @Prop({ type: [Function, Array], default: () => [] }) actions;
  @Prop({ type: Object }) value;

  activeTab = '0';

  get allActions() {
    if (_.isEmpty(this.value)) {
      return [];
    }
    if (_.isArray(this.actions)) {
      return this.actions;
    }
    if (_.isFunction(this.actions)) {
      return this.actions({ row: this.value });
    }
    return [];
  }

  get allTabs() {
    const tabs = _.isFunction(this.tabs) ? this.tabs({ value: this.value || {} }) : this.tabs;
    return tabs.filter(tab => tab.can ? abilityService.can(tab.can) : true);
  }

  get showActions() {
    if (this.allActions.length) {
      if (this.allTabs.length) {
        return _.get(this.allTabs, `${this.activeTab}.showAction`) !== false;
      }
      return true;
    }
    return false;
  }

  mounted() {
    this.activeTab = this.$route.hash.slice(1) || '0';
  }

  handleTabChange(index) {
    const activeTab = String(index);
    if (this.activeTab !== activeTab) {
      this.activeTab = activeTab;
      this.$router.replace({ path: this.$route.fullPath, hash: `#${activeTab}` });
    }
  }

  renderAction(action, index) {
    if (!action) {
      return null;
    }
    const ColumnRender = require('../column-render').default;
    return (
      <div class="action">
        <ColumnRender
          key={index}
          value={this.value}
          scope={{ row: this.value }}
          renderCell={action}
          column={action}
        />
      </div>
    )
  }

  renderColumnsContent(columns) {
    return <List columns={columns} value={this.value} attrs={this.$attrs} />
  }

  renderComponentContent(renderCell) {
    if (_.isFunction(renderCell)) {
      return renderCell(this.$createElement, this.value);
    }
    return null;
  }

  renderTabContent(tabs) {
    const activeTab = String(Math.max(Math.min(+this.activeTab, tabs.length - 1), 0));
    return (
      <el-tabs value={activeTab} on={{ 'tab-click': ({ name }) => this.handleTabChange(name) }}>
        {
          tabs.map((tab, index) => (
            <el-tab-pane lazy label={tab.label} key={index} name={String(index)}>
              { _.get(tab, 'columns.length') ? this.renderColumnsContent(tab.columns) : this.renderComponentContent(tab.renderCell) }
            </el-tab-pane>
          ))
        }
      </el-tabs>
    );
  }

  renderContent(columns) {
    if (this.allTabs.length) {
      return this.renderTabContent(this.allTabs);
    } else {
      return this.renderColumnsContent(columns);
    }
  }

  render() {
    return (
      <div class="admin-source-page source-page-show">
        <div class="page-content">
          {this.renderContent(this.columns)}
        </div>
        {
          this.showActions && (
            <div class="page-footer">
              <div class="box-action-render">
                {this.allActions.map(this.renderAction)}
              </div>
            </div>
          )
        }
      </div>
    )
  }
}
</script>
