<script>
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import _ from 'lodash';
import { screenService } from '../../services';
import HeaderFilter from './header-filter';

@Component
export default class AdminTable extends Vue {
  @Prop({ type: Array, default: () => [] }) columns;
  @Prop({ type: Array, default: () => [] }) value;
  @Prop({ type: [Function, Array] }) actions;
  @Prop({ type: Object, default: () => ({}) }) actionColumnProps;
  @Prop({ type: Object, default: () => ({}) }) filterForm;

  get actionColumn() {
    const ColumnRender = require('../column-render').default;

    if (!this.actions) {
      return null;
    }
    if (_.isArray(this.actions) && this.actions.length <= 0) {
      return null;
    }
    return {
      prop: '_action',
      label: this.$t('bean.actionOperation'),
      fixed: screenService.isMobile ? undefined : 'right',
      'min-width': 180,
      ...this.actionColumnProps,
      renderCell: (h, context) => {
        const scope = context.props.scope;
        const actions = _.isFunction(this.actions) ? this.actions(scope) : this.actions;
        return (
          <div class="box-action-render">
            {
              actions.map((action, index) => (
                <div class="action" onClick={e => e.stopPropagation()}>
                  <ColumnRender
                    key={index}
                    value={this.value[scope.$index]}
                    scope={scope}
                    renderCell={action}
                    column={action}
                  />
                </div>
              ))
            }
          </div>
        );
      }
    };
  }

  get tableColumns() {
    const columns = this.actionColumn ? this.columns.concat([this.actionColumn]) : this.columns;
    return columns.map(item => (
      {
        'min-width': String(item.label).length * 15 + 20,
        'header-align': 'center',
        align: 'center',
        ...item
      }
    ));
  }

  @Emit('filter')
  handleHeaderFilter(data) {
    return data;
  }

  @Emit('reset-filter')
  handleHeaderFilterReset(columns) {
    return columns;
  }

  @Emit('filter-form-change')
  handleHeaderFilterChange(data) {
    return data;
  }

  renderCell(column) {
    const ColumnRender = require('../column-render').default;
    return scope => {
      return <ColumnRender
        key={column.prop}
        value={_.get(scope.row, column.prop)}
        scope={scope}
        column={column}
        renderCell={column.renderCell}
      />
    }
  }

  renderHeader(column) {
    const ColumnRender = require('../column-render').default;
    return scope => {
      const filterColumns = _.get(column, 'filterColumns');
      const renderHeader = _.get(column, 'renderHeader') || _.get(column, 'render-header');
      const renderLabel = () => renderHeader ? (
        <ColumnRender
          key={column.prop}
          value={column.label}
          scope={scope}
          column={column}
          renderCell={renderHeader}
        />
      ) : (column.label || '');
      return (
        <span>
          {/* label 仅触发 sort, filter 由内部的箭头图标触发 */}
          {renderLabel()}
          {filterColumns ? (
            <HeaderFilter
              columns={column.filterColumns}
              value={this.filterForm}
              onChange={this.handleHeaderFilterChange}
              onFilter={(e) => this.handleHeaderFilter(e)}
              onReset={() => this.handleHeaderFilterReset(filterColumns)}
            />
          ) : null}
        </span>
      );
    }
  }

  renderTableColumn(column) {
    const scopedSlots = {
      header: this.renderHeader(column)
    };
    if (column.renderCell) {
      scopedSlots.default = this.renderCell(column);
    }
    return (
      <el-table-column
        key={column.prop}
        props={_.omit(column, 'renderCell')}
        scopedSlots={scopedSlots}
      />
    );
  }

  render() {
    // FIXME: element-ui append slot 无法通过scopedSlots 传过去
    return (
      <el-table
        class="admin-table"
        data={this.value}
        height="100%"
        stripe
        highlight-current-row
        border
        props={this.$attrs}
        on={this.$listeners}
        slots={this.$slots}
        scopedSlots={this.$scopedSlots}
      >
        {this.tableColumns.map(this.renderTableColumn)}
      </el-table>
    );
  }
}
</script>
