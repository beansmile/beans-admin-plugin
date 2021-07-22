<script>
import { Vue, Component, Prop } from 'vue-property-decorator';
import _ from 'lodash';
import { screenService } from '../services';

@Component
export default class AdminTable extends Vue {
  @Prop({ type: Array, default: () => [] }) columns;
  @Prop({ type: Array, default: () => [] }) value;
  @Prop({ type: [Function, Array] }) actions;
  @Prop({ type: Object, default: () => ({}) }) actionColumnProps;

  get actionColumn() {
    const ColumnRender = require('./column-render').default;

    if (!this.actions) {
      return null;
    }
    if (_.isArray(this.actions) && this.actions.length <= 0) {
      return null;
    }
    return {
      prop: '_action',
      label: this.$t('bean.actionOperation'),
      fixed: (screenService.isXs || screenService.isSm) ? undefined : 'right',
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

  renderCell(column) {
    const ColumnRender = require('./column-render').default;
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

  renderTableColumn(column) {
    const scopedSlots = {};
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
        scopedSlots={this.$slots}
      >
        {this.tableColumns.map(this.renderTableColumn)}
      </el-table>
    );
  }
}
</script>
