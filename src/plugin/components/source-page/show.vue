<script>
import { Vue, Component, Prop } from 'vue-property-decorator';
import _ from 'lodash';
import { abilityService } from '../../services';

@Component
export default class AdminSourcePageShow extends Vue {
  @Prop({ type: Array, default: () => [] }) tabs;
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
    return this.tabs.filter(tab => tab.can ? abilityService.can(tab.can) : true);
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

  renderCellDispatcher(column) {
    const { multiLocale } = _.get(this.$vadminConfig, 'sourcePage.show', {});
    const renderColumn = multiLocale ? {
      ...column,
      locales: column.locale === false ? undefined : _.map(_.get(this.$vadminConfig, 'i18n.locales', {}), (localeLabel, localeName) => {
        return _.merge({}, {
          prop: localeName,
          label: localeLabel
        }, _.get(column, `locale.${localeName}`));
      })
    } : column;

    const locales = _.get(renderColumn, 'locales') || [];
    if (locales.length) {
      return (
        <div>
          <el-form-item class="form-item-lang" label={renderColumn.label}>
            {
              locales.map(locale => {
                const localeColumn = _.merge({ labelWidth: '80px' }, renderColumn, locale, { prop: `${renderColumn.prop}_${locale.prop}` });
                return this.renderCell(localeColumn);
              })
            }
          </el-form-item>
        </div>
      )
    }
    return this.renderCell(renderColumn);
  }

  renderCell(column) {
    const ColumnRender = require('../column-render').default;
    const value = _.get(this.value, column.prop);
    const renderCell = column.renderCell || (() => <div>{value}</div>);
    return (
      <el-form-item class={column.prop} label-width={column.labelWidth || '150px'} label={column.label} key={column.prop}>
        {
          _.isNil(value) ? <span>/</span> : (
            <ColumnRender
              value={value}
              scope={{ row: this.value }}
              renderCell={renderCell}
              column={column}
            />
          )
        }
      </el-form-item>
    )
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
    return (
      <el-form class="el-form-show" label-width="150px" label-position="left" props={this.$attrs}>
        {columns.map(this.renderCellDispatcher)}
      </el-form>
    )
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
            <el-tab-pane label={tab.label} key={index} name={String(index)}>
              { _.get(tab, 'columns.length') ? this.renderColumnsContent(tab.columns) : this.renderComponentContent(tab.renderCell) }
            </el-tab-pane>
          ))
        }
      </el-tabs>
    );
  }

  renderContent(columns) {
    if (this.tabs.length) {
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
